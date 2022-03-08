import Repository, { baseUrl, serializeQuery } from './Repository';

export default class ProductRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async GetProducts(){
        const response = await Repository.get(
            `${baseUrl}/products`
        )
        return response.data;
    }

    async GetProductsByCategory(category){
        const response = await Repository.get(
            `${baseUrl}/productos?category.id=${category}`
        )
        return response.data
    }

    async GetProductById(id){
        const response = await Repository.get(
            `${baseUrl}/productos?_where[id]=${id}`
        )
        return response.data[0]

    }

}

// export default new ProductRepository();
