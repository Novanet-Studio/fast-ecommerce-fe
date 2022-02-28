<template lang="html">
    <div class="ps-block--categories-box">
        <div class="ps-block__header">
            <h3>Consumer Electronics</h3>
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
                    src="~/static/img/categories/electronic/large.jpg"
                    alt="martfury"
                />
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/electronic/1.jpg"
                    alt="martfury"
                />
                <p>Audios &amp; Theaters</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/electronic/2.jpg"
                    alt="martfury"
                />
                <p>TV Televisions</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/electronic/3.jpg"
                    alt="martfury"
                />
                <p>Washing Machines</p>
                <span>4 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/electronic/4.jpg"
                    alt="martfury"
                />
                <p>Air Conditioners</p>
                <span>5 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/electronic/5.jpg"
                    alt="martfury"
                />
                <p>Refrigerators</p>
                <span>10 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/electronic/6.jpg"
                    alt="martfury"
                />
                <p>Office Electronics</p>
                <span>2 Items</span>
            </div>
            <div class="ps-block__item">
                <a class="ps-block__overlay"></a>
                <img
                    src="~/static/img/categories/electronic/7.jpg"
                    alt="martfury"
                />
                <p>Car Electronics</p>
                <span>3 Items</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoriesBoxConsumerElectronics'
};
</script>

<style lang="scss" scoped></style>
