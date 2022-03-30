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
            <AccountLinks :breadinfo="getLinkName" />
        </div>
    </aside>
</template>

<script>
    import AccountLinks from './AccountLinks';

    export default {
        name: 'AsideAccount',
        props: ['bread'],
        components: { AccountLinks }, 
        computed: {
            user(){
                return this.$cookies.get('auth')
            }
        },
        methods: {
            getLinkName(datos){
                this.bread(datos)
            }
        },

 
        
    }
</script>

<style lang="scss" scoped>

</style>