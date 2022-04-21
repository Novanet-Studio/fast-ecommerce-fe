<template lang="html">

    <section class="ps-section--account-setting">
        <div class="ps-section__content">
            <p>{{}}</p>
        </div>
    </section>

</template>

<script>
export default {
    name: 'UserInformation',
    computed: {
        user(){
            return this.$cookies.get('auth').user;
        }
    },
    mounted(){
    },

};
</script>

<style lang="scss" scoped></style>
