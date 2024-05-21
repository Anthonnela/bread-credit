<script>
import ToolbarAdmin from "./toolbar-admin.component.vue";

export default {
  name: "main-admi",
  components: {ToolbarAdmin},
}
</script>


<template>
  <toolbar-admin></toolbar-admin>
  <div class="main-container">
    <div class="content">
      <div class="sidebar">
        <div class="profile">
          <div class="profile-icon">&#128100;</div>
          <div class="profile-info">
            <p><strong>Nombres</strong></p>
            <p>N° de Clientes</p>
            <p>Nombre del Negocio</p>
          </div>
        </div>
        <button class="edit-button">Editar mis datos</button>
      </div>
      <div class="main-menu">
        <button>Agregar Cliente</button>
        <button>Lista De Clientes</button>
        <button>Agregar Producto</button>
        <button>Pagar Cuenta De Credito</button>
        <button>Ver Historial Crediticio</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
}

.content {
  display: flex;
  flex: 1;
  padding: 20px;
}

.sidebar {
  width: 30%;
  background-color: #f9f9f9;
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
  padding: 10px;
  background-color: #add8e6;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.main-menu {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-menu button {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #add8e6;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  box-sizing: border-box;
}
</style>