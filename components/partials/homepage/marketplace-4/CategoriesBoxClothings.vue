<template lang="html">
    <div class="ps-block--categories-box">
        <div class="ps-block__header">
            <h3>Clothing & Apparel</h3>
            <ul>
                <li>
                    <nuxt-link to="/shop">
                        New Arrivals
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Best Seller
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="ps-block__content">
            <div class="ps-block__banner">
                <img
                    src="~/static/img/categories/clothing/large.jpg"
                    alt="martfury"
                />
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/clothing/1.jpg"
                    alt="martfury"
                />
                <p>Womens</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/clothing/2.jpg"
                    alt="martfury"
                />
                <p>Mens</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/clothing/3.jpg"
                    alt="martfury"
                />
                <p>Shoes</p>
                <span>4 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/clothing/4.jpg"
                    alt="martfury"
                />
                <p>Bags</p>
                <span>5 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/clothing/5.jpg"
                    alt="martfury"
                />
                <p>Sunglasses</p>
                <span>10 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/clothing/6.jpg"
                    alt="martfury"
                />
                <p>Accessories</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/clothing/7.jpg"
                    alt="martfury"
                />
                <p>Kid's Fashion</p>
                <span>3 Items</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoriesBoxClothings'
};
</script>

<style lang="scss" scoped></style>
