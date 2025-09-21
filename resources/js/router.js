import { createRouter, createWebHistory } from 'vue-router';
import TodoApp from './components/TodoApp.vue';
import Bookstore from './components/Bookstore.vue';

const routes = [
    {
        path: '/',
        redirect: '/todo-list' // Redirect from root to the todo list by default
    },
    {
        path: '/todo-list',
        component: TodoApp
    },
    {
        path: '/book-store',
        component: Bookstore
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;