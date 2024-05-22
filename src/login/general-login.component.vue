<style>
.image-container {
  height: 200px; /* Altura fija */
}
</style>

<template>
  <div class="container">
    <h2>¿Cómo desea iniciar sesión?</h2>
    <div class="content">
      <div class="login-option">
        <div class="image-container">
          <img class="bordered" src="/images/client.png" alt="Imagen Cliente">
        </div>
        <div>
          <button @click="goToLogInCustomer" class="rounded-button">Cliente</button>
        </div>
      </div>
      <div class="vertical-line"></div>
      <div class="login-option">
        <div class="image-container">
          <img class="bordered" src="/images/admi.png" alt="Imagen Administrador">
        </div>
        <div>
          <button @click="goToLogInAdmi" class="rounded-button">Administrador</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralLogin",
  methods:{
    goToLogInCustomer(){
      this.$router.push('/login-customer');
    },
    goToLogInAdmi(){
      this.$router.push('/login-administration');
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  width: 100%;
  padding: 50px;
  background: linear-gradient(to bottom, rgb(199, 236, 232) 60%, rgb(172, 214, 228) 50%);
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-option {
  margin: 0 20px;
}

.image {
  width: 200px;
  height: auto;
}

.rounded-button {
  margin-top: 10px;
  padding: 10px 16px;
  border: none;
  border-radius: 20px;
  background-color: rgb(3, 15, 39);
  color: white;
  cursor: pointer;
}

.vertical-line {
  height: 400px;
  border-left: 2px solid black;
  margin: 0 20px;
}
</style>