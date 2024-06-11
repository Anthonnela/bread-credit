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
            <label for="password">Contraseña</label>
            <input id="password" v-model="password" type="password" class="p-inputtext">
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
      password: "",
      administrationApiService: new AdministrationApiService(),
    };
  },
  methods: {
    async login() {
      const body = {
        dni: this.dni,
        password: this.password,
      };
      const response = await this.administrationApiService.Loginadministration(body);

      if (response.status === 200) {
        alert("Inicio de sesión exitoso.");
        const adminId = response.data.id;
      //  const isAdministration = response.data[0].isAdministration;
        sessionStorage.setItem("adminId", adminId);

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
