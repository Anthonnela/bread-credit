<template>
  <div>
    <toolbar-admin></toolbar-admin>

    <div class="sales-credit">
      <h2> SISTEMA DE VENTAS </h2>
      <div class="header">
        <div class="user-info">

          <p><strong>{{ customer ? 'SALDO DEL CLIENTE ' + cuenta.customer.user.firstName + '  ES DE S/ ' + cuenta.currentCredit : '' }}</strong></p>
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
              <div class="payment-options">
                <button @click="selectPaymentOption('single')">Pago Único</button>
                <button @click="selectPaymentOption('installments')">Pago Cuotas</button>
              </div>
              <div v-if="paymentOption === 'installments'">
                <select v-model="selectedOption">
                  <option v-for="option in options" :key="option" :value="option">
                    {{ option }} cuotas
                  </option>
                </select>
                <p>Opción seleccionada: {{ selectedOption }}</p>
                <button @click="requestGracePeriod(true)">Solicitar periodo de gracia</button>
              </div>
              <div v-if="solicitar === true">
                <button @click="selectGracePeriodOption('parcial')">Parcial</button>
                <button @click="selectGracePeriodOption('total')">Total</button> 
                <br>
                <label>Días de Periodo de Gracia:</label>
                <input type="number" id="dias" v-model="dias" min="1" max="30">      
              </div>
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
          <div v-if="paymentOption === 'installments'">
            <div class="info-group">
              <label>Fecha de Factura:</label>
              <p>{{ cuenta.billingDay }}</p>
            </div>
            <div class="info-group">
              <label>Fecha de Pago:</label>
              <p>{{ cuenta.billingDay }}</p>
            </div>
          </div>
          <div class="info-group">
            <label>Total:</label>
            <p>S/ {{ totalAmount }}</p>
          </div>
        </div>
      </div>
      <div class="actions" v-if="paymentOption !== null">
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
import {InstallmentApiService} from "../services/installment-api.service.js";

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
      paymentOption: null, // to track selected payment option
      totalAmount: 0,
      accountApiService: new AccountApiService(),
      purchaseApiService: new PurchaseApiService(),
      installmentApiService: new InstallmentApiService(),
      fechaHoy: new Date(),
      dias: 0, //dias si pide periodo de gracias
      solicitar: false,
      pg: null,
    };
  },
  async created() {
    await this.loadProducts();
  },
  methods: {
    requestGracePeriod(a){
      this.solicitar=a;
    },
    selectGracePeriodOption(b){
      this.pg=b;
    },
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
      this.updateTotalAmount();
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
    selectPaymentOption(option) {
      this.paymentOption = option;
      this.updateTotalAmount();
      
    },
    updateTotalAmount() {
      if (this.paymentOption === 'single') {
        this.totalAmount = this.precioTotal;
      } else if (this.paymentOption === 'installments') {
        if(this.cuenta.creditTypeOfRate=="TNM"){
            this.cuenta.creditRate = (1 + (this.cuenta.creditRate/100)/30)**30 -1;
          }

        this.totalAmount = this.precioTotal * (1 + this.cuenta.creditRate / 100)**this.selectedOption; // Simple interest calculation for example
      }
    },
    async confirmPurchase() {
      try {
        const productsToPurchase = this.products.filter(product => product.quantity > 0);
        console.log("Productos a comprar:", productsToPurchase);

        //calculando datos
        //se valida si tiene credito la cuenta
        if( this.cuenta.currentCredit - this.precioTotal >= 0 && this.cuenta.active ==true){
          this.cuenta.currentCredit -= this.precioTotal; //actualizar al servicio
          console.log(this.cuenta.currentCredit);
          //se actualiza la cuenta
          const account = {
            customer: {
              id: this.cuenta.customer.id,
            },
            admin:{
              id: this.cuenta.admin.id,
            },
            active: this.cuenta.active,
            maxCredit: this.cuenta.maxCredit,
            currentCredit: this.cuenta.currentCredit,
            billingDay: this.cuenta.billingDay,
            creditTypeOfRate: this.cuenta.creditTypeOfRate,
            creditRate: this.cuenta.creditRate,
            creditCompounding: this.cuenta.creditCompounding,
            invoicePenaltyRateType: this.cuenta.invoicePenaltyRateType,
            invoicePenaltyRate: this.cuenta.invoicePenaltyRate,
            invoicePenaltyCompouding: this.cuenta.invoicePenaltyCompouding,
            installmentPenaltyRateType: this.cuenta.installmentPenaltyRateType,
            installmentPenaltyRate: this.cuenta.installmentPenaltyRate,
            installmentPenaltyCompouding: this.cuenta.installmentPenaltyCompouding,
            invoiceCompensatoryRateType: this.cuenta.invoiceCompensatoryRateType,
            invoiceCompensatoryRate: this.cuenta.invoiceCompensatoryRate,
            invoiceCompensatoryCompouding:this.cuenta.invoiceCompensatoryCompouding,
            installmentCompensatoryRateType: this.cuenta.installmentCompensatoryRateType,
            installmentCompensatoryRate: this.cuenta.installmentCompensatoryRate,
            installmentCompensatoryCompouding: this.cuenta.installmentCompensatoryCompouding,
          };
          const example3 = await this.accountApiService.update(account,this.cuenta.id);

          //si el tipo de tasa es nominal se cambia a efectiva
          if(this.cuenta.creditTypeOfRate=="TNM"){
            this.cuenta.creditRate = (1 + (this.cuenta.creditRate/100)/30)**30 -1;
            console.log("SALDO ACTUAL", this.cuenta.creditRate);
          }

          if(this.paymentOption=="installments"){

            //si elige periodo de gracia
            if(this.pg == "total"){
              this.precioTotal = this.precioTotal*(1+ this.cuenta.creditRate)**this.dias;
            }

            if(this.pg == "parcial"){
              const montoNuevo = this.precioTotal*(1+ this.cuenta.creditRate)**this.dias;
              var Intereses = montoNuevo - this.precioTotal;
            }

            //hallando la anualidad o monto de las cuotas a pagar
            const anualidad = (this.precioTotal*this.cuenta.creditRate/100)/(1-(1+this.cuenta.creditRate/100)**(-this.selectedOption));
            console.log("ANUALIDAD", anualidad);

            //mandamos datos a purchase
            const purchase = {
              creditaccount:{
                id:this.cuenta.id,
              },
              initialCost: this.precioTotal,
              time: this.fechaHoy,
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
            console.log("COMPRA" ,purchase);
            console.log("fecha hoy", this.fechaHoy);
            const example = await this.purchaseApiService.createPurchase(purchase);
            console.log("purchase:",example);
            alert("Compra registrada con éxito");

            //creamos installments segun las cuotas elegidas
            if(example.status===201){
              let fecha =new Date();
              if(this.pg=="total"){
                fecha.setDate(fecha.getDate()+ this.dias);
              }
              if(this.pg=="parcial"){
                fecha.setDate(fecha.getDate()+ this.dias);  
                const diaPago = fecha;
                console.log("fecha:" ,diaPago);

                const installment={
                  purchase:{
                    id: example.data.id,
                  },
                  installmentNumber: 0,
                  dueDate: diaPago,
                  amount: Intereses,
                }
                const example2 = await this.installmentApiService.create(installment);
              }

              //
              this.pg = null;

              for(let i=0; i<this.selectedOption; i++){

                fecha.setDate(fecha.getDate()+30);
                const diaPago = fecha;
                console.log("fecha:" ,diaPago);

                const installment={
                  purchase:{
                    id: example.data.id,
                  },
                  installmentNumber: (i+1),
                  dueDate: diaPago,
                  amount: anualidad,
                }
                const example2 = await this.installmentApiService.create(installment);
                this.dias=0;
              }
            }
          }else{//si el tipo de pago es unico
            const purchase = {
                      creditaccount:{
                        id:this.cuenta.id,
                      },
                      initialCost: this.precioTotal,
                      time: this.fechaHoy,
                      installmentNumber: 0,
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
                    console.log("COMPRA" ,purchase);
                    
                    const example = await this.purchaseApiService.createPurchase(purchase);
                    console.log("purchase:",example);
                    alert("Compra registrada con éxito");
                    console.log("Compra confirmada con éxito.");
          }  
        }else{
          alert("No cuenta con saldo de crédito");
        }

        // Reset purchase data
        this.products.forEach(product => {
          product.quantity = 0;
          product.precioTotal = 0;
        });
        this.precioTotal = 0;
        this.customer = null;
        this.searchDNI = "";
        
        this.solicitar = false;
        // Store products in sessionStorage
        sessionStorage.setItem('Productos', JSON.stringify(productsToPurchase));
        
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
      this.paymentOption = null;
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

quantity-control button:hover {
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

.payment-options {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
}

.payment-options button {
  margin-right: 10px;
  flex-grow: 1;
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



.cancel-button {
  background-color: #dc3545;
}


</style>
