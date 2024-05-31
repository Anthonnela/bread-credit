import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});

export class ProductService {


    async getAll() {
        return await http.get('productos');
    }

    async getById(id) {
        return await http.get(`/productos/${id}`);
    }

    async create(body) {
        return await http.post('productos', body);
    }

    async update(body, id) {
        return await http.put(`/productos/${id}`, body);
    }

    async delete(id) {
        return await http.delete(`productos/${id}`);
    }
    async GetProductByAdmin(adminId) {
        return await http.get(`/productos?admin=${adminId}`);
    }
}
