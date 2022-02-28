<template lang="html">
    <div class="ps-block--vendor">
        <div class="ps-block__thumbnail">
            <img src="/img/vendor/vendor-store.jpg" alt="martfury" />
        </div>
        <div class="ps-block__container">
            <div class="ps-block__header">
                <h4>Digitalworld us</h4>
                <Rating />
                <p><strong>85% Positive</strong> (562 rating)</p>
            </div>
            <div class="ps-block__divider"></div>
            <div class="ps-block__content">
                <p>
                    <strong>Digiworld US</strong>, New York’s no.1 online
                    retailer was established in May 2012 with the aim and vision
                    to become the one-stop shop for retail in New York with
                    implementation of best practices both online
                </p>
                <span class="ps-block__divider"></span>
                <p>
                    <strong>Address</strong> 325 Orchard Str, New York, NY 10002
                </p>
                <figure>
                    <figcaption>
                        Foloow us on social
                    </figcaption>
                    <ul class="ps-list--social-color">
                        <li>
                            <a class="facebook" href="#">
                                <i class="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a class="twitter" href="#">
                                <i class="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a class="linkedin" href="#">
                                <i class="fa fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a class="feed" href="#">
                                <i class="fa fa-feed"></i>
                            </a>
                        </li>
                    </ul>
                </figure>
            </div>
            <div class="ps-block__footer">
                <p>
                    Call us directly
                    <strong>(+053) 77-637-3300</strong>
                </p>
                <p>or Or if you have any question</p>
                <a class="ps-btn ps-btn--fullwidth" href="">
                    Contact Seller
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import Rating from '~/components/elements/Rating';

export default {
    name: 'VendorProfile',
    components: { Rating }
};
</script>

<style lang="scss" scoped></style>
