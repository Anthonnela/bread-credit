<template>
  <div>
    <toolbar-admin></toolbar-admin>
    <div class="add-product">
      <h2>Lista de Productos</h2>
      <div v-if="products.length === 0">
        <p>No hay productos disponibles.</p>
      </div>
      <div v-else>
        <div v-for="product in products" :key="product.id" class="product-card">
          <p>{{ product.name }}</p>
          <p>S/. {{ product.price }}</p>
          <button @click="editProduct(product)">Editar</button>
          <button @click="deleteProduct(product.id)">Eliminar</button>
        </div>
      </div>
      <div v-if="editMode">
        <h2>Editar Producto</h2>
        <div class="card">
          <div class="form-group">
            <label for="editProductName">Nombre del Producto:</label>
            <input type="text" id="editProductName" v-model="editedProduct.name">
          </div>
          <div class="form-group">
            <label for="editProductPrice">Precio del Producto:</label>
            <input type="text" id="editProductPrice" v-model="editedProduct.price">
          </div>
          <button @click="updateProduct">Guardar Cambios</button>
          <button @click="cancelEdit">Cancelar</button>
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
          <button @click="addProduct">Agregar Producto</button>
        </div>
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
        admin: {
          id: parseInt(sessionStorage.getItem('adminId'), 10),
        },
        name: "",
        price: 0,
      },
      editMode: false,
      editedProduct: {
        id: null,
        name: "",
        price: 0,
      },
    };
  },
  async created() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const productService = new ProductService();
        const userId = sessionStorage.getItem("adminId");
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
    async editProduct(product) {
      this.editMode = true;
      this.editedProduct.id = product.id;
      this.editedProduct.name = product.name;
      this.editedProduct.price = product.price;
    },
    async updateProduct() {
      try {
        const productService = new ProductService();
        const response = await productService.update(this.editedProduct, this.editedProduct.id);
        if (response.status === 200) {
          const index = this.products.findIndex(product => product.id === this.editedProduct.id);
          if (index !== -1) {
            this.products[index] = response.data;
            this.cancelEdit();
          }
        } else {
          console.error("Error al actualizar el producto:", response.data);
        }
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    },
    cancelEdit() {
      this.editMode = false;
      this.editedProduct.id = null;
      this.editedProduct.name = "";
      this.editedProduct.price = 0;
    },
    async deleteProduct(productId) {
      try {
        const productService = new ProductService();
        const response = await productService.delete(productId);
        if (response.status === 204) {
          this.products = this.products.filter(product => product.id !== productId);
        } else {
          console.error("Error al eliminar el producto:", response.data);
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    },
    resetForm() {
      this.newProduct = {
        admin: {
          id: parseInt(sessionStorage.getItem('adminId'), 10),
        },
        name: "",
        price: 0,
      };
    },
  },
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
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
