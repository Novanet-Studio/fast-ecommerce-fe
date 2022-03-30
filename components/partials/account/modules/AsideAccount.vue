<template>
    <aside class="ps-widget--account-dashboard">
        <div class="ps-widget__header">
            <img src="/img/users/3.jpg" />
            <figure>
                <figcaption>Hola</figcaption>
                <p>{{user.user.username}}</p>
            </figure>
        </div>
        <div class="ps-widget__content">
            <AccountLinks />
        </div>
    </aside>
</template>

<script>
    import AccountLinks from './AccountLinks.vue';

    export default {
        name: 'AsideAccount',
        components: { AccountLinks }, 
        computed: {
            user(){
                return this.$cookies.get('auth')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>