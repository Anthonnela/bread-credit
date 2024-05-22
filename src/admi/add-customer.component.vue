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
              <pv-input-text id="nombre" v-model="nombre"></pv-input-text>
            </div>
            <div class="row">
              <label>Apellido</label>
              <pv-input-text id="apellido" v-model="apellido"></pv-input-text>
            </div>
            <div class="row">
              <label>Contraseña</label>
              <pv-input-text id="contraseña" v-model="contraseña"></pv-input-text>
            </div>
            <div class="row">
              <label>Celular</label>
              <pv-input-text id="celular" v-model="celular"></pv-input-text>
            </div>
            <div class="row">
              <label>Correo</label>
              <pv-input-text id="correo" v-model="correo"></pv-input-text>
            </div>
            <div class="row">
              <label>Dirección</label>
              <pv-input-text id="direccion" v-model="direccion"></pv-input-text>
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
              <pv-input-text id="numerocuenta" :value="numerocuenta" disabled></pv-input-text>
            </div>
            <div class="row">
              <label>Saldo de Crédito</label>
              <pv-input-text id="saldoDeCredito" v-model="saldoDeCredito" disabled></pv-input-text>
            </div>
            <div class="row">
              <label>Tipo de Pasa</label>
              <select v-model="tipoPasa">
                <option value="TEM">TEM</option>
                <option value="TNM">TNM</option>
              </select>
            </div>
            <div class="row">
              <label>Día de Pago</label>
              <input type="date" v-model="diaPago">
            </div>
            <div class="row">
              <label>Día de Factura</label>
              <input type="date" v-model="diaFactura">
            </div>
            <div class="row">
              <label>Tasa de Interés</label>
              <pv-input-text id="tasaInteres" v-model="tasaInteres" :placeholder="'2%'"></pv-input-text>
            </div>
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
import { CustomerApiService } from "../services/customer-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";

export default {
  name: "add-customer",
  components: { ToolbarAdmin },
  data() {
    return {
      dni: "",
      nombre: "",
      apellido: "",
      contraseña: "",
      celular: "",
      correo: "",
      direccion: "",
      numerocuenta: this.generateAccountNumber(),
      saldoDeCredito: 300,
      tipoPasa: "TEM",
      diaPago: "",
      diaFactura: "",
      tasaInteres: "2%",
      customerApiService: new CustomerApiService()
    };
  },

  methods: {
    async create() {
      const body = {
        dni: this.dni,
        nombre: this.nombre,
        apellido: this.apellido,
        contraseña: this.contraseña,
        celular: this.celular,
        correo: this.correo,
        direccion: this.direccion,
        cuenta: {
          numerocuenta: this.numerocuenta,
          saldoDeCredito: this.saldoDeCredito,
          tipoPasa: this.tipoPasa,
          diaPago: this.diaPago,
          diaFactura: this.diaFactura,
          tasaInteres: this.tasaInteres
        }
      };
      const response = await this.customerApiService.create(body);
      if (response.status === 201) {
        alert("Cliente registrado correctamente.");
        router.push('/main-admi');
      } else {
        alert("Error al crear el cliente.");
      }
    },

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
</style>