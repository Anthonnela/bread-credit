<template>
  <div class="background-container">
    <div class="container">
      <!-- Inicio de Sesión -->
      <div v-if="!registro" class="form-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="iniciarSesion">
          <div>
            <label for="dni">DNI:</label>
            <input type="text" id="dni" v-model="dni" required>
          </div>
          <div>
            <label for="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" v-model="contrasena" required>
          </div>
          <div>
            <button type="submit">Iniciar Sesión</button>
          </div>
        </form>
        <p>¿No tienes una cuenta? <a href="#" @click="toggleRegistro">Registrarse</a></p>
      </div>

      <!-- Registro -->
      <div v-if="registro" class="form-container">
        <h2>Registro</h2>
        <form @submit.prevent="registrar">
          <div class="registro-container">
            <div>
              <h3>Información Personal:</h3>
              <label for="nombre">Nombre Completo:</label>
              <input type="text" id="nombre" v-model="nombre" required>
              <label for="direccion">Dirección:</label>
              <input type="text" id="direccion" v-model="direccion" required>
              <label for="telefono">Número de Teléfono:</label>
              <input type="text" id="telefono" v-model="telefono" required>
              <label for="correo">Correo:</label>
              <input type="email" id="correo" v-model="correo" required>
              <label for="dni_registro">DNI:</label>
              <input type="text" id="dni_registro" v-model="dni_registro" required>
              <label for="contrasena_registro">Contraseña:</label>
              <input type="password" id="contrasena_registro" v-model="contrasena_registro" required>
            </div>
            <div>
              <h3>Configuración de la Cuenta:</h3>
              <label for="limite_credito">Límite de Crédito:</label>
              <input type="number" id="limite_credito" v-model="limite_credito" required disabled>
              <label for="fecha_pago">Fecha de Pago Mensual:</label>
              <input type="date" id="fecha_pago" v-model="fecha_pago" required>
              <label for="tasa_interes">Tasa de Interés:</label>
              <select id="tasa_interes" v-model="tasa_interes" required>
                <option value="nominal">Tasa Nominal(5%)</option>
                <option value="efectiva">Tasa Efectiva</option>
              </select>

              <div>
                <input type="checkbox" id="aceptar_terminos" v-model="aceptar_terminos" required>
                <label for="aceptar_terminos">Acepto los <a href="#" @click="mostrarTerminosCondiciones">términos y condiciones</a></label>
              </div>
            </div>

          </div>
          <div>
            <button type="submit" :disabled="!aceptar_terminos">Registrarse</button>
          </div>
        </form>
        <p>¿Ya tienes una cuenta? <a href="#" @click="toggleRegistro">Iniciar Sesión</a></p>
      </div>
    </div>
  </div>

  <!-- Ventana emergente de términos y condiciones -->
  <div class="modal" v-if="mostrar_modal">
    <div class="modal-content">
      <span class="close" @click="cerrarModal">&times;</span>
      <h2>Términos y Condiciones</h2>
      <h1> acepta todos las condiciones al multa por no pagar se le embarcara su casa</h1>


    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      registro: false,
      aceptar_terminos: false,
      mostrar_modal: false,
      // Datos de inicio de sesión
      dni: "",
      contrasena: "",
      // Datos de registro
      nombre: "",
      direccion: "",
      telefono: "",
      correo: "",
      dni_registro: "",
      contrasena_registro: "",
      limite_credito: 200,
      fecha_pago: "",
      tasa_interes: "nominal"
    };
  },
  methods: {
    iniciarSesion() {

    },
    registrar() {

    },
    toggleRegistro() {
      this.registro = !this.registro;
    },
    mostrarTerminosCondiciones() {
      this.mostrar_modal = true;
    },
    cerrarModal() {
      this.mostrar_modal = false;
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para esta página */
.background-container {
  background-image: url("src/assets/fondo.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 800px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

form > div {
  margin-bottom: 15px;
}

.registro-container {
  display: flex;
}

.registro-container > div {
  flex: 1;
  margin-right: 20px;
}

label {
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  color: #007bff;
  text-decoration: none;
}

/* Estilos para la ventana emergente */
/* .modal {
  display: none; /* Ocultar la ventana emergente por defecto */
/*  position: fixed; /* Posición fija para superponerse al contenido */
/*  z-index: 1; /* Establecer la ventana emergente en la parte superior */
/* left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto; /* Permitir desplazamiento si el contenido es más largo que la ventana emergente */
/* background-color: rgb(0, 0, 0); /* Fondo negro semitransparente */
/*  background-color: rgba(0, 0, 0, 0.4); /* Fondo negro semitransparente */
/* } */

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
