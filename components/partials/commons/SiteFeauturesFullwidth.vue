<template lang="html">
    <div class="ps-site-features">
        <div class="ps-container">
            <div class="ps-block--site-features">
                <div class="ps-block__item">
                    <div class="ps-block__left">
                        <i class="icon-rocket"></i>
                    </div>
                    <div class="ps-block__right">
                        <h4>
                            {{ $t('common.siteFeatures.freeDelivery.key') }}
                        </h4>
                        <p>
                            {{ $t('common.siteFeatures.freeDelivery.value') }}
                        </p>
                    </div>
                </div>
                <div class="ps-block__item">
                    <div class="ps-block__left">
                        <i class="icon-sync"></i>
                    </div>
                    <div class="ps-block__right">
                        <h4>
                            {{ $t('common.siteFeatures.dateReturn.key') }}
                        </h4>
                        <p>{{ $t('common.siteFeatures.dateReturn.value') }}</p>
                    </div>
                </div>
                <div class="ps-block__item">
                    <div class="ps-block__left">
                        <i class="icon-credit-card"></i>
                    </div>
                    <div class="ps-block__right">
                        <h4>
                            {{ $t('common.siteFeatures.securePayment.key') }}
                        </h4>
                        <p>
                            {{ $t('common.siteFeatures.securePayment.value') }}
                        </p>
                    </div>
                </div>
                <div class="ps-block__item">
                    <div class="ps-block__left">
                        <i class="icon-bubbles"></i>
                    </div>
                    <div class="ps-block__right">
                        <h4>
                            {{ $t('common.siteFeatures.support.key') }}
                        </h4>
                        <p>
                            {{ $t('common.siteFeatures.support.value') }}
                        </p>
                    </div>
                </div>
                <div class="ps-block__item">
                    <div class="ps-block__left">
                        <i class="icon-gift"></i>
                    </div>
                    <div class="ps-block__right">
                        <h4>
                            {{ $t('common.siteFeatures.giftService.key') }}
                        </h4>
                        <p>
                            {{ $t('common.siteFeatures.giftService.value') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SiteFeauturesFullwidth'
};
</script>

<style lang="scss" scoped></style>
