import './bootstrap';
import '../css/app.css'; // ✅ load CSS

import { createApp } from 'vue';  // ✅ correct Vue import
import axios from 'axios';
import VueAxios from 'vue-axios';

// import TodoApp from "./components/TodoApp.vue";
import Menu from './components/Menu.vue';

const app = createApp(Menu);

app.use(VueAxios, axios);

app.mount('#app');
