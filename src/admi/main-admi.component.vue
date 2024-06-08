<template>
  <toolbar-admin></toolbar-admin>
  <div class="main-container">
    <div class="content">
      <div class="sidebar">
        <div class="profile">
          <div class="profile-icon">&#128100;</div>
          <div class="profile-info">
            <p><strong>{{ nombreadmin }} {{ apellido }}</strong></p>
            <p>DNI: {{ dni }}</p>
            <p>Celular: {{ celular }}</p>
            <p>Correo: {{ correo }}</p>
            <p>Negocio: {{ negocio }}</p>
            <p>Nombre del negocio <strong>{{ nombrenegocio }}</strong></p>
          </div>
        </div>
        <button class="edit-button">Editar mis datos</button>
      </div>
      <div class="main-menu">
        <button @click="navigateTo('/add-product')">agregar mis productos</button>
        <button @click="navigateTo('/add-customer')">Agregar Cliente</button>
        <button @click="navigateTo('/list-customer')">Lista De Clientes</button>
        <button @click="navigateTo('/sales-credit')">Ventas de crédito al cliente</button>
        <button @click="navigateTo('/pay-credit')">Pagar Cuenta De Crédito</button>
        <button @click="navigateTo('/history-credit')">Ver Historial Crediticio</button>
      </div>
    </div>
  </div>

</template>

<script>

import { AdministrationApiService } from "../services/administration-api.service.js";
import ToolbarAdmin from "../admi/toolbar-admin.component.vue";

export default {
  name: "main-admi",
  components: {ToolbarAdmin},
  data() {
    return {
      nombreadmin: "",
      apellido: "",
      dni: "",
      celular: "",
      correo: "",
      negocio: "",
      nombrenegocio: ""
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  async created() {
    try {
      // Recupera los datos del administrador desde el servidor utilizando el API Service
      const administrationService = new AdministrationApiService();
      const userId = sessionStorage.getItem("adminId");
      const response = await administrationService.getById(userId);

      // Asigna los datos del administrador a las propiedades de datos
      this.nombreadmin = response.data.user.firstName;
      this.apellido = response.data.user.lastName;
      this.dni = response.data.user.dni;
      this.celular = response.data.user.phone;
      this.correo = response.data.user.email;
      this.negocio = response.data.businessType;
      this.nombrenegocio = response.data.businessName;
    } catch (error) {
      console.error("Error al recuperar los datos del administrador:", error);
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  background-color: rgba(43, 220, 226, 0.14);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.content {
  display: flex;
  flex: 1;
  padding: 20px;
}

.sidebar {
  width: 30vw;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;


}

.sidebar .profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;


}

.sidebar .profile-icon {
  font-size: 50px;
  margin-bottom: 15px;
}

.sidebar .profile-info p {
  margin: 5px 0;
}

.edit-button {
  width: 100%;
  padding: 15px;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.main-menu {
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-menu button {
  padding: 20px;
  margin-bottom: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
  box-sizing: border-box;
}

p{
  color: black ;
}

</style>