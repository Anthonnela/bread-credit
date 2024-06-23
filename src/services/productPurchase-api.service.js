import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080',
});

export class ProductPurchaseApiService {


    async create(body) {
        return await http.post('product-purchase', body);
    }

    
}
