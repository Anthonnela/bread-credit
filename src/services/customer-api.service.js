import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});

export class CustomerApiService {
    async getAll() {
        return await http.get('customer');
    }

    async getById(id) {
        return await http.get('/customer/' + id);
    }

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
        return await http.get(`/customer?dni=${dni}`);
    }

    async Logincustomer(correo, contraseña){
        return await http.get(`/customer?correo=${correo}&contraseña=${contraseña}`);
    }
}
