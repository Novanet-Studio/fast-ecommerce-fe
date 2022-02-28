import data from '~/static/data/products.json';

export const state = () => ({
    products: data.data
});

export const getters = {
    getAllProducts: state => {
        return state.products;
    },
    getFeaturedProducts: state =>
        state.products.filter(el => el.feature === true)
};

export const mutations = {};

export const actions = {};
