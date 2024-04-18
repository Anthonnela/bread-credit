<template>
  <div>
    <label>Registrar al administrador</label>

    <div class="row">
      <label>Nombre</label>
      <pv-input-text id="nombre" v-model="nombre"></pv-input-text>
    </div>
    <div class="row">
      <label>Apellidos</label>
      <pv-input-text id="apellido" v-model="apellido"></pv-input-text>
    </div>
    <div class="row">
      <label>DNI</label>
      <pv-input-text id="dni" v-model="dni"></pv-input-text>
    </div>
    <div class="row">
      <label>Contrasena</label>
      <pv-input-text id="contrasena" v-model="contrasena"></pv-input-text>
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
      <label>Seleccion Negocio</label>
      <pv-input-text id="negocio" v-model="negocio"></pv-input-text>
    </div>
    <div class="row">
      <label>Nombre Negocio</label>
      <pv-input-text id="nombrenegocio" v-model="nombrenegocio"></pv-input-text>
    </div>

    <pv-button @click="create()">Guardar</pv-button>
    <router-link to="/login-administration" class="register-link">Inicia sesión aquí</router-link>

  </div>
</template>

<script >
import { AdministrationApiService } from "../services/administration-api.service.js";
import router from "../router/index.js";

export default {
  name: "register-administration",
  data() {
    return {
      nombre: "",
      apellido: "",
      dni: "",
      contrasena: "",
      celular: "",
      correo: "",
      negocio: "",
      nombrenegocio: "",
      administrationApiService: new AdministrationApiService()
    };
  },

  methods: {
    async create() {
      const body = {
        nombre: this.nombre,
        apellido: this.apellido,
        dni: this.dni,
        contrasena: this.contrasena,
        celular: this.celular,
        correo: this.correo,
        negocio: this.negocio,
        nombrenegocio: this.nombrenegocio
      };
      const response = await this.administrationApiService.create(body);
      if (response.status === 201) {
        alert("Administrador registrado correctamente.");
        // Reiniciar los campos
        this.resetFields();
        // Redireccionar a la misma página
        router.push({ path: "register-administration" });
      } else {
        alert("Error al crear el administrador.");
      }
    },

    resetFields() {
      this.nombre = "";
      this.apellido = "";
      this.dni = "";
      this.contrasena = "";
      this.celular = "";
      this.correo = "";
      this.negocio = "";
      this.nombrenegocio = "";
    }
  }
};
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 10% 0;
}
</style>
