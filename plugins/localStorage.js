import createPersistedState from 'vuex-persistedstate';

export default ({ store, isHMR }) => {
    if (isHMR) return;

    process.client &&
        window.onNuxtReady(() => {
            createPersistedState({
                paths: []
            })(store);
        });
};
