
export const state = () => ({
    blog: null
});

export const getters = {
    getAllPosts: state => state.blog,
    getNewestPost: state => state.blog.slice(0, 5)
};

export const mutations = {};

export const actions = {};
