import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});

export class AccountApiService {
    async getAll() {
        return await http.get('account');
    }

    async getById(id) {
        return await http.get('account/' + id);
    }

    async create(body) {
        return await http.post('account', body);
    }

    async update(body, id) {
        return await http.put('account/' + id, body);
    }

    async delete(id) {
        return await http.delete('account/' + id);
    }
}