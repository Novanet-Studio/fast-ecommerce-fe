<template lang="html">
    <section class="ps-download-app">
        <div class="ps-container">
            <div class="ps-block--download-app">
                <div class="container">
                    <div class="row">
                        <div
                            class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 "
                        >
                            <div class="ps-block__thumbnail">
                                <img src="~/static/img/app.png" alt="" />
                            </div>
                        </div>
                        <div
                            class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 "
                        >
                            <div class="ps-block__content">
                                <h3>
                                    {{ $t('common.downloadApp.heading') }}
                                </h3>
                                <p>
                                    {{ $t('') }}
                                    {{ $t('common.downloadApp.content') }}
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
                                        <button class="ps-btn">
                                            {{ $t('common.subscribe') }}
                                        </button>
                                    </div>
                                </form>
                                <p class="download-link">
                                    <a href="#">
                                        <img
                                            src="~/static/img/google-play.png"
                                            alt=""
                                        />
                                    </a>
                                    <a href="#">
                                        <img
                                            src="~/static/img/app-store.png"
                                            alt=""
                                        />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'DownloadApp'
};
</script>

<style lang="scss" scoped></style>
