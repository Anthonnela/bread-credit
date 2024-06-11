import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080',
});

export class InvoiceApiService {


    async getAll() {
        return await http.get('invoice');
    }

    async getById(id) {
        return await http.get(`/invoice/${id}`);
    }

    async create(body) {
        return await http.post('invoice', body);
    }

    async update(body, id) {
        return await http.put(`/invoice/${id}`, body);
    }

    async delete(id) {
        return await http.delete(`invoice/${id}`);
    }

}
