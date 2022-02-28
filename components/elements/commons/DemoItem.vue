<template lang="html">
    <div class="ps-block--demo-item">
        <div class="ps-block__thumbnail">
            <nuxt-link :to="demo.url">
                <img :src="demo.thumbnail" />
            </nuxt-link>
        </div>
        <div class="ps-block__content">
            <nuxt-link :to="demo.url">
                {{ demo.text }}
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DemoItem',
    props: {
        demo: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" scoped>
.ps-block--demo-item {
    margin-bottom: 30px;
    .ps-block__thumbnail {
        overflow: hidden;
        border: 2px solid #eaeaea;
        img {
            transition: all 0.25s ease;
        }
        a {
            display: block;
        }
    }
    .ps-block__content {
        padding: 20px 0;
        text-align: center;
        a {
            font-weight: 600;
            font-size: 20px;
            &:hover {
                color: $color-1st;
            }
        }
    }
    &:hover {
        .ps-block__thumbnail {
            border-color: $color-1st;
        }
    }
}
</style>
