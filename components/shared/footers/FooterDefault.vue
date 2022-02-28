<template lang="html">
    <footer class="ps-footer">
        <div class="container">
            <FooterWidgets />
            <FooterLinks />
            <FooterCopyright />
        </div>
    </footer>
</template>

<script>
import FooterWidgets from '~/components/shared/footers/modules/FooterWidgets';
import FooterCopyright from '~/components/shared/footers/modules/FooterCopyright';
import FooterLinks from '~/components/shared/footers/modules/FooterLinks';
export default {
    name: 'FooterDefault',
    components: { FooterWidgets, FooterCopyright, FooterLinks }
};
</script>

<style lang="scss" scoped></style>
