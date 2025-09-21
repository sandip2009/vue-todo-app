
<template>
    <div class="p-6 max-w-lg mx-auto">
        <h1 class="text-2xl font-bold mb-4">Book Store</h1>

        <!-- Book Form -->
        <div class="bg-white p-4 rounded shadow mb-6">
            <h2 class="text-xl font-semibold mb-3">{{ id ? 'Edit Book' : 'Add New Book' }}</h2>
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Book Name</label>
                    <input
                        v-model="book.name"
                        type="text"
                        :class="{'border-red-500': errors.name}"
                        class="mt-1 block w-full border rounded p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter book name"
                    />
                    <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        v-model="book.author"
                        type="text"
                        :class="{'border-red-500': errors.author}"
                        class="mt-1 block w-full border rounded p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter author name"
                    />
                    <p v-if="errors.author" class="text-red-500 text-xs mt-1">{{ errors.author[0] }}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">pages</label>
                    <input
                        v-model.number="book.pages"
                        type="number"
                        step="0.01"
                        :class="{'border-red-500': errors.pages}"
                        class="mt-1 block w-full border rounded p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter book pages"
                    />
                    <p v-if="errors.pages" class="text-red-500 text-xs mt-1">{{ errors.pages[0] }}</p>
                </div>
                <div class="flex justify-between">
                    <button
                        v-if="!id"
                        @click="addBook"
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Book
                    </button>
                    <button
                        v-else
                        @click="updateBook"
                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Update Book
                    </button>
                    <button
                        v-if="id"
                        @click="resetForm"
                        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

        <!-- Books List -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">Name</th>
                        <th scope="col" class="px-6 py-3">Author</th>
                        <th scope="col" class="px-6 py-3">pages</th>
                        <th scope="col" class="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book.id" class="bg-white border-b hover:bg-gray-50">
                        <td class="px-6 py-4 font-medium text-gray-900">{{ book.name }}</td>
                        <td class="px-6 py-4">{{ book.author }}</td>
                        <td class="px-6 py-4">${{ book.pages }}</td>
                        <td class="px-6 py-4 space-x-2">
                            <button
                                @click="editBook(book)"
                                class="font-medium text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                @click="deleteBook(book.id)"
                                class="font-medium text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="books.length === 0">
                        <td colspan="4" class="px-6 py-4 text-center">No books found</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            books: [],
            book: {
                name: '',
                author: '',
                pages: null
            },
            id: null,
            errors: {}
        };
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        getBooks() {
            axios.get('/api/books')
                .then(response => {
                    this.books = response.data;
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
        },
        addBook() {
            this.errors = {};
            axios.post('/api/books', this.book)
                .then(response => {
                    this.books.unshift(response.data);
                    this.resetForm();
                })
                .catch(error => {
                    if (error.response && error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    } else {
                        console.error('Error adding book:', error);
                    }
                });
        },
        editBook(book) {
            this.id = book.id;
            this.book = {
                name: book.name,
                author: book.author,
                pages: book.pages
            };
            this.errors = {};
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        updateBook() {
            this.errors = {};
            axios.put(`/api/books/${this.id}`, this.book)
                .then(response => {
                    const index = this.books.findIndex(b => b.id === this.id);
                    if (index !== -1) {
                        this.books.splice(index, 1, response.data);
                    }
                    this.resetForm();
                })
                .catch(error => {
                    if (error.response && error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    } else {
                        console.error('Error updating book:', error);
                    }
                });
        },
        deleteBook(id) {
            if (confirm('Are you sure you want to delete this book?')) {
                axios.delete(`/api/books/${id}`)
                    .then(() => {
                        this.books = this.books.filter(b => b.id !== id);
                    })
                    .catch(error => {
                        console.error('Error deleting book:', error);
                    });
            }
        },
        resetForm() {
            this.book = {
                name: '',
                author: '',
                pages: null
            };
            this.id = null;
            this.errors = {};
        }
    }
};
</script>
