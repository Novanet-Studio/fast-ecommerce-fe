<template lang="html">
    <client-only>
        <notifications
            group="addCartSuccess"
            :duration="2000"
            :width="300"
            animation-name="fade-left"
            position="top right"
        >
            <template slot="body" slot-scope="props">
                <div class="ps-notify" :class="props.className">
                    <button class="ps-notify__close" @click="props.close">
                        <i class="icon icon-cross"></i>
                    </button>
                    <div class="ps-notify__header">
                        <span>{{ props.item.title }}</span>
                    </div>
                    <div class="ps-notify__content">
                        <p>{{ props.item.text }}</p>
                    </div>
                </div>
            </template>
        </notifications>
    </client-only>
</template>
<script>
export default {
    name: 'Notify'
};
</script>

<style lang="scss">
.ps-notify {
    margin-bottom: 10px;
    position: relative;
    padding: 15px 50px 15px 20px;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #f9f9f9;
    border-bottom: 3px solid $color-1st;
    box-shadow: 0 1px 5px 1px rgba(#ccc, 0.5);

    p {
        margin-bottom: 10px;
    }

    &__close {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        transition: all 0.4s ease;

        &:hover {
            box-shadow: 0 0 10px rgba(#ccc, 1);
            background-color: #fff;
            transform-origin: 50% 50%;
            transform: translateY(-50%) rotate(180deg);

            .ps-icon--cross {
                &:before,
                &:after {
                    background-color: $color-heading;
                }
            }
        }
    }

    &__header {
        span {
            font-weight: 600;
        }
    }
}

.fade-left-enter-active,
.fade-left-leave-active,
.fade-left-move {
    transition: all 0.5s;
}

.fade-left-enter,
.fade-left-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
