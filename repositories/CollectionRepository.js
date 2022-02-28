import Repository, { baseUrl, serializeQuery } from './Repository';

class CollectionRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getCollections(payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/collections?${query}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async SPGetProductByCollectionSlug(payload) {
        const endPoint = `collections?${serializeQuery(payload)}`;
        const reponse = await Repository.get(`${baseUrl}/${endPoint}`)
            .then(response => {
                if (response.data && response.data[0].products.length > 0) {
                    return response.data[0].products;
                } else {
                    return null;
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getCategoriesBySlug(payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?${query}`
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsBySlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/collections/slug?=${slug}`
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new CollectionRepository();
