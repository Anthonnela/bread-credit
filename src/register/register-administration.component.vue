<template>
  <div class="container">
    <div class="p-card register-card">
      <div class="p-card-header">
        Registrar Administrador
      </div>
      <div class="p-card-body">
        <div class="row">
          <label for="nombre">Nombre</label>
          <pv-input-text id="nombre" v-model="nombreadmin"></pv-input-text>
        </div>
        <div class="row">
          <label for="apellido">Apellidos</label>
          <pv-input-text id="apellido" v-model="apellido"></pv-input-text>
        </div>
        <div class="row">
          <label for="dni">DNI</label>
          <pv-input-text id="dni" v-model="dni"></pv-input-text>
        </div>
        <div class="row">
          <label for="contrasena">Contraseña</label>
          <pv-input-text id="contrasena" v-model="contrasena" type="password"></pv-input-text>
        </div>
        <div class="row">
          <label for="celular">Celular</label>
          <pv-input-text id="celular" v-model="celular"></pv-input-text>
        </div>
        <div class="row">
          <label for="correo">Correo</label>
          <pv-input-text id="correo" v-model="correo"></pv-input-text>
        </div>
        <div class="row">
          <label for="negocio">Seleccionar Negocio</label>
          <pv-input-text id="negocio" v-model="negocio"></pv-input-text>
        </div>
        <div class="row">
          <label for="nombrenegocio">Nombre del Negocio</label>
          <pv-input-text id="nombrenegocio" v-model="nombrenegocio"></pv-input-text>
        </div>
      </div>
      <div class="p-card-footer">
        <pv-button @click="create">Guardar</pv-button>
        <div class="p-mt-3">
          ¿Ya tienes una cuenta? <router-link to="/login-administration" class="login-link">Inicia sesión aquí</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { AdministrationApiService } from "../services/administration-api.service.js";

export default {
  name: "register-administration",
  data() {
    return {
      nombreadmin: "",
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
        nombreadmin: this.nombreadmin,
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
        this.nombreadmin = "";
        this.apellido = "";
        this.dni = "";
        this.contrasena = "";
        this.celular = "";
        this.correo = "";
        this.negocio = "";
        this.nombrenegocio = "";
      } else {
        alert("Error al crear el administrador.");
      }
    },

  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.p-card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.p-card-header {
  text-align: center;
  background-color: #007bff;
  color: #ffffff;
  border-radius: 8px 8px 0 0;
  padding: 10px;

}

.p-card-body {
  padding: 1rem;
}

.p-card-footer {
  text-align: center;
}

.p-mt-3 {
  margin-top: 3rem;
}

.row {
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 10px 0;
}

.login-link {
  color: #007bff;
  text-decoration: underline;
}
</style>
