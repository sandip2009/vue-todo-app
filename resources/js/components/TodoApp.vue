<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4"> Todo List</h1>
    
    <!-- <form @submit.prevent="addTodo" class="flex mb-4"> -->
    <div class="flex mb-4">
      <input v-model="newTodo" type="text" placeholder="Add a new task"
        class="flex-1 border rounded p-2 mr-2" />

      <button v-if="!id" @click="addTodo()" class="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      <button v-else @click="editTodo()" class="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
    <!-- </form> -->
     </div>
     <div class="flex mb-4 justify-end items-end">
        <button @click="reset()" class="text-red-600 float-end">reset</button>
    </div>
    

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in todos" :key="todo.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ todo.title }}
                    </td>

                    <td class="px-6 py-4">
                        <button @click="updateTodo(todo)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2.5">Edit</button>
                        <button   @click="deleteTodo(todo.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    </td>
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
      todos: [],
      newTodo: "",
      id:""
    };
  },
  mounted() {
    console.log("Component mounted.");
    this.getTodos();
  },
  methods: {
    async getTodos() {
      let res = await this.axios.get("/api/todos");
      this.todos = res.data;
    },
    async addTodo() {
      if (!this.newTodo) return;
      let res = await this.axios.post("/api/todos", { title: this.newTodo });
      this.todos.push(res.data);
      this.newTodo = "";
    },
    async editTodo() {
        if (!this.newTodo) return;
        let res = await this.axios.patch(`/api/todos/${this.id}`, { title: this.newTodo });
        const index = this.todos.findIndex(t => t.id === this.id);
        if (index !== -1) {
          this.todos[index] = res.data;
        }
        this.newTodo = "";
        this.id = "";
    },
    async updateTodo(todo) {
      this.newTodo = todo.title;
      this.id = todo.id;
    },
    async deleteTodo(id) {
      await this.axios.delete(`/api/todos/${id}`);
      this.todos = this.todos.filter(t => t.id !== id);
    },
    async reset() {
      this.newTodo = "";
      this.id = "";
    },
  }
};
</script>

<style>
body { font-family: sans-serif; }
</style>
