<template lang="html">
  <div class="ps-footer__copyright">
    <p v-html="$t('footer.copyright')"></p>

    <p>
      <span>Sus pagos están protegidos con:</span>
      <a href="https://squareup.com/es/es">
        <img src="~/static/img/square-logo.svg" alt="SquareUp logo" />
      </a>
    </p>
    <p>
      <span>Tienda realizada por</span>
      <a href="https://novanet.studio/">
        <img src="~/static/img/novanet-logo.svg" alt="SquareUp logo" />
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: "FooterCopyright",
};
</script>
