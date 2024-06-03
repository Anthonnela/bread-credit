<template>
  <div>
    <toolbar-admin></toolbar-admin>
    <div class="sales-credit">
      <div class="product-list">
        <h2>Productos a la Venta</h2>
        <div v-if="products.length === 0">
          <p>No hay productos disponibles.</p>
        </div>
        <div v-else>
          <div v-for="product in products" :key="product.id" class="product-item">
            <p>{{ product.nombre }}</p>
            <p>{{ product.precio }}</p>
            <div class="quantity-control">
              <button @click="decreaseQuantity(product)">-</button>
              <span>{{ product.quantity }}</span>
              <button @click="increaseQuantity(product)">+</button>
              <span>{{ product.precioTotal }}</span>
            </div>
          </div>
          <div class="total">
            <p>Precio Total de Productos: {{ precioTotal }}</p>
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
            <p>Celular: {{ customer.phone }}</p>
            <p>Correo: {{ customer.email }}</p>
            <button @click="confirmPurchase">Pago único</button>
            <button @click="confirmPurchaseDues">Pago en cuotas</button>
            <select v-model="selectedOption">
              <option v-for="option in options" :key="option" :value="option">
                {{ option}}
              </option>
            </select>
            <p>Opción seleccionada: {{ selectedOption }}</p>
          </div>
        </div>
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
      options: [2, 3],  // Lista inicial de opciones numéricas
      selectedOption: 2,   // Valor inicial seleccionado
    };
  },
  async created() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const userId = sessionStorage.getItem("adminId");
        const response = await this.productService.GetProductByAdmin(userId);
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
        const response = await this.customerService.getByDNI(this.searchDNI);
        if (response.data.length > 0) {
          this.customer = response.data[0];
        } else {
          this.customer = null;
          console.log("No se encontró ningún cliente con el DNI proporcionado.");
        }
      } catch (error) {
        console.error("Error al buscar el cliente:", error);
      }
    },
    async confirmPurchase() {
      try {
        const productsToPurchase = this.products.filter(product => product.quantity > 0);
        // Enviar la lista de productos a la API del cliente para confirmar la compra
        // AUN NO ESTA IMPLEMETADO
        console.log("Productos a comprar:", productsToPurchase);
        // Reiniciar las cantidades de productos
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
  
  }
};
</script>




<style scoped>
.sales-credit {
  display: flex;
  justify-content: space-between;
  background-color: rgba(165, 170, 172, 0.32);
}

.product-list,
.customer-search {
  width: 48%;
}

.product-list {
  margin-right: 2%;
}

.customer-search {
  margin-left: 2%;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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
}

.total {
  margin-top: 20px;
}

.customer-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


button {
  padding: 20px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
