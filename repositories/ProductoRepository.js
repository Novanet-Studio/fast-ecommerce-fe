import Repository, { baseUrl, serializeQuery } from './Repository';

export default class ProductRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async GetProducts(){
        const response = await Repository.get(
            `${baseUrl}/products?populate=*`
        )
        return response.data.data;
    }

    async GetProductsByCategory(category){
        const response = await Repository.get(
            `${baseUrl}/products?populate=*&filters[category][id]=${category}`
        )
        return response.data
    }

    async GetProductById(id){
        const response = await Repository.get(
            `${baseUrl}/products?populate=*&filters[id]=${id}`
        )
        return response.data.data[0];
        return response.data[0]

    }

}

// export default new ProductRepository();
