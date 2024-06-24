<template>
  <toolbar-admin></toolbar-admin>

  <div class="container">
    <h3>Pagar lista de cuentas de crédito</h3>
    <table class="customer-table">
      <thead>
      <tr>
        <th>DNI</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Tipo de compra</th>
        <th>Costo Actual</th>
        <th>Fecha de vencimiento</th>
        <th>Fecha de compra</th>
        <th>Pagar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cuenta in cuentas" :key="cuenta.id">
        <td>{{ cuenta.customer.user.dni }}</td>
        <td>{{ cuenta.customer.user.firstName }}</td>
        <td>{{ cuenta.customer.user.lastName }}</td>
        <td>{{ getTipoPago(cuenta.installmentNumber)}}</td>
        <td>S/.{{ cuenta.currentCost }}</td>
        <td>{{ new Date(cuenta.dueDate).toLocaleDateString() }}</td>
        <td>{{ new Date(cuenta.time).toLocaleDateString() }}</td>
        <td><button @click="realizarPago(cuenta.id)">Pagar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AccountApiService } from "../services/account-api.service.js";
import { PaymentApiService } from "../services/payment-api-service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";
import { PurchaseApiService } from "../services/purchase-api.service.js";

export default {
  name: "pay-credit",
  components: { ToolbarAdmin },
  data() {
    return {
      cuentas: [],
      purchaseApiService: new PurchaseApiService(),
      accountApiService: new AccountApiService(),
      paymentApiService: new PaymentApiService(),
    };
  },
  async created() {
    try {
      const adminId = sessionStorage.getItem("adminId");
      const response = await this.accountApiService.GetAccountByAdmin(adminId);
      this.cuentas = response.data;
    } catch (error) {
      console.error("Error al recuperar las cuentas:", error);
    }
  },
  methods: {
    getTipoPago(installmentNumber) {
      return installmentNumber !== null ? 'Cuotas' : 'Pago único';
    },
    async realizarPago(cuentaId) {
      try {
        const response = await this.paymentApiService.create({ cuentaId });
        if (response.status === 200) {
          alert("Pago realizado con éxito");
          await this.fetchCuentas(); // Refresca la lista después del pago
        } else {
          throw new Error("Hubo un error al realizar el pago");
        }
      } catch (error) {
        console.error("Error realizando el pago:", error);
        alert("Error realizando el pago: " + error.message);
      }
    },

    async fetchCuentas() {
      try {
        const adminId = sessionStorage.getItem("adminId");
        const response = await this.accountApiService.GetAccountByAdmin(adminId);
        this.cuentas = response.data;
      } catch (error) {
        alert("Hubo un error al cargar las cuentas: " + error.message);
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
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
