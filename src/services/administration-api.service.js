// AdministrationApiService
import axios from "axios";

const http = axios.create({
    baseURL: 'https://20.150.213.225:8080',
});

export class AdministrationApiService {
    async getAll() {
        return await http.get('admin');
    }

    async getById(id) {
        return await http.get('admin/' + id);
    }

    async create(body) {
        return await http.post('admin', body);
    }

    async update(body, id) {
        return await http.put('admin/' + id, body);
    }

    async delete(id) {
        return await http.delete('admin/' + id);
    }

    async Loginadministration (body){
        return await http.post(`admin/login`, body);
    }

};
