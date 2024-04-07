
import {createRouter, createWebHistory} from "vue-router";
import LoginComoponent from "../authentication/login-clients.comoponent.vue";
const router=createRouter({

    history: createWebHistory(),
    routes: [
        {path:'/', component:LoginComoponent},
        {path:'/', redirect:'/login'}
    ]


})

export default router;