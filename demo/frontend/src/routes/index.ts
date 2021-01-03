import Vue from 'vue';
import VueRouter from 'vue-router';
// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router/types'
import Home from '../components/Home.vue';
import HelloWorld from '../components/HelloWorld.vue';

// Vue.use(VueRouter);

const routes=[ //Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/register',
        name: 'Home',
        component: Home
    }
]

// const router = new VueRouter({
//     routes
// })
// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
// })


// export default router;