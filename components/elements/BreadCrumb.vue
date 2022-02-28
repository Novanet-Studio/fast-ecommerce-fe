<template lang="html">
    <div class="ps-breadcrumb">
        <div :class="layout === 'fullwidth' ? 'ps-container' : 'container'">
            <ul class="breadcrumb">
                <template v-for="item in breadcrumb">
                    <li v-if="item.url" :key="item.text">
                        <nuxt-link :to="item.url">
                            <a>{{ item.text }}</a>
                        </nuxt-link>
                    </li>
                    <li v-else>{{ item.text }}</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BreadCrumb',
    props: {
        breadcrumb: {
            type: Array,
            default: []
        },
        layout: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped></style>
