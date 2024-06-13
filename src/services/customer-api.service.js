import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080',
});

export class CustomerApiService {
    async getAll() {
        return await http.get('customer');
    }

    async getById(id) {
        return await http.get('/customer/' + id);
    }
//modificado
    async create(body) {
        return await http.post('customer', body);
    }

    async update(body, id) {
        return await http.put('/customer/' + id, body);
    }

    async delete(id) {
        return await http.delete('customer/' + id);
    }

    async getByDNI(dni) {
        return await http.get(`/customer/dni/` + dni);
    }

    async Logincustomer (body){
        return await http.post(`customer/login`, body);
    }
}
