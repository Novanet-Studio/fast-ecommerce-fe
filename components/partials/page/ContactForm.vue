<template lang="html">
    <div class="ps-contact-form">
        <div class="container">
            <form class="ps-form--contact-us" action="/" method="get">
                <h3>Get In Touch</h3>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Name *"
                            />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Email *"
                            />
                        </div>
                    </div>
                    <div
                        class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
                    >
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Subject *"
                            />
                        </div>
                    </div>
                    <div
                        class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
                    >
                        <div class="form-group">
                            <textarea
                                class="form-control"
                                rows="5"
                                placeholder="Message"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group submit">
                    <button class="ps-btn">Send message</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactForm'
};
</script>

<style lang="scss" scoped></style>
