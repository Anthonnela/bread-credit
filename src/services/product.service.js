import axios from "axios";

const http = axios.create({
    baseURL: 'http://20.150.213.225:8080',
});

export class ProductService {


    async getAll() {
        return await http.get('product');
    }

    async getById(id) {
        return await http.get(`/product/${id}`);
    }

    async create(body) {
        return await http.post('product', body);
    }

    async update(body, id) {
        return await http.put(`/product/${id}`, body);
    }

    async delete(id) {
        return await http.delete(`product/${id}`);
    }
    async GetProductByAdmin(id) {
        return await http.get(`/product/admin/` + id);
    }
}
