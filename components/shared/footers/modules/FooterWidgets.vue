<template lang="html">
    <div class="ps-footer__widgets">
        <aside class="widget widget_footer widget_contact-us">
            <h4 class="widget-title">
                {{ $t('footer.widgetHeading.contactUs') }}
            </h4>
            <div class="widget_content">
                <p>Call us 24/7</p>
                <h3>1800 97 97 69</h3>
                <p>
                    502 New Design Str, Melbourne, Australia <br />
                    <a href="mailto:contact@martfury.co">contact@martfury.co</a>
                </p>
                <ul class="ps-list--social">
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
                        <a class="google-plus" href="#">
                            <i class="fa fa-google-plus"></i>
                        </a>
                    </li>
                    <li>
                        <a class="instagram" href="#">
                            <i class="fa fa-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        <aside class="widget widget_footer">
            <h4 class="widget-title">
                {{ $t('footer.widgetHeading.quickLink') }}
            </h4>
            <ul class="ps-list--link">
                <li>
                    <a href="#">Policy</a>
                </li>
                <li>
                    <a href="#">Term & Condition</a>
                </li>
                <li>
                    <a href="#">Shipping</a>
                </li>
                <li>
                    <a href="#">Return</a>
                </li>
                <li>
                    <a href="faqs.html">FAQs</a>
                </li>
            </ul>
        </aside>
        <aside class="widget widget_footer">
            <h4 class="widget-title">
                {{ $t('footer.widgetHeading.company') }}
            </h4>
            <ul class="ps-list--link">
                <li>
                    <a href="about-us.html">About Us</a>
                </li>
                <li>
                    <a href="#">Affilate</a>
                </li>
                <li>
                    <a href="#">Career</a>
                </li>
                <li>
                    <a href="contact-us.html">Contact</a>
                </li>
            </ul>
        </aside>
        <aside class="widget widget_footer">
            <h4 class="widget-title">
                {{ $t('footer.widgetHeading.bussiness') }}
            </h4>
            <ul class="ps-list--link">
                <li>
                    <a href="#">Our Press</a>
                </li>
                <li>
                    <a href="checkout.html">Checkout</a>
                </li>
                <li>
                    <a href="my-account.html">My account</a>
                </li>
                <li>
                    <a href="shop-default.html">Shop</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
export default {
    name: 'FooterWidgets'
};
</script>

<style lang="scss" scoped></style>
