<template>
  <div class="container">
    <div class="p-card">
      <div class="p-card-header">
        Iniciar Sesión
      </div>
      <div class="p-card-body">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col">
            <label for="dni">DNI</label>
            <input id="dni" v-model="dni" type="text" class="p-inputtext" :style="{ backgroundColor: 'blue' }">
          </div>
          <div class="p-field p-col">
            <label for="contrasena">Contraseña</label>
            <input id="contrasena" v-model="contrasena" type="password" class="p-inputtext"q :style="{ backgroundColor: 'blue' }">
          </div>
        </div>
      </div>
      <div class="p-card-footer">
        <button @click="login" class="p-button p-button-primary">Iniciar Sesión</button>
        <div class="p-mt-3">
          ¿No tienes una cuenta?  <router-link to="/register-administration" class="register-link">Regístrate aquí</router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {AdministrationApiService} from "../services/administration-api.service.js";
import router from "../router/index.js";

export default {
  name: "login-administration",
  data() {
    return {
      dni: "",
      contrasena: "",
      administrationApiService: new AdministrationApiService(),
    };
  },
  methods: {
    async login() {
      const body = {
        dni: this.dni,
        contrasena: this.contrasena,
      };

      const response = await this.administrationApiService.Loginadministration(body.dni, body.contrasena);

      if (response.data.length > 0) {
        alert("Inicio de sesión exitoso.");
        router.push("/main-admi");
        this.$store.commit("SET_ADMIN", response.data[0]);
      } else {
        alert("DNI o contraseña inválidos.");
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
  background-color: rgba(14, 125, 204, 0.78); /* Azul suave */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgb(53, 253, 253);
}

.p-card-header {
  text-align: center;
  background-color: #1244e7; /* Azul */
  color: #ffffff; /* Blanco */
  border-radius: 5px 5px 0 0;
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

.p-inputtext {
  color: #ffffff;
}
.register-link {
  color: #170303;
  text-decoration: underline;
}
.p-password-icon {
  color: black; /* Negro */
}
</style>

