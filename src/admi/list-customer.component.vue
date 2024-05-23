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
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ customer.dni }}</td>
        <td>{{ customer.nombre }}</td>
        <td>{{ customer.apellido }}</td>
        <td>{{ customer.correo }}</td>
        <td>{{ customer.celular }}</td>
        <td>{{ customer.direccion }}</td>
        <td> {{ score }}</td>
        <!--
        <td>{{ customer.cuenta.numerocuenta }}</td>
        <td>{{ customer.cuenta.saldoDeCredito }}</td>
        <td>{{ customer.cuenta.tipoPasa }}</td>
        <td>{{ customer.cuenta.diaPago }}</td>
        <td>{{ customer.cuenta.diaFactura }}</td>
        <td>{{ customer.cuenta.tasaInteres }}</td>
        -->
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import eventBus from "../eventBus.js";
import { CustomerApiService } from "../services/customer-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";


export default {
  name: "list-customer",
  components: { ToolbarAdmin },
  data() {
    return {
      customers: [],
      score: '100'
    };
  },
  async created() {
    await this.loadCustomers();
    eventBus.on("EVENT", (data)=>{
  score = data; 
});
    
  },
  methods: {
    
    async loadCustomers() {
      
      try {
        const customerApiService = new CustomerApiService();
        const response = await customerApiService.getAll();
        this.customers = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    }
  }
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
</style>
