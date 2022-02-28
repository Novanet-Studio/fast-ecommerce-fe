<template lang="html">
    <div class="ps-payment-method" id="paypal">
        <p>
            By making this purchase you agree to
            <a href="#" class="highlight">our terms and conditions</a>.
        </p>
        <a href="#" class="ps-btn ps-btn--fullwidth">Process to payment</a>
    </div>
</template>

<script>
export default {
    name: 'PaypalMethod'
};
</script>

<style lang="scss" scoped>
.highlight {
    color: $color-1st;
}
#paypal {
    max-width: 500px;
}
</style>
