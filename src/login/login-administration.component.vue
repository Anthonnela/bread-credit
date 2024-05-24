<template>
  <div class="container">
    <div class="p-card login-card">
      <div class="p-card-header">
        Iniciar Sesión
      </div>
      <div class="p-card-body">
        <div class="p-fluid p-formgrid">
          <div class="p-field p-col">
            <label for="dni">DNI</label>
            <input id="dni" v-model="dni" type="text" class="p-inputtext">
          </div>
          <div class="p-field p-col">
            <label for="contrasena">Contraseña</label>
            <input id="contrasena" v-model="contrasena" type="password" class="p-inputtext">
          </div>
        </div>
      </div>
      <div class="p-card-footer">
        <button @click="login" class="p-button p-button-primary">Iniciar Sesión</button>
        <div class="p-mt-3">
          ¿No tienes una cuenta? <router-link to="/register-administration" class="register-link">Regístrate aquí</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index.js";
import { AdministrationApiService } from "../services/administration-api.service.js";

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

      if (response && response.data && response.data.length > 0) {
        alert("Inicio de sesión exitoso.");
        const userId = response.data[0].id;
      //  const isAdministration = response.data[0].isAdministration;
        sessionStorage.setItem("userId", userId);

        router.push('/main-admi');
        //this.$store.commit("SET_ADMIN", response.data[0]);
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

.p-inputtext {
  width: 100%;
}

.register-link {
  color: #007bff;
  text-decoration: underline;
}
</style>
