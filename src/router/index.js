
import {createRouter, createWebHistory} from "vue-router";
import LoginComoponent from "../authentication/login-clients.comoponent.vue";
import MainUserComponent from "../user/main-user.component.vue";
const router=createRouter({

    history: createWebHistory(),
    routes: [
        {path:'/', component:LoginComoponent},
        {path:'/', redirect:'/login'},

        {path:'/main-user', redirect:MainUserComponent,meta:{title:'main user'}},
    ]


})

export default router;