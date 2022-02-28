<template lang="html">
    <div class="swiper-nav">
        <span
            :class="
                `swiper-arrow swiper-prev ${type === 'simple' ? 'simple' : ''}`
            "
        >
            <i class="icon-chevron-left"></i>
        </span>
        <div
            :class="
                `swiper-arrow swiper-next ${type === 'simple' ? 'simple' : ''}`
            "
        >
            <i class="icon-chevron-right"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarouselArrows',
    props: {
        type: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/env.scss';

.swiper-arrow {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 46px;
    height: 46px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    z-index: 100;
    cursor: pointer;
    transition: all 0.25s ease;
    outline: none;

    i {
        font-size: 20px;
    }

    &:hover {
        background-color: $color-1st;
    }

    &.swiper-prev {
        left: 0;
    }

    &.swiper-next {
        right: 0;
    }

    &.simple {
        color: #ccc;
        background-color: transparent;

        i {
            font-size: 30px;
        }

        &:hover {
            background-color: transparent;
            color: $color-heading;
        }
    }

    @media screen and (min-width: 1366px) {
        &.swiper-prev {
            left: -30px;
        }

        &.swiper-next {
            right: -30px;
        }
    }

    @media screen and (min-width: 1440px) {
        &.swiper-prev {
            left: -70px;
        }

        &.swiper-next {
            right: -70px;
        }
    }
}

.swiper-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 0;
    @include media('<lg') {
        display: none;
    }
}
</style>
