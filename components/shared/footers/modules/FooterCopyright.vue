<template lang="html">
    <div class="ps-footer__copyright">
        <p v-html="$t('footer.copyright')">

        </p>

        <p>
            <span>We Using Safe Payment For:</span>
            <a href="#">
                <img src="~/static/img/payment-method/1.svg" alt="SqureUp logo" />
            </a>    
        </p></div

></template>
<script>
export default {
  name: "FooterCopyright",
};
</script>
