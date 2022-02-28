const calculateAmount = obj =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

export const state = () => ({
    total: 0,
    amount: 0,
    cartItems: [],
    loading: false
});

export const mutations = {
    initCart(state, payload) {
        state.cartItems = payload.cartItems;
        state.amount = payload.amount;
        state.total = payload.total;
    },

    setLoading(state, payload) {
        state.loading = payload;
    },

    addItem(state, payload) {
        if (state.cartItems !== null) {
            let existItem = state.cartItems.find(item => item.id === payload.id);
            if (existItem) {
                existItem.quantity += payload.quantity;
            } else {
                state.cartItems.push(payload);
            }
            state.total++;
        } else {
            state.cartItems.push(payload);
            state.total = 1;
        }
        state.amount = calculateAmount(state.cartItems);
    },

    removeItem: (state, payload) => {
        const index = state.cartItems.findIndex(item => item.id === payload.id);
        state.total = state.total - payload.quantity;
        state.cartItems.splice(index, 1);
        state.amount = calculateAmount(state.cartItems);
        if (state.cartItems.length === 0) {
            state.cartItems = [];
            state.amount = 0;
            state.total = 0;
        }
    },

    increaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find(item => item.id === payload.id);
        if (selectedItem) {
            selectedItem.quantity++;
            state.total++;
            state.amount = calculateAmount(state.cartItems);
        }
    },

    decreaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find(item => item.id === payload.id);
        if (selectedItem && selectedItem.quantity > 1) {
            selectedItem.quantity--;
            state.total--;
            state.amount = calculateAmount(state.cartItems);
        }
    },

    clearCart: state => {
        state.cartItems = [];
        state.amount = 0;
        state.total = 0;
    }
};

export const actions = {
    addProductToCart({ commit, state }, payload) {
        commit('addItem', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    removeProductFromCart({ commit, state }, payload) {
        commit('removeItem', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    increaseCartItemQuantity({ commit, state }, payload) {
        commit('increaseItemQuantity', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    decreaseCartItemQuantity({ commit, state }, payload) {
        commit('decreaseItemQuantity', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    clearCart({ commit }) {
        commit('clearCart');
        const cookieParams = {
            total: 0,
            amount: 0,
            cartItems: []
        };
        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    }
};
