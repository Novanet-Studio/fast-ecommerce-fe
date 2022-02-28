<template lang="html">
    <section class="ps-newsletter">
        <div :class="layout === 'fullwidth' ? 'ps-container' : 'container'">
            <form class="ps-form--newsletter" action="do_action" method="post">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="ps-form__left">
                            <h3>
                                {{ $t('common.newsLetter.heading') }}
                            </h3>
                            <p>
                                {{ $t('common.newsLetter.content') }}
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-7 ">
                        <div class="ps-form__right">
                            <div class="form-group--nest">
                                <input
                                    class="form-control"
                                    type="email"
                                    placeholder="Email address"
                                />
                                <button class="ps-btn">
                                    {{ $t('common.subscribe') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Newsletters',
    props: {
        layout: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped></style>
