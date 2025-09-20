import './bootstrap';
import '../css/app.css'; // ✅ load CSS

import { createApp } from 'vue';  // ✅ correct Vue import
import axios from 'axios';
import VueAxios from 'vue-axios';

import TodoApp from "./components/TodoApp.vue";

const app = createApp(TodoApp);

app.use(VueAxios, axios);

app.mount('#app');
