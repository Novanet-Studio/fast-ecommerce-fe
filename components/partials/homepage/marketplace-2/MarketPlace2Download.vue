<template lang="html">
    <div class="ps-download-app">
        <div class="container">
            <div class="ps-block--download-app">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                        <div class="ps-block__thumbnail">
                            <img src="~/static/img/app.png" alt="martfury" />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                        <div class="ps-block__content">
                            <h3>Download Martfury App Now!</h3>
                            <p>
                                Shopping fastly and easily more with our app.
                                Get a link to download the app on your phone
                            </p>
                            <form
                                class="ps-form--download-app"
                                action="do_action"
                                method="post"
                            >
                                <div class="form-group--nest">
                                    <input
                                        class="form-control"
                                        type="Email"
                                        placeholder="Email Address"
                                    />
                                    <button class="ps-btn">Subscribe</button>
                                </div>
                            </form>
                            <p class="download-link">
                                <a href="#">
                                    <img
                                        src="~/static/img/google-play.png"
                                        alt="martfury"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="~/static/img/app-store.png"
                                        alt="martfury"
                                    />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MarketPlace2Download'
};
</script>

<style lang="scss" scoped></style>
