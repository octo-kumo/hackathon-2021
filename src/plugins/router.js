import User from '../pages/User.vue'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Student from '../pages/Student.vue'
import VueRouter from 'vue-router'
import Vue from "vue";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home,
            name: "Home",
            meta: {icon: 'mdi-home', requiresAuth: true, public: true}
        },
        {
            path: '/account',
            component: User,
            name: "Account",
            meta: {icon: 'mdi-account', requiresAuth: true, public: true}
        },
        {
            path: '/student',
            component: Student,
            name: "Students",
            meta: {icon: 'mdi-account', requiresAuth: true, public: true}
        },
        {
            path: '/login',
            component: Login,
            name: "Login",
            meta: {icon: 'mdi-home', requiresAuth: false, public: false}
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log(Vue.$cookies.get("logged_in"));
        if (!Vue.$cookies.get("logged_in")) {
            next({name: 'Login'})
        } else {
            next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
});
export default router;