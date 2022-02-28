<template lang="html">
    <div class="navigation__right">
        <nuxt-link to="/account/shopping-cart" class="header__extra">
            <i class="icon-bag2"></i>
            <span>
                <i>0</i>
            </span>
        </nuxt-link>
        <nuxt-link to="/account/login" class="header__extra">
            <i class="icon-user"></i>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'MobileHeaderActions'
};
</script>

<style lang="scss" scoped></style>
