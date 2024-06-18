<template>
  <div>
    <toolbar-admin></toolbar-admin>
    <div class="sales-credit">
      <div class="header">
        <div class="user-info">
          <p><strong>{{ customer ? cuenta.customer.user.firstName + ' SU SALDO ES DE S/ ' + cuenta.currentCredit : '' }}</strong></p>
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
                <p>{{ product.name }}</p>
                <p>S/ {{ product.price }}</p>
                <div class="quantity-control">
                  <button @click="decreaseQuantity(product)">-</button>
                  <span>{{ product.quantity }}</span>
                  <button @click="increaseQuantity(product)">+</button>
                  <span>Total: S/ {{ product.precioTotal }}</span>
                </div>
              </div>
            </div>
            <div class="total">
              <!--<p>Precio Total de Productos: S/ {{ precioTotal }}</p> -->  
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
              <p><strong>{{ cuenta.customer.user.firstName }} {{cuenta.customer.user.lastName }}</strong></p>
              <p>DNI: {{ cuenta.customer.user.dni }}</p>
              <p>Celular: {{ cuenta.customer.user.phone }}</p>
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
            <p>{{ cuenta.creditRate }}%</p>
          </div>
          <div class="info-group">
            <label>Tipo de Tasa:</label>
            <p>{{ cuenta.creditTypeOfRate }}</p>
          </div>
          <div class="info-group">
            <label>Tu Fecha de Factura:</label>
            <p>{{ cuenta.billingDay }}</p>
          </div>
          <div class="info-group">
            <label>Tu Fecha de Pago:</label>
            <p>{{ cuenta.billingDay }}</p>
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
import { AccountApiService } from "../services/account-api.service.js";
import ToolbarAdmin from "./toolbar-admin.component.vue";
import { ProductService } from "../services/product.service.js";
import { CustomerApiService } from "../services/customer-api.service.js"; // Asegurarse de tener este servicio
import { PurchaseApiService } from "../services/purchase-api.service.js";
export default {
  name: "sales-credit",
  components: { ToolbarAdmin },
  data() {
    return {
      products: [],
      cuenta: [],
      precioTotal: 0,
      searchDNI: "",
      customer: null,
      productService: new ProductService(),
      customerService: new CustomerApiService(),
      options: [1, 2, 3],
      selectedOption: 1,
      accountApiService: new AccountApiService(),
      purchaseApiService: new PurchaseApiService(),
      fecha: new Date(),
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
      product.precioTotal = product.quantity * product.price;
    },
    calculateTotalProducts() {
      this.precioTotal = this.products.reduce((total, product) => total + product.precioTotal, 0);
    },
    async searchCustomer() {
      try {
        const response = await this.accountApiService.getByDNI(this.searchDNI);
        if (response.status === 200) {
          this.customer = response.data.customer.user;
          this.cuenta = response.data;
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
        console.log("Productos a comprar:", productsToPurchase);

        //calculando datos
        //se valida si tiene credito la cuenta
        if( this.cuenta.currentCredit - this.precioTotal >= 0){
            this.cuenta.currentCredit -= this.precioTotal;
            console.log(this.cuenta.currentCredit);
        //si el tipo de tasa es nominal se cambia a efectiva
            if(this.cuenta.creditTypeOfRate=="TNM"){
              this.cuenta.creditRate = (1 + (this.cuenta.creditRate/100)/30)**30 -1;
              console.log(this.cuenta.creditRate);
            }
        /* //calculamos fecha de pago si la cuota = 1
            if(this.selectedOption == 1){
              const fechaHoy = new Date();
              this.cuenta.billingDay=fechaHoy.getDay();
              console.log(this.cuenta.billingDay);
            }else{
              //falta para las demas opciones
            } */

        //hallando la anualidad o monto de las cuotas a pagar
            const anualidad = (this.precioTotal*this.cuenta.creditRate/100)/(1-(1+this.cuenta.creditRate/100)**(-this.selectedOption));
            console.log(anualidad);
        
        //asignamos la anualidad a cada cuota
            if(this.selectedOption == 1){

            }else{
              //falta para las demas opciones
            }

            console.log(this.cuenta.id);
          
        //mandamos datos a purchase
            const purchase = {
              creditaccount:{
                id:this.cuenta.id,
              },
              initialCost: this.precioTotal,
              time: this.fecha,
              installmentNumber: this.selectedOption,
              creditRateType: this.cuenta.creditTypeOfRate,
              creditRate: this.cuenta.creditRate,
              creditCompouding: this.cuenta.creditCompounding,
              penaltyRateType: this.cuenta.installmentPenaltyRateType,
              penaltyRate: this.cuenta.installmentPenaltyRate,
              penaltyCompouding: this.cuenta.installmentPenaltyCompouding,
              compensatoryRateType: this.cuenta.installmentCompensatoryRateType,
              compensatoryRate: this.cuenta.installmentCompensatoryRate,
              compensatoryCompouding: this.cuenta.installmentCompensatoryCompouding,
            }
            console.log(this.cuenta);
            console.log(purchase);
            //try {
              const example = await this.purchaseApiService.createPurchase(purchase);
              console.log(example);
             // alert("Compra registrada con éxito");
              //router.push('/sales-credit');
            //} catch (error) {
            //  alert("Hubo un error al registrar la compra: " + error.message);
            //  }
            

          //  if(example.response.status==201){
          //}
            
        }


       
        // Reset purchase data
        this.products.forEach(product => {
          product.quantity = 0;
          product.precioTotal = 0;
        });
        this.precioTotal = 0;
        this.customer = null;
        this.searchDNI = "";

        // Store products in sessionStorage
        sessionStorage.setItem('Productos', JSON.stringify(productsToPurchase));
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
      console.log("Navigating to help page...");
    },
    goBack() {
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
