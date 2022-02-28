<template lang="html">
    <div class="ps-skeleton--product">
        <skeleton-item type="image"/>
        <skeleton-item type="heading"/>
        <skeleton-item type="paragraph" :lines="3" />
    </div>
</template>
<script>

import { generateArr } from '@/utilities/helpers';
import SkeletonItem from '@/components/elements/skeleton/SkeletonItem';

export default {
    name: 'skeleton-product',
    components: { SkeletonItem },
    computed: {
        lines() {
            return generateArr(3);
        }
    }
};
</script>
