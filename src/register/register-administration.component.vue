<template>
  <div class="container">
    <div class="p-card register-card">
      <div class="p-card-header">
        Registrar Administrador
      </div>
      <div class="p-card-body">
        <div class="row">
          <label for="nombre">Nombre</label>
          <pv-input-text id="nombre" v-model="firstName"></pv-input-text>
        </div>
        <div class="row">
          <label for="lastName">Apellido</label>
          <pv-input-text id="lastName" v-model="lastName"></pv-input-text>
        </div>
        <div class="row">
          <label for="dni">DNI</label>
          <pv-input-text id="dni" v-model="dni"></pv-input-text>
        </div>
        <div class="row">
          <label for="password">Contraseña</label>
          <pv-input-text id="password" v-model="password" type="password"></pv-input-text>
        </div>
        <div class="row">
          <label for="phone">Celular</label>
          <pv-input-text id="phone" v-model="phone"></pv-input-text>
        </div>
        <div class="row">
          <label for="email">Correo</label>
          <pv-input-text id="email" v-model="email"></pv-input-text>
        </div>
        <div class="row">
          <label for="businessType">Seleccionar negocio</label>
          <pv-input-text id="businessType" v-model="businessType"></pv-input-text>
        </div>
        <div class="row">
          <label for="businessName">Nombre del negocio</label>
          <pv-input-text id="businessName" v-model="businessName"></pv-input-text>
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
      firstName: "",
      lastName: "",
      dni: "",
      password: "",
      phone: "",
      email: "",
      businessType: "",
      businessName: "",
      administrationApiService: new AdministrationApiService()
    };
  },

  methods: {
    async create() {
      const body = {
        user : {
          firstName: this.firstName,
          lastName: this.lastName,
          dni: this.dni,
          password: this.password,
          phone: this.phone,
          email: this.email,
        },
        businessType: this.businessType,
        businessName: this.businessName
      };
      const response = await this.administrationApiService.create(body);
      if (response.status === 201) {
        alert("Administrador registrado correctamente.");
        this.firstName = "";
        this.lastName = "";
        this.dni = "";
        this.password = "";
        this.phone = "";
        this.email = "";
        this.businessType = "";
        this.businessName = "";
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
