<template>
  <aside class="ps-widget--account-dashboard">
    <div class="ps-widget__header">
      <div>
        <h3>¡Bienvendo {{ user.user.username }}!</h3>
      </div>
    </div>
    <div class="ps-widget__content">
      <AccountLinks :breadinfo="getLinkName" />
    </div>
  </aside>
</template>

<script>
import AccountLinks from "./AccountLinks";

export default {
  name: "AsideAccount",
  props: ["bread"],
  components: { AccountLinks },
  computed: {
    user() {
      return this.$cookies.get("auth");
    },
  },
  methods: {
    getLinkName(datos) {
      this.bread(datos);
    },
  },
};
</script>

<style lang="scss" scoped></style>
