<script>
export default {
  name: "toolbar-admin"
}
</script>

<template>
  <header>
    <div class="welcome">
      <span class="icon">&#128100;</span>
      <span>Hola Administrador Bienvenido</span>
    </div>
    <div class="logout">
      <span class="icon">&#8594;</span> <span class="icon" style="border-radius: 50%;">&#9723;</span>
      <router-link to="/">Cerrar Sesión</router-link>    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #add8e6;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .welcome {
  display: flex;
  align-items: center;
}

header .welcome .icon {
  margin-right: 10px;
  font-size: 24px;
}

header .logout {
  display: flex;
  align-items: center;
}

header .logout .icon {
  margin-right: 5px;
  font-size: 24px;
}

header .logout a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>