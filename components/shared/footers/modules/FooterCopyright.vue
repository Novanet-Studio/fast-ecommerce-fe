<template lang="html">
    <div class="ps-footer__copyright">
        <p v-html="$t('footer.copyright')">

        </p>
        <p>
            <span>We Using Safe Payment For:</span>
            <a href="#">
                <img src="~/static/img/payment-method/1.jpg" alt="" />
            </a>
            <a href="#">
                <img src="~/static/img/payment-method/2.jpg" alt="" />
            </a>
            <a href="#">
                <img src="~/static/img/payment-method/3.jpg" alt="" />
            </a>
            <a href="#">
                <img src="~/static/img/payment-method/4.jpg" alt="" />
            </a>
            <a href="#">
                <img src="~/static/img/payment-method/5.jpg" alt="" />
            </a>
        </p></div
></template>
<script>
export default {
    name: 'FooterCopyright'
};
</script>
