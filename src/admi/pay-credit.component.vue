<script>
import ToolbarAdmin from "./toolbar-admin.component.vue";
export default {
  name: "pay-credit.component",
  components: { ToolbarAdmin },
}
</script>

<template>
  <toolbar-admin></toolbar-admin>
  <div class="container">
    <h3>Pagar lista de cuentas de credito</h3>
    <table class="customer-table">
      <thead>
      <tr>
        <th>DNI</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Cuota N°</th>
        <th>Costo Actual</th>
        <th>Fecha de vencimiento</th>
        <th>Fecha de compra</th>
        <th>Pagar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cuenta in cuentas" :key="cuenta.id">
        <td>{{ cuenta.customer.user.dni }}</td>
        <td>{{ cuenta.customer.user.firstName }}</td>
        <td>{{ cuenta.customer.user.lastName }}</td>
        <td>{{PAGAR }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f8f9fa;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.customer-table th,
.customer-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.customer-table th {
  background-color: #007bff;
  color: white;
}

.customer-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.customer-table tr:hover {
  background-color: #ddd;
}

td{
  color: black;
}
</style>