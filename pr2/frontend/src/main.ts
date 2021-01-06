import {createApp} from 'vue'
import App from './App.vue'
import router from './routes'
// import { myAxios } from './axiosConfig';
import axios from 'axios';
// import VueAxios from 'vue-axios';

// axios.defaults.baseURL = 'http://localhost:3000';
// const myAxios = axios.create({ baseURL:'http://localhost:3000'});

// const app = createApp(App);
// app.use(router);
// // app.use(myAxio0s);
// // app.config.globalProperties.$http = axios;
// app.mount('#app');

createApp(App).use(router).mount('#app');
