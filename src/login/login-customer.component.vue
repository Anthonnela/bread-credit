<script>
import { CustomerApiService } from "../services/customer-api.service.js";
import router from "../router/index.js";

export default {
  name: "login-customer",
  data() {
    return {
      dni: "",
      contrasena: "",
      customerApiService: new CustomerApiService(),
    };
  },
  methods: {
    async login() {
      const body = {
        dni: this.dni,
        contrasena: this.contrasena,
      };

      const response = await this.customerApiService.Logincustomer(body.dni, body.contrasena);

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

<template>
  <div class="login-container">
    <div class="p-card">
      <div class="p-card-header"></div>
      
  </div>
</div>
  <div class="p-card-body">
      <h2>Bienvenido</h2>
      <form @submit.prevent="handleLogin">
      <div class="input-group">
      <label>DNI</label>
      <pv-input-text id="dni" v-model="dni"></pv-input-text>
  </div>
    
    <div class="p-card">
      <label>Contraseña</label>
      <pv-input-text id="username" v-model="password"></pv-input-text>
    </div>
    <button @click="login" class="p-button p-button-primary">Iniciar Sesión</button>
  </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 1vh;
  background-size: cover;
}

.image-section {
  text-align: center;
}

.p-card {
  width: 300px;
  height: auto;
}

button {
  width: 100%;
  padding: 10px;
  background: #90CAF9;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background: #64B5F6;
}
</style>