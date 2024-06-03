import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});

export class PurchaseApiService {
    async getAll() {
        return await http.get('purchases');
    }

    async getById(id) {
        return await http.get('/purchases/' + id);
    }

    async createPurchase(body) {
        return await http.post('purchases', body);
    }

    async updatePurchase(body, id) {
        return await http.put('/purchases/' + id, body);
    }

    async deletePurchase(id) {
        return await http.delete('/purchases/' + id);
    }

    async getPurchasesByCustomerId(customerId) {
        return await http.get(`/purchases?customerId=${customerId}`);
    }

    async getPurchasesByAdmin(adminId) {
        return await http.get(`/purchases?adminId=${adminId}`);
    }
}
