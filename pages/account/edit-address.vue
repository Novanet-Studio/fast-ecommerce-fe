<template lang="html">
    <section v-if="type" class="ps-page--my-account">
        <edit-address :tipo="type" />
        <notifications
            group="all"
            :duration="2000"
            :width="300"
            animation-name="fade-left"
            position="top right"
        >
            <template slot="body" slot-scope="props">
                <div class="ps-notify" :class="props.className">
                    <button class="ps-notify__close" @click="props.close">
                        <i class="icon icon-cross"></i>
                    </button>
                    <div class="ps-notify__header">
                        <span>{{ props.item.title }}</span>
                    </div>
                    <div class="ps-notify__content">
                        <p>{{ props.item.text }}</p>
                    </div>
                </div>
            </template>
        </notifications>
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Newsletters from '~/components/partials/commons/Newsletters';
import EditAddress from '~/components/partials/account/EditAddress';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    layout: 'layout-account',
    components: {
        EditAddress,
        Newsletters,
        BreadCrumb
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Edit Address'
                }
            ]
        };
    },
    computed: {
        type(){
            var type = this.$route.fullPath.split('?')[1];
            if(type === 'add=bill' || type === 'add=shipp'){
                return type;
            }else{
                this.$router.push('/')
            }
        }
    },
    mounted(){
        console.log(this.$route.fullPath.split('?')[1])
    }
};
</script>

<style lang="scss" scoped></style>
