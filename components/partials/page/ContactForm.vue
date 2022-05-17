<template lang="html">
    <div class="ps-contact-form">
        <div class="container">
            <form class="ps-form--contact-us" action="/" method="get">
                <h3>Envíanos un mensaje</h3>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Nombre *"
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
                                placeholder="Asunto *"
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
                                placeholder="Mensaje"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group submit">
                    <button class="ps-btn">Enviar mensaje</button>
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
