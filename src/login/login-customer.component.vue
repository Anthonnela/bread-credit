<script>
export default {
  name: "login-customer"
}
</script>

<template>
  <div class="container">
    <div class="row">
      <label>email</label>
      <pv-input-text id="email" v-model="email"></pv-input-text>
    </div>
    <br />
    <div class="row">
      <label>password</label>
      <pv-input-text id="username" v-model="password"></pv-input-text>
    </div>
    <pv-button>login customer</pv-button>
  </div>

</template>

<style scoped>

</style>