
<script>
import router from "../router/index.js";
import {CustomerApiService} from "../services/customer-api.service.js";
export default {
  name:"register-customer",
  data() {
    return {
      dni: "",
      nombre: "",
      apellido: "",
      contraseña: "",
      celular: "",
      correo: "",
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
      };
      const response = await this.customerApiService.create(body);
      if (response.status === 201) {
        alert("Administration Correctamente Registrado.");
        router.push("admin"); // Corrección aquí
      } else {
        alert("Error creating");
      }
    }
  }
};
</script>

<template>
  <div>
    <label>      Registrar al CLiente    </label>

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
    <pv-button @click="create()">save</pv-button>
  </div>


</template>

<style scoped>

</style>