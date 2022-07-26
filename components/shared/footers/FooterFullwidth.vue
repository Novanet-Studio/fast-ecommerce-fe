<template lang="html">
    <footer class="ps-footer">
        <div class="ps-container">
            <FooterWidgets />
            <FooterCopyright />
        </div>
    </footer>
</template>
<script>
import FooterWidgets from '~/components/shared/footers/modules/FooterWidgets';
import FooterCopyright from '~/components/shared/footers/modules/FooterCopyright';

export default {
    components: {
        FooterWidgets,
        FooterCopyright,
    }
};
</script>
