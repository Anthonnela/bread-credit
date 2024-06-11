<template>
  <div>
    <toolbar-admin></toolbar-admin>
    <div class="sales-credit">
      <div class="header">
        <div class="user-info">
          <p><strong>{{ customer ? customer.nombre + ' SU SALDO ES DE S/ ' + customer.cuenta.saldoDeCredito : '' }}</strong></p>
        </div>
        <div class="nav-links">
          <button @click="goToHelp">AYUDA</button>
          <button @click="goBack">VOLVER</button>
        </div>
      </div>
      <div class="content">
        <div class="product-list">
          <h2>Productos a la Venta</h2>
          <div v-if="products.length === 0">
            <p>No hay productos disponibles.</p>
          </div>
          <div v-else>
            <div v-for="product in products" :key="product.id" class="product-item">
              <img :src="product.image" alt="Producto" class="product-image" />
              <div class="product-details">
                <p>{{ product.nombre }}</p>
                <p>S/ {{ product.precio }}</p>
                <div class="quantity-control">
                  <button @click="decreaseQuantity(product)">-</button>
                  <span>{{ product.quantity }}</span>
                  <button @click="increaseQuantity(product)">+</button>
                  <span>Total: S/ {{ product.precioTotal }}</span>
                </div>
              </div>
            </div>
            <div class="total">
              <p>Precio Total de Productos: S/ {{ precioTotal }}</p>
            </div>
          </div>
        </div>
        <div class="customer-search">
          <h2>Buscar Cliente por DNI</h2>
          <div class="form-group">
            <label for="dni">DNI del Cliente:</label>
            <input type="text" id="dni" v-model="searchDNI">
            <button @click="searchCustomer">Buscar</button>
          </div>
          <div v-if="customer">
            <div class="customer-card">
              <p><strong>{{ customer.nombre }} {{ customer.apellido }}</strong></p>
              <p>DNI: {{ customer.dni }}</p>
              <p>Celular: {{ customer.celular }}</p>
              <p>Saldo: S/ {{ customer.cuenta.saldoDeCredito }}</p>
              <button @click="confirmPurchase">Pago Único</button>
              <button @click="confirmPurchaseDues">Pago Cuotas</button>
              <select v-model="selectedOption">
                <option v-for="option in options" :key="option" :value="option">
                  {{ option }} cuotas
                </option>
              </select>
              <p>Opción seleccionada: {{ selectedOption }}</p>
            </div>
          </div>
        </div>
        <div v-if="customer" class="financial-info">
          <h2>Datos Financieros</h2>
          <div class="info-group">
            <label>Monto Solicitado:</label>
            <p>S/ {{ precioTotal }}</p>
          </div>
          <div class="info-group">
            <label>Tasa de Intereses:</label>
            <p>{{ customer.cuenta.tasaInteres }}</p>
          </div>
          <div class="info-group">
            <label>Tipo de Tasa:</label>
            <p>{{ customer.cuenta.tipoPasa }}</p>
          </div>
          <div class="info-group">
            <label>Tu Fecha de Factura:</label>
            <p>{{ customer.cuenta.diaFactura }}</p>
          </div>
          <div class="info-group">
            <label>Tu Fecha de Pago:</label>
            <p>{{ customer.cuenta.diaPago }}</p>
          </div>
          <div class="info-group">
            <label>Total:</label>
            <p>S/ {{ precioTotal }}</p>
          </div>
        </div>
      </div>
      <div class="actions">
        <button @click="confirmPurchase" class="confirm-button">Confirmar</button>
        <button @click="cancelPurchase" class="cancel-button">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CustomerApiService } from "../services/customer-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";
import { ProductService } from "../services/product.service.js";

export default {
  name: "sales-credit",
  components: { ToolbarAdmin },
  data() {
    return {
      products: [],
      precioTotal: 0,
      searchDNI: "",
      customer: null,
      productService: new ProductService(),
      customerService: new CustomerApiService(),
      compras: [],
      options: [1, 2, 3],  // Lista de opciones numéricas
      selectedOption: 1,   // Valor inicial seleccionado
    };
  },
  async created() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const userId = sessionStorage.getItem('adminId');
        const response = await this.productService.GetProductByAdmin(userId);
        console.log(response);
        this.products = response.data.map(product => ({
          ...product,
          quantity: 0,
          precioTotal: 0
        }));
        this.calculateTotalProducts();
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
      }
    },
    increaseQuantity(product) {
      product.quantity++;
      this.updatePrecioTotal(product);
      this.calculateTotalProducts();
    },
    decreaseQuantity(product) {
      if (product.quantity > 0) {
        product.quantity--;
        this.updatePrecioTotal(product);
        this.calculateTotalProducts();
      }
    },
    updatePrecioTotal(product) {
      product.precioTotal = product.quantity * product.precio;
    },
    calculateTotalProducts() {
      this.precioTotal = this.products.reduce((total, product) => {
        return total + product.precioTotal;
      }, 0);
    },
    async searchCustomer() {
      try {
        console.log(this.searchDNI);
        const response = await this.customerService.getByDNI(this.searchDNI);
        if(response.status === 200){
          this.customer = response.data;
        }else {
          this.customer = null;
          console.log("No se encontró ningún cliente con el DNI proporcionado.");
        }

        /* if (response.data.length > 0) {
          this.customer = response.data[0];
        } else {
          this.customer = null;
          console.log("No se encontró ningún cliente con el DNI proporcionado.");
        } */
      } catch (error) {
        console.error("Error al buscar el cliente:", error);
      }
    },
    async confirmPurchase() {
      try {
        const productsToPurchase = this.products.filter(product => product.quantity > 0);
        console.log("Productos a comprar:", productsToPurchase);
        this.products.forEach(product => {
          product.quantity = 0;
          product.precioTotal = 0;
        });
        this.precioTotal = 0;

        this.customer = null;
        this.searchDNI = "";
        sessionStorage.setItem('Productos', JSON.stringify(productsToPurchase))
        console.log("Compra confirmada con éxito.");
      } catch (error) {
        console.error("Error al confirmar la compra:", error);
      }
    },
    cancelPurchase() {
      this.products.forEach(product => {
        product.quantity = 0;
        product.precioTotal = 0;
      });
      this.precioTotal = 0;
      this.customer = null;
      this.searchDNI = "";
    },
    goToHelp() {
      // Implement help page navigation
      console.log("Navigating to help page...");
    },
    goBack() {
      // Implement back navigation
      console.log("Going back...");
    }
  }
};
</script>

<style scoped>
.sales-credit {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-info p {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.nav-links button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav-links button:hover {
  background-color: #0056b3;
}

.content {
  display: flex;
  justify-content: space-between;
}

.product-list,
.customer-search,
.financial-info {
  width: 32%;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.product-details {
  flex-grow: 1;
}

.quantity-control button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.quantity-control button:hover {
  background-color: #0056b3;
}

.quantity-control span {
  margin: 0 10px;
  font-weight: bold;
}

.total {
  margin-top: 20px;
  font-weight: bold;
}

.customer-card,
.info-group {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button {
  background-color: #28a745;
}

.confirm-button:hover {
  background-color: #218838;
}

.cancel-button {
  background-color: #dc3545;
}

.cancel-button:hover {
  background-color: #c82333;
}
</style>
