import axios from "axios";

const http = axios.create({
    baseURL: 'https://20.150.213.225:8080',
});

export class PaymentApiService {
    async getAll() {
        return await http.get('payment');
    }

    async getById(id) {
        return await http.get('/payment/' + id);
    }

    async create(body) {
        return await http.post('payment', body);
    }

    async update(body, id) {
        return await http.put('/payment/' + id, body);
    }

    async delete(id) {
        return await http.delete('payment/' + id);
    }
}
