<template lang="html">
    <div v-if="lines > 0 && type=== 'paragraph'" class="ps-skeleton-wrapper">
        <div v-for="item in lineArr" class="ps-skeleton line" :key="item"/>
    </div>
    <div v-else :class="`ps-skeleton ${classes}`"/>
</template>

<script>
import { generateArr } from '@/utilities/helpers';

export default {
    name: 'SkeletonItem',
    computed: {
        classes() {
            let classes;
            switch (this.type) {
                case 'button':
                    classes = 'button';
                    break;
                case 'image':
                    classes = 'image';
                    break;
                case 'image-square':
                    classes = 'square';
                    break;
                case 'heading':
                    classes = 'heading';
                    break;
                default:
                    classes =  'line'
            }
            return classes;
        },
        lineArr() {
            if (this.lines > 0) {
                return generateArr(this.lines);
            }
            else {
                return null
            }
        }
    },
    props: {
        type: {
            type: String,
            default: () => 'line'
        },
        lines: {
            type: Number,
            default: () => 0
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
