<template>
  <toolbar-admin></toolbar-admin>
  <div class="container">
    <div class="p-card">
      <h3>Registrar al Cliente</h3>
      <div class="form-section">
        <div class="form-card">
          <div class="form-card-header">
            <h3>Registrar Datos</h3>
          </div>
          <div class="form-card-body">
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
            <div class="row">
              <label>Dirección</label>
              <pv-input-text id="address" v-model="address"></pv-input-text>
            </div>
          </div>
        </div>

        <div class="form-card">
          <div class="form-card-header">
            <h3>Configurar Cuenta</h3>
          </div>
          <div class="form-card-body">
            <div class="row">
              <label>Número de Cuenta</label>
              <pv-input-text id="admin_id" :value="admin_id" disabled></pv-input-text>
            </div>
            <div class="row">
              <label>Saldo de Crédito</label>
              <pv-input-text id="max_credit" v-model="max_credit" ></pv-input-text>
            </div>
            <div class="row">
              <label>Tipo de tasa</label>
              <select v-model="credit_type_of_rate">
                <option value="TEM">TEM</option>
                <option value="TNM">TNM</option>
              </select>
            </div>
            <div class="row">
              <label>Tasa de Interés</label>
              <pv-input-text id="credit_rate" v-model="credit_rate" :placeholder="'2%'"></pv-input-text>
            </div>
            <div class="row">
              <label>Capitalización</label>
              <pv-input-text id="credit_compounding" v-model="credit_compounding" :placeholder="'D'" disabled></pv-input-text>
            </div>
            <div class="row">
              <label>Tipo de tasa moratoria</label>
              <select v-model="penalty_rate_type">
                <option value="TEM">TEM</option>
                <option value="TNM">TNM</option>
              </select>
            </div>
            <div class="row">
              <label>Tasa de Interés moratoria</label>
              <pv-input-text id="penalty_rate" v-model="penalty_rate" :placeholder="'2%'"></pv-input-text>
            </div>
            <div class="row">
              <label>Tipo de tasa compensatoria</label>
              <select v-model="compensatory_rate_type">
                <option value="TEM">TEM</option>
                <option value="TNM">TNM</option>
              </select>
            </div>
            <div class="row">
              <label>Tasa de Interés compensatoria</label>
              <pv-input-text id="compensatory_rate" v-model="compensatory_rate" :placeholder="'2%'"></pv-input-text>
            </div>
          
            <div class="row">
              <label>Día de Factura</label>
              <input type="date" v-model="diaFactura">
            </div>
          <!--
            <div class="row"> 
              <label>Día de Pago</label>
              <input type="date" v-model="diaPago">
            </div>
            
          -->
          </div>
          <div class="form-card-footer">
            <pv-button @click="create()">Guardar</pv-button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import router from "../router/index.js";
import { AccountApiService } from "../services/account-api.service.js";
import { CustomerApiService } from "../services/customer-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";

export default {
  name: "add-customer",
  components: { ToolbarAdmin },
  data() {
    return {
      //customer
      dni: "",
      first_name: "",
      last_name: "",
      password: "",
      phone: "",
      email: "",
      address: "",

      admin_id: "1",
      active: "T",
      max_credit: "200",
      current_credit: "200",
      credit_type_of_rate: "TEM",
      credit_rate: "5%",
      credit_compounding: "D",
      //agregado
      penalty_rate: "2%",
      penalty_rate_type: "TEM",
      compensatory_rate_type:"TEM",
      compensatory_rate: "2%",
      //
      invoice_penalty_rate_type: "TEM",
      invoice_penalty_rate: "2%",
      invoice_penalty_compounding: "D",
      installment_penalty_rate_type: "TEM",
      installment_penalty_rate: "2%",
      installment_penalty_compounding: "D",
      invoice_compensatory_rate_type: "TEM",
      invoice_compensatory_rate: "2%",
      invoice_compensatory_compounding:"D",
      installment_compensatory_rate_type: "TEM",
      installment_compensatory_rate: "2%",
      installment_compensatory_compounding: "D",

      //agregado
      diaFactura: "",

      customerApiService: new CustomerApiService(),
      accountApiService: new AccountApiService(),
    };
  },

  methods: {

    async getLastDayOfMonth(year, month){
      return new Date(year, month + 1, 0);
    },
    

    async create() {
    
      const customer = {
        dni: this.dni,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        phone: this.phone,
        email: this.email,
        address: this.address,
      };

      const account = { 
      customer: customer,
      admin_id: this.admin_id,
      active: this.active,
      max_credit: this.max_credit,
      current_credit: this.current_credit,
      credit_type_of_rate: this.credit_type_of_rate,
      credit_rate: this.credit_rate,
      credit_compounding: this.credit_compounding,
      //agregado
      penalty_rate: this.penalty_rate,
      penalty_rate_type: this.penalty_rate_type,
      compensatory_rate_type: this.compensatory_rate,
      compensatory_rate: this.compensatory_rate_type,
      //
      invoice_penalty_rate_type: this.invoice_penalty_rate_type,
      invoice_penalty_rate: this.invoice_penalty_rate,
      invoice_penalty_compounding: this.invoice_penalty_compounding,
      installment_penalty_rate_type: this.installment_penalty_rate_type,
      installment_penalty_rate: this.installment_penalty_rate,
      installment_penalty_compounding: this.installment_penalty_compounding,
      invoice_compensatory_rate_type: this.invoice_compensatory_rate_type,
      invoice_compensatory_rate: this.invoice_compensatory_rate,
      invoice_compensatory_compounding:this.invoice_compensatory_compounding,
      installment_compensatory_rate_type: this.installment_compensatory_rate_type,
      installment_compensatory_rate: this.installment_compensatory_rate,
      installment_compensatory_compounding: this.installment_compensatory_compounding,

      //
      diaFactura: this.diaFactura,
      };
      
      const response = await this.customerApiService.create(customer);
      const response1 = await this.accountApiService.create(account);
      if (response.status === 201) {
        alert("Cliente Correctamente Registrado.");
        router.push({ path: "main-admi" });

        // Limpiar campos después del registro exitoso
        this.dni = "";
        this.first_name = "";
        this.last_name = "";
        this.password = "";
        this.phone = "";
        this.email = "";
        this.address = "";
        //fin de limpiar
      } else {
        alert("Error creating");
      }
    }
    

  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  gap: 20px;
  background-color: #1f2937;


}

.form-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;


}

.form-card {
  width:400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(172, 214, 228);
}

.form-card-header {
  text-align: center;

  padding: 10px;

}

.form-card-body {
  padding: 1rem;
}

.form-card-footer {
  text-align: center;
  padding: 10px;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.row {
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 10px 0;
}

button{
  background-color: azure;
}
</style>