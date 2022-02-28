<template lang="html">
    <footer class="ps-footer">
        <div class="ps-container">
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
    components: {
        FooterWidgets,
        FooterCopyright,
        FooterLinks
    }
};
</script>
