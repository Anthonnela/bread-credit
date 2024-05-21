
import {createRouter, createWebHistory} from "vue-router";
import loginCustomerComponent from "../login/login-customer.component.vue";
import registerAdministrationComponent from "../register/register-administration.component.vue";
import loginAdministrationComponent from "../login/login-administration.component.vue";
import mainAdmiComponent from "../admi/main-admi.component.vue";
import registerCustomerComponent from "../register/register-customer.component.vue";
import generalLoginComponent from "../login/general-login.component.vue";
import toolbarAdminComponent from "../admi/toolbar-admin.component.vue";

const router=createRouter({

    history: createWebHistory(),
    routes: [
        {path:'/', component:generalLoginComponent},
        {path:'/login-administration', component:loginAdministrationComponent},
        {path:'/login-customer', component:loginCustomerComponent},
        {path: '/register-administration', component:registerAdministrationComponent},
        {path: '/register-customer', component:registerCustomerComponent},
        {path: '/main-admi', component:mainAdmiComponent},
        {path: '/toolbar-admin', component:toolbarAdminComponent},


    ]


})

export default router;