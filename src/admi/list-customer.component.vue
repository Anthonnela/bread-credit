<template>
  <toolbar-admin></toolbar-admin>
  <div class="container">
    <h3>Lista de Clientes Registrados</h3>
    <table class="customer-table">
      <thead>
      <tr>
        <th>DNI</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Correo</th>
        <th>Celular</th>
        <th>Dirección</th>
        <th>Número de Cuenta</th>
        <th>Saldo de Crédito</th>
        <th>Tipo de Pasa</th>
        <th>Día de Pago</th>
        <th>Día de Factura</th>
        <th>Tasa de Interés</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cuenta in cuentas" :key="cuenta.id">
        <td>{{ cuenta.customer.user.dni }}</td>
        <td>{{ cuenta.customer.user.firstName }}</td>
        <td>{{ cuenta.customer.user.lastName }}</td>
        <td>{{ cuenta.customer.user.email }}</td>
        <td>{{ cuenta.customer.user.phone }}</td>
        <td>{{ cuenta.customer.address }}</td>
        <td>{{ cuenta.id }}</td>
        <td>{{ cuenta.currentCredit }}</td>
        <td>{{ cuenta.creditTypeOfRate }}</td>
        <td>{{ cuenta.billingDay }}</td>
        <td>{{ cuenta.billingDay }}</td>
        <td>{{ cuenta.creditRate }}</td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AccountApiService } from "../services/account-api.service.js";
import { CustomerApiService } from "../services/customer-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";

export default {
  name: "list-customer",
  components: { ToolbarAdmin },
  data() {
    return {
      customers: [],
      customerApiService: new CustomerApiService(),
      accountApiService: new AccountApiService(),
      cuentas: [],

    };
  },
  async created() {
//modificado
    const adminId = sessionStorage.getItem("adminId");
    try {
      //const response = await this.customerApiService.GetCustomerByAdmin(adminId);
      const response = await this.accountApiService.GetAccountByAdmin(adminId);
      //this.customers = response.data;
      this.cuentas = response.data;
    } catch (error) {
      alert("Hubo un error al cargar los clientes: " + error.message);
    }

  },
  //methods: {
   // async loadCustomers() {
      //try {
       // const customerApiService = new CustomerApiService();
       // const response = await customerApiService.getAll();
        //this.customers = response.data;
      //} catch (error) {
        //console.error("Error al obtener la lista de clientes:", error);
     // }
    //}
  //}


};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f8f9fa;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.customer-table th,
.customer-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.customer-table th {
  background-color: #007bff;
  color: white;
}

.customer-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.customer-table tr:hover {
  background-color: #ddd;
}

td{
  color: black;
}
</style>
