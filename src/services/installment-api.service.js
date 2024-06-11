import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080',
});

export class InstallmentApiService {


    async getAll() {
        return await http.get('installment');
    }

    async getById(id) {
        return await http.get(`/installment/${id}`);
    }

    async create(body) {
        return await http.post('installment', body);
    }

    async update(body, id) {
        return await http.put(`/installment/${id}`, body);
    }

    async delete(id) {
        return await http.delete(`installment/${id}`);
    }

}
