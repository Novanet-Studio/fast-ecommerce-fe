
export const state = () => ({
    products: null
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
