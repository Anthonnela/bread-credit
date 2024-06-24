<template>
  <toolbar-customer></toolbar-customer>
  <div class="container">
    <div class="saludo">
      <p>Hola: {{ nombre}}</p>
      <p>Número de cuenta: {{ apellido }}</p>
    </div>
    <div class="cliente-info">
      <div class="card">
        <h2>Resumen de Cuenta</h2>
        <p><strong>Saldo Actual:</strong> S/.{{ saldoActual.toFixed(2) }}</p>
        <p><strong>Límite de Crédito:</strong> S/.{{ limiteCredito.toFixed(2) }}</p>
        <!--
        <p><strong>Próxima Fecha de Pago:</strong> {{ new Date(diaPago).toLocaleDateString() }}</p>
        -->
      </div>
      <div class="card">
        <h2>Facturas</h2>
        <table>
          <thead>
          <tr>
            <th>N° de cuota</th>
            <th>Fecha de factura</th>
            <th>Fecha de vencimiento</th>
            <th>Descripción (producto/cantidad)</th>
            <th>Tipo de pago</th>
            <th>Monto</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(compras, index) in historialCompras" :key="index">
            <td>{{ compras.installmentNumber }}</td>
            <td>{{ new Date(compras.time).toLocaleDateString() }}</td>
            <td>{{ new Date(compras.dueDate).toLocaleDateString() }}</td>
            <td>{{ compras.description }}</td>
            <td>{{ getTipoPago(compras.installmentNumber)}}</td>
            <td>S/.{{ compras.finalCost }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <h2>Detalles de Intereses</h2>
        <p>Intereses acumulados hasta la fecha de pago: S/.{{ totalIntereses.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { CustomerApiService } from "../services/customer-api.service.js";
import { PurchaseApiService } from "../services/purchase-api.service.js";
import {AccountApiService} from "../services/account-api.service.js";
import ToolbarCustomer from "../customer/toolbar-customer.compoenent.vue";

export default {
  name: "main-customer",
  components: {ToolbarCustomer},
  data() {
    return {
      cliente:{},
      nombre: "",
      apellido: "",
      dni: "",
      celular: "",
      correo: "",
      direccion: "",
      numeroCuenta: "",
      saldoActual: 0,
      limiteCredito: 300,
      diaPago: "",
      diaFactura: "",
      historialCompras: [],
      interesesAcumulados: 0,
      customerApiService: new CustomerApiService(),
      purchaseApiService: new PurchaseApiService(),
      accountApiService: new AccountApiService(),
      totalMontoFinal: 0,
      totalMontoInicial: 0,
      totalIntereses: 0,
    };
  },
  async created() {
    try {
      const customerId = sessionStorage.getItem("customerId");
      const response = await this.accountApiService.GetAccountByCustomer(customerId);
      this.cliente =response.data;
      this.apellido = this.cliente.customer.user.lastName;
      this.nombre = this.cliente.customer.user.firstName;
      this.saldoActual = this.cliente.currentCredit;
      this.limiteCredito = this.cliente.maxCredit;
      this.diaPago = this.cliente.billingDay;

      //recuperamos las compras
      const response2 = await this.purchaseApiService.getPurchasesByCustomerId(customerId);
      console.log("lista de compras", response2);
      this.historialCompras = response2.data;
      

      
      //calculamos suma monto final y monto inicial
      for(let i=0; i<this.historialCompras.length; i++){
        this.totalMontoFinal += this.historialCompras[i].finalCost;
        this.totalMontoInicial += this.historialCompras[i].initialCost;
      }
      this.totalIntereses = this.totalMontoFinal - this.totalMontoInicial;



    } catch (error) {
      console.error("Error al recuperar los datos del cliente:", error);
    }
  },
  methods: {
    getTipoPago(installmentNumber) {
      return installmentNumber !== null ? 'Cuotas' : 'Pago único';
    },
    calcularInteresesAcumulados(historialCompras) {
      let interesesTotales = 0;
      historialCompras.forEach(compra => {
        interesesTotales += compra.intereses;
      });
      return interesesTotales;
    }
  }
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

.saludo {
  text-align: center;
  margin-bottom: 20px;
}

.cliente-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
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
</style>
