import Repository, { baseUrl, serializeQuery } from './Repository';

export default class CategoryRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async GetCategories(){
        const response = await Repository.get(
            `${baseUrl}/categories/?populate=*`
        )
        return response.data;
        
    }

}

// export default new ProductRepository();
