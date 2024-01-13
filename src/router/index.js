import Vue from 'vue';
import VueRouter from 'vue-router';
import Top from '@/components/Top.vue';
import About from '@/components/About.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: true,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
