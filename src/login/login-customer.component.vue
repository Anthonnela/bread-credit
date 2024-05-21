

<template>
  <div class="container">
    <div class="row">
    </div>
    <div class="login-section">
      <h2>Bienvenido</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="dni">DNI</label>
          <input type="text" id="dni" v-model="dni" />
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-customer",
  data() {
    return {
      dni: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Lógica de inicio de sesión
      console.log('DNI:', this.dni);
      console.log('Contraseña:', this.password);
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background-size: cover;
}

.image-section {
  text-align: center;
}

.panaderia-image {
  width: 300px;
  height: auto;
}

.title {
  font-size: 2em;
  color: #000;
}

.subtitle {
  font-size: 1.5em;
  color: #000;
}

.login-section {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-section h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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