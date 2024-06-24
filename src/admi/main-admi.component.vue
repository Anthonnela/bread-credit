<template>
  <toolbar-admin></toolbar-admin>
  <div class="main-container">
    <div class="content">
      <div class="sidebar" v-if="!editMode">
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
        <button class="edit-button" @click="toggleEditMode">Editar mis datos</button>
      </div>
      <div class="edit-section" v-if="editMode">
        <h2>Editar mis datos</h2>
        <form @submit.prevent="saveData">
          <label for="nombreadmin">Nombre:</label>
          <input type="text" v-model="nombreadmin" id="nombreadmin">
          
          <label for="apellido">Apellido:</label>
          <input type="text" v-model="apellido" id="apellido">
          
          <label for="dni">DNI:</label>
          <input type="text" v-model="dni" id="dni">
          
          <label for="celular">Celular:</label>
          <input type="text" v-model="celular" id="celular">
          
          <label for="correo">Correo:</label>
          <input type="text" v-model="correo" id="correo">
          
          <label for="negocio">Negocio:</label>
          <input type="text" v-model="negocio" id="negocio">
          
          <label for="nombrenegocio">Nombre del negocio:</label>
          <input type="text" v-model="nombrenegocio" id="nombrenegocio">
          
          <button type="submit" @click="saveData">Guardar</button>
          <button type="button" @click="toggleEditMode">Cancelar</button>
        </form>
      </div>
      <div class="main-menu" v-if="!editMode">
        <button @click="navigateTo('/add-product')">agregar mis productos</button>
        <button @click="navigateTo('/add-customer')">Agregar Cliente</button>
        <button @click="navigateTo('/list-customer')">Lista De Clientes</button>
        <button @click="navigateTo('/sales-credit')">Ventas de crédito al cliente</button>
        <button @click="navigateTo('/pay-credit')">Pagar Cuenta De Crédito</button>
      </div>
    </div>
  </div>

  <!-- Modal para el mensaje de confirmación -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <p>{{ confirmationMessage }}</p>
      <button @click="closeModal">Cerrar</button>
    </div>
  </div>
</template>


<script>
import { AdministrationApiService } from "../services/administration-api.service.js";
import ToolbarAdmin from "../admi/toolbar-admin.component.vue";

export default {
  name: "main-admi",
  components: { ToolbarAdmin },
  data() {
    return {
      nombreadmin: "",
      apellido: "",
      dni: "",
      celular: "",
      correo: "",
      negocio: "",
      nombrenegocio: "",
      editMode: false,
      confirmationMessage: "",
      showModal: false
    };
  },
  methods: {

    navigateTo(route) {
      this.$router.push(route);
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async saveData() {
      try {
        const administrationService = new AdministrationApiService();
        const userId = sessionStorage.getItem("adminId");
        const updatedData = {
          user: {
            firstName: this.nombreadmin,
            lastName: this.apellido,
            dni: this.dni,
            phone: this.celular,
            email: this.correo,
          },
          businessType: this.negocio,
          businessName: this.nombrenegocio,
        };
        await administrationService.update(updatedData, userId);
        this.toggleEditMode();
        this.confirmationMessage = "Los datos fueron actualizados correctamente";
        this.showModal = true;
      } catch (error) {
        console.error("Error al guardar los datos del administrador:", error);
        this.confirmationMessage = "Hubo un error al actualizar los datos";
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
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

.edit-section {
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
}

.edit-section h2 {
  margin-bottom: 20px;
}

.edit-section label {
  display: block;
  margin: 10px 0 5px;
}

.edit-section input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.edit-section button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
}

.edit-section button[type="button"] {
  background-color: #6c757d;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-content p {
  margin-bottom: 20px;
}

.modal-content button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
}
</style>

