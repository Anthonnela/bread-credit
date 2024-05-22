<template>
  <div class="container">
    <div class="p-card login-card">
      <div class="p-card-header">
        Iniciar Sesión
      </div>
      <div class="p-card-body">
        <div class="p-fluid p-formgrid">
          <div class="p-field p-col">
            <label for="email">Correo</label>
            <pv-input-text id="email" v-model="email" type="text"></pv-input-text>
          </div>
          <div class="p-field p-col">
            <label for="password">Contraseña</label>
            <pv-input-text id="password" v-model="password" type="password"></pv-input-text>
          </div>
        </div>
      </div>
      <div class="p-card-footer">
        <pv-button @click="login">Iniciar Sesión</pv-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CustomerApiService } from "../services/customer-api.service.js";
import router from "../router/index.js";

export default {
  name: "login-customer",
  data() {
    return {
      email: "",
      password: "",
      customerApiService: new CustomerApiService()
    };
  },
  methods: {
    async login() {
      console.log("Intentando iniciar sesión con:", this.email, this.password);
      try {
        const response = await this.customerApiService.Logincustomer(
            this.email,
            this.password
        );

        if (response && response.data && response.data.length > 0) {
          alert("Inicio de sesión exitoso.");
          const customerId = response.data[0].id;
          sessionStorage.setItem("customerId", customerId);
          router.push("/main-customer");
        } else {
          alert("Correo o contraseña inválidos.");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.");
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.p-card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.p-card-header {
  text-align: center;
  background-color: #007bff; /* Azul */
  color: #ffffff; /* Blanco */
  border-radius: 8px 8px 0 0;
  padding: 10px;
}

.p-card-body {
  padding: 1rem;
}

.p-card-footer {
  text-align: center;
  padding: 10px;
}

.p-inputtext {
  width: 100%;
}
</style>
