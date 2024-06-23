import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080',
});

export class PurchaseApiService {
    async getAll() {
        return await http.get('purchase');
    }

    async getById(id) {
        return await http.get('/purchase/' + id);
    }

    async createPurchase(body) {
        return await http.post('purchase', body);
    }

    async updatePurchase(body, id) {
        return await http.put('/purchase/' + id, body);
    }

    async deletePurchase(id) {
        return await http.delete('/purchase/' + id);
    }

    async getPurchasesByCustomerId(customerId) {
        return await http.get(`/purchase/topay/customer/` + customerId);
    }

    async getPurchasesByAdmin(adminId) {
        return await http.get(`/purchase?adminId=${adminId}`);
    }
}
