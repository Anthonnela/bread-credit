<script>
export default {
  name: "general-login"
}
</script>

<template>
  <main>
    <nav>
      <RouterLink to="/login-administration">Iniciar sesion como Adminitrador </RouterLink>
      <router-link to="/login-customer">Iniciar Sesion como Usuario</router-link>
    </nav>

  </main>
</template>

<style scoped>
nav{
  display : flex;
  gap : 30px
}
main{
  display : flex;
  flex-direction: column;
  gap:50px;

}
</style>