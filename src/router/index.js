
import {createRouter, createWebHistory} from "vue-router";
import loginCustomerComponent from "../login/login-customer.component.vue";
import registerAdministrationComponent from "../register/register-administration.component.vue";
import loginAdministrationComponent from "../login/login-administration.component.vue";
import mainAdmiComponent from "../admi/main-admi.component.vue";
import registerCustomerComponent from "../register/register-customer.component.vue";
import generalLoginComponent from "../login/general-login.component.vue";
import toolbarAdminComponent from "../admi/toolbar-admin.component.vue";
import addCustomerComponent from "../admi/add-customer.component.vue";
import addProductComponent from "../admi/add-product.component.vue";
import payCreditComponent from "../admi/pay-credit.component.vue";
import salesCreditComponent from "../admi/sales-credit.component.vue";
import listCustomerComponent from "../admi/list-customer.component.vue";
import historyCreditComponent from "../admi/history-credit.component.vue";
import mainCustomerComponent from "../customer/main-customer.component.vue";
import toolbarCustomerCompoenent from "../customer/toolbar-customer.compoenent.vue";


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
        {path: '/add-customer', component:addCustomerComponent},
        {path: '/list-customer', component:listCustomerComponent},
        {path: '/sales-credit', component:salesCreditComponent},
        {path:'/pay-credit', component:payCreditComponent},
        {path:'/history-credit', component:historyCreditComponent},
       {path:'/main-customer', component:mainCustomerComponent},
        {path: '/toolbar-customer', component:toolbarCustomerCompoenent},
        {path: '/add-product', component:addProductComponent},



    ]


})

export default router;