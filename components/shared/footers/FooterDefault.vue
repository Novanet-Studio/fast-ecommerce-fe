<template lang="html">
  <footer class="ps-footer">
    <div class="container">
      <FooterWidgets />
      <FooterCopyright />
    </div>
  </footer>
</template>

<script>
import FooterWidgets from "~/components/shared/footers/modules/FooterWidgets";
import FooterCopyright from "~/components/shared/footers/modules/FooterCopyright";

export default {
  name: "FooterDefault",
  components: { FooterWidgets, FooterCopyright },
};
</script>

<style lang="scss" scoped></style>
