<template lang="html">
    <div class="ps-block--categories-box">
        <div class="ps-block__header">
            <h3>Home, Garden & Kitchen</h3>
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
                    src="~/static/img/categories/kitchen/large.jpg"
                    alt="martfury"
                />
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/kitchen/1.jpg"
                    alt="martfury"
                />
                <p>Furniture</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/kitchen/2.jpg"
                    alt="martfury"
                />
                <p>Decoration</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/kitchen/3.jpg"
                    alt="martfury"
                />
                <p>Utensil &amp; Gadget</p>
                <span>4 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/kitchen/4.jpg"
                    alt="martfury"
                />
                <p>Cookware</p>
                <span>5 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/kitchen/5.jpg"
                    alt="martfury"
                />
                <p>Powers And Hand Tools</p>
                <span>10 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/kitchen/6.jpg"
                    alt="martfury"
                />
                <p>Garden Tools</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/kitchen/7.jpg"
                    alt="martfury"
                />
                <p>Home Improvement</p>
                <span>3 Items</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoriesBoxGardenAndKitchen'
};
</script>

<style lang="scss" scoped></style>
