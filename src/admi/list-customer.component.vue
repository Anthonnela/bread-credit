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
        <th>Tipo de Tasa</th>
        <th>Día de Pago</th>
        <th>Día de Factura</th>
        <th>Tasa de Interés</th>
        <th>Eliminar cliente</th>
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
        <td>
          <button @click="eliminarCliente(cuenta.id)">Eliminar</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AccountApiService } from "../services/account-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";

export default {
  name: "list-customer",
  components: { ToolbarAdmin },
  data() {
    return {
      cuentas: [],
      accountApiService: new AccountApiService(),
    };
  },
  async created() {
    const adminId = sessionStorage.getItem("adminId");
    try {
      const response = await this.accountApiService.GetAccountByAdmin(adminId);
      this.cuentas = response.data;
    } catch (error) {
      alert("Hubo un error al cargar los clientes: " + error.message);
    }
  },
  methods: {
    async eliminarCliente(accountId) {
      if (confirm("¿Estás seguro que deseas eliminar este cliente?")) {
        try {
          const response = await this.accountApiService.delete(accountId);
          if (  response.status === 200) {
            // Eliminar el cliente de la lista localmente
            this.cuentas = this.cuentas.filter(cuenta => cuenta.id !== accountId);
            alert("Cliente eliminado correctamente.");
          } else {
            alert("Hubo un error al eliminar el cliente.");
          }
        } catch (error) {
          console.error("Error al eliminar el cliente:", error);
          alert("Hubo un error al eliminar el cliente: " + error.message);
        }
      }
    },
  },
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

button {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>
