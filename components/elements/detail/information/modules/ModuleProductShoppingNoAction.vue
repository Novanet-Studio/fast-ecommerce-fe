<template lang="html">
    <div class="ps-product__shopping">
        <figure>
            <figcaption>Quantity</figcaption>
            <div class="form-group--number">
                <button class="up">
                    <i class="fa fa-plus"></i>
                </button>
                <button class="down">
                    <i class="fa fa-minus"></i>
                </button>
                <input class="form-control" type="text" disabled />
            </div>
        </figure>
        <a class="ps-btn ps-btn--black" href="#">
            Add to cart
        </a>
        <a class="ps-btn" href="#">
            Buy Now
        </a>
        <div class="ps-product__actions">
            <a href="#">
                <i class="icon-heart"></i>
            </a>
            <a href="#">
                <i class="icon-chart-bars"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleProductShoppingNoAction'
};
</script>

<style lang="scss" scoped></style>
