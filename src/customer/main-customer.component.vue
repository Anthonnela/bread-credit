<template>
  <toolbar-customer></toolbar-customer>
  <div class="container">
    <div class="saludo">
      <p>Hola, {{ nombre }}</p>
      <p>Número de cuenta: {{ numeroCuenta }}</p>
    </div>
    <div class="cliente-info">
      <div class="card">
        <h2>Resumen de Cuenta</h2>
        <p><strong>Saldo Actual:</strong> ${{ saldoActual.toFixed(2) }}</p>
        <p><strong>Límite de Crédito:</strong> ${{ limiteCredito.toFixed(2) }}</p>
        <p><strong>Próxima Fecha de Pago:</strong> {{ new Date(diaPago).toLocaleDateString() }}</p>
      </div>
      <div class="card">
        <h2>Historial de Compras</h2>
        <table>
          <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Intereses</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(compra, index) in historialCompras" :key="index">
            <td>{{ new Date(compra.fecha).toLocaleDateString() }}</td>
            <td>{{ compra.descripcion }}</td>
            <td>${{ compra.monto.toFixed(2) }}</td>
            <td>${{ compra.intereses.toFixed(2) }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <h2>Detalles de Intereses</h2>
        <p>Intereses acumulados hasta la fecha de pago: ${{ interesesAcumulados.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { CustomerApiService } from "../services/customer-api.service.js";
import ToolbarCustomer from "../customer/toolbar-customer.compoenent.vue";

export default {
  name: "main-customer",
  components: {ToolbarCustomer},

  data() {
    return {
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
      customerApiService: new CustomerApiService()
    };
  },
  async created() {
    try {
      const customerId = sessionStorage.getItem("customerId");
      const response = await this.customerApiService.getById(customerId);

      if (response && response.data) {
        const {
          nombre,
          apellido,
          dni,
          celular,
          correo,
          direccion,
          cuenta: {
            numerocuenta,
            saldoDeCredito,
            diaPago,
            diaFactura
          }
        } = response.data;

        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.celular = celular;
        this.correo = correo;
        this.direccion = direccion;
        this.numeroCuenta = numerocuenta;
        this.saldoActual = saldoDeCredito;
        this.diaPago = diaPago;
        this.diaFactura = diaFactura;

        // Obtener historial de compras
        const historialResponse = await this.customerApiService.getHistorialCompras(customerId);
        if (historialResponse && historialResponse.data) {
          this.historialCompras = historialResponse.data;

          // Calcular intereses acumulados
          this.interesesAcumulados = this.calcularInteresesAcumulados(this.historialCompras);
        }
      }
    } catch (error) {
      console.error("Error al recuperar los datos del cliente:", error);
    }
  },
  methods: {
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
  border-radius: 10px;
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
