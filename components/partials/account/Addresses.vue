<template lang="html">

    <div class="ps-section--account-setting">
        <div class="ps-section__content">
            <div class="row">
                <div class="col-md-6 col-12">
                    <figure class="ps-block--address">
                        <figcaption>
                            Billing address
                        </figcaption>
                        <div class="ps-block__content">
                            <p>
                                You Have Not Set Up This Type Of
                                Address Yet.
                            </p>
                            <nuxt-link
                                to="/account/edit-address?add=bill"
                            >
                                <a>Edit</a>
                            </nuxt-link>
                        </div>
                    </figure>
                </div>
                <div class="col-md-6 col-12">
                    <figure class="ps-block--address">
                        <figcaption>
                            Shipping address
                        </figcaption>
                        <div class="ps-block__content">
                            <p>
                                You Have Not Set Up This Type Of
                                Address Yet.
                            </p>
                            <nuxt-link
                                to="/account/edit-address?add=shipp"
                            >
                                <a>Edit</a>
                            </nuxt-link>
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Addresses',
};
</script>

<style lang="scss" scoped></style>
