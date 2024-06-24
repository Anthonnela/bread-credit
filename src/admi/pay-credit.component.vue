<template>
  <toolbar-admin></toolbar-admin>

  <div class="container">
    <h3>Pagar lista de cuentas de crédito</h3>
    <table class="customer-table">
      <thead>
      <tr>
        <th>DNI</th>
        <th>Nombre y Apellido</th>
        <th>Cuota N°</th>
        <th>Tipo de pago</th>
        <th>Costo Inicial</th>
        <th>Consto Final</th>
        <th>Fecha de vencimiento</th>
        <th>Fecha de compra</th>
        <th>Pagar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="compras in historialCompras" :key="historialCompras.id">
        <td>{{ compras.dni }}</td>
        <td>{{ compras.fullName }}</td>
        <td>{{ compras.installmentNumber }}</td>
        <td>{{ getTipoPago(compras.installmentNumber) }}</td>
        <td>{{ compras.initialCost}}</td>
        <td>{{ compras.finalCost }}</td>
        <td>{{ new Date(compras.dueDate).toLocaleDateString() }}</td>
        <td>{{ new Date(compras.time).toLocaleDateString() }}</td>
        <td><button @click="realizarPago(compras.id)">Pagar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AccountApiService } from "../services/account-api.service.js";
import { PaymentApiService } from "../services/payment-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";
import { PurchaseApiService } from "../services/purchase-api.service.js";

export default {
  name: "pay-credit",
  components: { ToolbarAdmin },
  data() {
    return {
      cuentas: [],
      historialCompras: [],
      purchaseApiService: new PurchaseApiService(),
      accountApiService: new AccountApiService(),
      paymentApiService: new PaymentApiService(),
    };
  },
  async created() {
    try {
      const adminId = sessionStorage.getItem("adminId");
      //recuperamos las compras
      const response2 = await this.purchaseApiService.getPurchasesByAdminId(adminId);
      console.log("lista de compras", response2);
      this.historialCompras = response2.data;
      //
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
    async realizarPago(invoiceId) {
      try {
        const body ={
          invoice:{
            id: this.historialCompras.invoiceId,
          },
          installment:{
            id: this.historialCompras.installmentId,
          },
          amount: this.historialCompras.finalCost,
        }

        const response = await this.paymentApiService.create(body);
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
