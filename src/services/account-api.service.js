import axios from "axios";

const http = axios.create({
    baseURL: 'https://20.150.213.225:8080',
});

export class AccountApiService {
    async getAll() {
        return await http.get('creditaccount');
    }

    async getById(id) {
        return await http.get('creditaccount/' + id);
    }

    async create(body) {
        return await http.post('creditaccount', body);
    }

    async update(body, id) {
        return await http.put('creditaccount/' + id, body);
    }

    async delete(id) {
        return await http.delete('creditaccount/' + id);
    }

    async GetAccountByAdmin(id) {
        return await http.get(`/creditaccount/admin/` + id);
    }

    async GetAccountByAdminByCustomer(adminId,customerId) {
        return await http.get(`/creditaccount/admin/` + adminId + `/customer/` + customerId );
    }

    async GetAccountByCustomer(id) {
        return await http.get(`/creditaccount/customer/` + id);
    }
    async getByDNI(dni) {
        return await http.get(`/creditaccount/customer/dni/` + dni);
    }
}