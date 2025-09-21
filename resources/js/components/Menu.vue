<template>
    <div class="menu bg-gray-100 p-4 shadow-md mb-8">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-800">My Vue App</h1>
            <ul class="flex space-x-4">
                <li>
                    <button
                        @click="showTodoApp"
                        :class="{
                            'bg-blue-600 text-white shadow-inner': activeMenu === 'todo',
                            'bg-white text-gray-700 hover:bg-blue-100': activeMenu !== 'todo'
                        }"
                        class="px-4 py-2 rounded-md font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        TodoList
                    </button>
                </li>
                <li>
                    <button
                        @click="showBookstore"
                        :class="{
                            'bg-blue-600 text-white shadow-inner': activeMenu === 'bookstore',
                            'bg-white text-gray-700 hover:bg-blue-100': activeMenu !== 'bookstore'
                        }"
                        class="px-4 py-2 rounded-md font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        BookStore
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <TodoApp v-if="activeMenu ==='todo'"/>
    <Bookstore v-else-if="activeMenu === 'bookstore'"/>
</template>

<script>
import TodoApp from "./TodoApp.vue";
import Bookstore from "./Bookstore.vue";


export default {
    components: {
        TodoApp,
        Bookstore
    },
    data() {
        return {
            activeMenu: "todo"
        };
    },
    methods: {
        showTodoApp() {
            this.activeMenu = 'todo';
        },
        showBookstore() {
            this.activeMenu = 'bookstore';
        }
    }
};
</script>