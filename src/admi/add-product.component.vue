<template>
  <toolbar-admin></toolbar-admin>
  <div class="add-product">
    <h2>Lista de Productos</h2>
    <div v-if="products.length === 0">
      <p>No hay productos disponibles.</p>
    </div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="product-card">
        <!--
        <img :src="product.imagen" alt="Imagen del producto">
        -->
        <p>{{ product.name }}</p>
        <p>S/. {{ product.price }}</p>
        <!--
        <p>{{ product.url }}</p>  -->
      </div>
    </div>
    <div class="add-product-form">
      <h2>Agregar Nuevo Producto</h2>
      <div class="card">
        <div class="form-group">
          <label for="productName">Nombre del Producto:</label>
          <input type="text" id="productName" v-model="newProduct.name">
        </div>
        <div class="form-group">
          <label for="productPrice">Precio del Producto:</label>
          <input type="text" id="productPrice" v-model="newProduct.price">
        </div>
        <!--
        <div class="form-group">
          <label for="productImage">URL de la Imagen:</label>
          <input type="text" id="productImage" v-model="newProduct.imagen">
        </div>
        -->
        <button @click="addProduct">Agregar Producto</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from "../services/product.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";

export default {
  name: "add-product",
  components: { ToolbarAdmin },
  data() {
    return {
      products: [],
      newProduct: {
        admin:{
          id: parseInt(sessionStorage.getItem('adminId'),10),
        },
        name: "",
        //imagen: "",
        price: 0,
        
      }
    };
  },
  async created() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const userId = sessionStorage.getItem("adminId");
      try {
        
        const productService = new ProductService();
        const response = await productService.GetProductByAdmin(userId);
        this.products = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
      }
    },
    async addProduct() {
      try {
        const productService = new ProductService();
        const response = await productService.create(this.newProduct);
        if (response.status === 201) {
          this.products.push(response.data);
          this.resetForm();
        } else {
          console.error("Error al agregar el producto:", response.data);
        }
      } catch (error) {
        console.error("Error al agregar el producto:", error);
      }
    },
    resetForm() {
      this.newProduct = {
        nombre: "",
        imagen: "",
        precio: "",
        admin: 1
      };
    }
  }
};
</script>

<style scoped>
.add-product {
  padding: 20px;
  background-color: #dff8f9;
}

.product-card {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
}

.product-card img {
  max-width: 100px;
  max-height: 100px;
}

.product-card p {
  margin-top: 5px;
}

.add-product-form {
  margin-top: 20px;
}

.add-product-form .card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
}

button:hover {
  background-color: #0056b3;
}
</style>
