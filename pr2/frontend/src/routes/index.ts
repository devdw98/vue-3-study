import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/UserForm.vue')
    },
    {
        path: '/posts',
        name: 'PostList',
        component: () => import('../components/PostList.vue')
    },
    {
        path: '/posts/:id',
        name: 'PostDetail',
        props: true,
        component: () => import('../components/PostDetail.vue')
    },
    {
        path: '/posts/write',
        name: 'PostForm',
        props: true,
        component: () => import('../components/PostForm.vue')
    },
    {
        path: '/posts/:id',
        name: 'UpdatePostForm',
        component: () => import('../components/PostForm.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;