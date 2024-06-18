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
              <pv-input-text id="first_name" v-model="firstName"></pv-input-text>
            </div>
            <div class="row">
              <label>Apellido</label>
              <pv-input-text id="last_name" v-model="lastName"></pv-input-text>
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
            <!--ya no va
            <div class="row">
              <label>Día de Factura</label>
              <input v-model="diaFactura">
            </div>
            -->
            </div>
          </div>
        </div>
      <div class="form-card-footer">
        <pv-button @click="create()">Guardar</pv-button>
      </div>
      </div>
    </div>
  

</template>

<script>
import router from "../router/index.js";
import { CustomerApiService } from "../services/customer-api.service.js";
import { AccountApiService } from "../services/account-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";

export default {
  name: "add-customer",
  components: { ToolbarAdmin },
  data() {
    return {
      dni: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
      email: "",
      address: "",

      admin_id: "1",
      active: true,
      max_credit: 200,
      current_credit: 200,
      billingDay: 0,
      credit_type_of_rate: "TEM",
      credit_rate: 5,
      credit_compounding: 1,
      //agregado
      penalty_rate: 2,
      penalty_rate_type: "TEM",
      compensatory_rate_type:"TEM",
      compensatory_rate: 2,
      //
      invoice_penalty_rate_type: "TEM",
      invoice_penalty_rate: 2,
      invoice_penalty_compounding: 1,
      installment_penalty_rate_type: "TEM",
      installment_penalty_rate: 2,
      installment_penalty_compounding: 1,
      invoice_compensatory_rate_type: "TEM",
      invoice_compensatory_rate: 2,
      invoice_compensatory_compounding:1,
      installment_compensatory_rate_type: "TEM",
      installment_compensatory_rate: 2,
      installment_compensatory_compounding: 1,
      //agregado
      diaFactura: "",

      customerApiService: new CustomerApiService(),
      accountApiService: new AccountApiService(),
    };
  },

  methods: {
    async create() {
      //const adminId = sessionStorage.getItem("adminId"); //modificado
      const customer = {
        user:{
          firstName: this.firstName,
          lastName: this.lastName,
          dni: this.dni,
          password: this.password,
          phone: this.phone,
          email: this.email,
        },
        address: this.address,
      };

      const account = { 
      customer: {
        id: 0,
      },
      //admin_id: sessionStorage.getItem('adminId'),
      admin:{
        id: parseInt(sessionStorage.getItem('adminId'),10),
      },
      active: this.active,
      maxCredit: this.max_credit,
      currentCredit: this.current_credit,
      billingDay: this.billingDay,
      creditTypeOfRate: this.credit_type_of_rate,
      creditRate: this.credit_rate,
      creditCompounding: this.credit_compounding,    
      invoicePenaltyRateType: this.penalty_rate_type,
      invoicePenaltyRate: this.penalty_rate,
      invoicePenaltyCompouding: this.invoice_penalty_compounding,
      installmentPenaltyRateType: this.penalty_rate_type,
      installmentPenaltyRate: this.penalty_rate,
      installmentPenaltyCompouding: this.installment_penalty_compounding,
      invoiceCompensatoryRateType: this.compensatory_rate_type,
      invoiceCompensatoryRate: this.compensatory_rate,
      invoiceCompensatoryCompouding:this.invoice_compensatory_compounding,
      installmentCompensatoryRateType: this.compensatory_rate_type,
      installmentCompensatoryRate: this.compensatory_rate,
      installmentCompensatoryCompouding: this.installment_compensatory_compounding,
      };
//modificado
      try {
        const example = await this.customerApiService.create(customer);
        //revisar FERNANDO
        account.customer.id = example.data.id;
        await this.accountApiService.create(account); 
        alert("Cliente registrado con éxito");
        router.push('/main-admi');
      } catch (error) {
        alert("Hubo un error al registrar al cliente: " + error.message);
      }
    },
    //
    generateAccountNumber() {
      // número de cuenta aleatorio
      return Math.floor(Math.random() * 1000000).toString().padStart(5, "0");
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
  width:500px;
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
</style>