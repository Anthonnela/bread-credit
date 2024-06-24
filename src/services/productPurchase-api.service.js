import axios from "axios";

const http = axios.create({
    baseURL: 'http://20.150.213.225:8080',
});

export class ProductPurchaseApiService {


    async create(body) {
        return await http.post('product-purchase', body);
    }

    
}
