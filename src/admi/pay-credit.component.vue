<template>
  <toolbar-admin></toolbar-admin>

  <div class="container">
    <h3>Pagar Lista de Cuentas de Crédito</h3>

    <div class="search">
      <label>Buscar por DNI:</label>
      <input type="text" v-model="searchDNI">
      <button @click="searchCuentas">Buscar</button>
    </div>
    <div v-if="cliente">
    </div>
    <h2>Historial de Compras al Credito</h2>
    <table>
      <thead>
      <tr>
        <th>DNI</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Tipo de Compra</th>
        <th>Costo Actual</th>
        <th>Fecha de Vencimiento</th>
        <th>Fecha de Compra</th>
        <th>Pagar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(compra, index) in historialCompras" :key="index">
        <td>{{ cliente.customer.user.dni }}</td>
        <td>{{ cliente.customer.user.firstName }}</td>
        <td>{{ cliente.customer.user.lastName }}</td>
        <td>{{ getTipoPago(compra.installmentNumber) }}</td>
        <td>S/. {{ compra.finalCost }}</td>
        <td>{{ new Date(compra.dueDate).toLocaleDateString() }}</td>
        <td>{{ new Date(compra.time).toLocaleDateString() }}</td>
        <td><button @click="realizarPago(compra.id)">Pagar</button></td>
      </tr>
      </tbody>
    </table>
    <div v-if="cliente">
    </div>
    <p v-else>No se encontraron cuentas de crédito para el DNI proporcionado.</p>
  </div>
</template>

<script>
import ToolbarAdmin from "./toolbar-admin.component.vue";
import { AccountApiService } from "../services/account-api.service.js";
import { PaymentApiService } from "../services/payment-api-service.js";
import { PurchaseApiService } from "../services/purchase-api.service.js";

export default {
  name: "pay-credit",
  components: { ToolbarAdmin },
  data() {
    return {
      searchDNI: "",
      cliente: null,
      historialCompras: [],
      accountApiService: new AccountApiService(),
      paymentApiService: new PaymentApiService(),
      purchaseApiService: new PurchaseApiService(),
    };
  },
  methods: {
    async searchCuentas() {
      if (this.searchDNI.trim()) {
        try {
          // Obtener información de la cuenta del cliente por DNI
          const accountResponse = await this.accountApiService.getByDNI(this.searchDNI.trim());
          this.cliente = accountResponse.data;

          // Obtener historial de compras del cliente
          const purchasesResponse = await this.purchaseApiService.getPurchasesByCustomerId(this.cliente.customer.id);
          this.historialCompras = purchasesResponse.data;
        } catch (error) {
          console.error("Error al buscar las cuentas:", error);
          alert("Error al buscar las cuentas: " + error.message);
          this.cliente = null;
          this.historialCompras = [];
        }
      } else {
        this.cliente = null;
        this.historialCompras = [];
      }
    },
    getTipoPago(installmentNumber) {
      return installmentNumber !== null ? "Cuotas" : "Pago único";
    },
    async realizarPago(compraId) {
      try {
        const response = await this.paymentApiService.create({compraId});
        if (response.status === 200) {
          alert("Pago realizado con éxito");
          this.searchCuentas(); // Refresca la lista después del pago
        } else {
          throw new Error("Hubo un error al realizar el pago");
        }
      } catch (error) {
        console.error("Error realizando el pago:", error);
        alert("Error realizando el pago: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search input {
  margin-right: 10px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-bottom: 15px;
  font-size: 1.5em;
}

.card p {
  margin: 5px 0;
  font-size: 1.1em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #007bff;
  color: #fff;
}

thead {
  background-color: #f1f1f1;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
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
