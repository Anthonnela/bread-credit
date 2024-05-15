
<script>
import router from "../router/index.js";
import { AccountApiService } from "../services/account-api.service.js";
import {CustomerApiService} from "../services/customer-api.service.js";
export default {
  name:"register-customer",
  data() {
    return {
      //customer
      dni: "",
      first_name: "",
      last_name: "",
      password: "",
      phone: "",
      email: "",

        customer_id:"1",
        max_credit: "200",
        current_credit: "200",
        credit_type_of_rate: "TEM",
        credit_rate: "5%",
        penalty_rate: "2%",
        installment_penalty_rate: "2%",
        compensatory_rate: "2%",
        installment_compensatory_rate: "2%",

      customerApiService: new CustomerApiService(),
      accountApiService: new AccountApiService(),
    };
  },

  methods: {
    async create() {
      const customer = {
        dni: this.dni,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        phone: this.phone,
        email: this.email,
        //cuenta de credito
        //tipoTasa: "Efectiva",
        //diaPago: "10",
        //tasaInteres: "5%",
      };

      const account = { 
        customer_id:this.customer_id,
        max_credit: this.max_credit,
        current_credit: this.current_credit,
        credit_type_of_rate: this.credit_type_of_rate,
        credit_rate: this.credit_rate,
        penalty_rate: this.penalty_rate,
        installment_penalty_rate: this.installment_penalty_rate,
        compensatory_rate: this.compensatory_rate,
        installment_compensatory_rate: this.installment_compensatory_rate,
      };
      
      const response = await this.customerApiService.create(customer);
      const response1 = await this.accountApiService.create(account);
      if (response.status === 201) {
        alert("Cliente Correctamente Registrado.");
        router.push({ path: "register-customer" });

        // Limpiar campos después del registro exitoso
        this.dni = "";
        this.first_name = "";
        this.last_name = "";
        this.password = "";
        this.phone = "";
        this.email = "";
        //fin de limpiar
      } else {
        alert("Error creating");
      }
    }
  }
};
</script>

<template>
  <div>
    <label>      Registrar al CLiente    </label>

    <div class="row">
      <label>DNI</label>
      <pv-input-text id="dni" v-model="dni"></pv-input-text>
    </div>
    <div class="row">
      <label>Nombre</label>
      <pv-input-text id="first_name" v-model="first_name"></pv-input-text>
    </div>
    <div class="row">
      <label>Apellido</label>
      <pv-input-text id="last_name" v-model="last_name"></pv-input-text>
    </div>
    <div class="row">
      <label>Contraseña</label>
      <pv-input-text id="password" v-model="password"></pv-input-text>
    </div>
    <div class="row">
      <label>Celular</label>
      <pv-input-text id="phone" v-model="phone"></pv-input-text>
    </div>
    <div class="row">
      <label>Correo</label>
      <pv-input-text id="email" v-model="email"></pv-input-text>
    </div>
    <pv-button @click="create()">save</pv-button>
  </div>


</template>




<style scoped>

</style>