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
                        Best Sellers
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="ps-block__content">
            <!--
            <div class="ps-block__banner" key={category.text}>
                <img src={category.imagePath} alt="martfury" />
            </div>
            {data &&
            data.map(category => {
                if (category.type === 'large') {
                return (

                );
                } else {
                return (
                <div class="ps-block__item" key={category.text}>
                    <nuxt-link to="/shop">
                        <a class="ps-block__overlay"></a>
                    </nuxt-link>
                    <img src={category.imagePath} alt="martfury" />
                    <p>{category.text} </p>
                    <span>{category.item} Items</span>
                </div>
                );
                }
            })}-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryBoxConsummerElectronics',
    computed: {
        name() {
            return electronicCollection;
        }
    }
};
</script>

<style lang="scss" scoped></style>
