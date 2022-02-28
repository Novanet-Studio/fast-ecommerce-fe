<template lang="html">
    <v-row justify="center">
        <v-dialog
            v-model="demoDialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <a
                    href="#"
                    @click.prevent=""
                    v-bind="attrs"
                    v-on="on"
                    id="btn-demos-panel"
                >
                    <v-btn
                        color="white"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        text
                        depressed
                        :ripple="false"
                    >
                        Demos
                    </v-btn>
                </a>
            </template>
            <div class="ps-page--demos">
                <a class="ps-page__close" @click.prevent="demoDialog = false">
                    <i class="icon icon-cross"></i>
                </a>
                <div class="container">
                    <div class="ps-page__header text-center">
                        <h3>Martfury Theme Demos</h3>
                        <p>
                            Check homepage demos, shop and single product page
                            layouts!
                        </p>
                    </div>
                    <div class="ps-page__content">
                        <page-links />
                    </div>
                </div>
            </div>
        </v-dialog>
    </v-row>
</template>

<script>
import PageLinks from '~/components/shared/demo-panel/PageLinks';
export default {
    name: 'DemoPanel',
    components: { PageLinks },
    data() {
        return {
            demoDialog: false
        };
    }
};
</script>

<style lang="scss" scoped>
#btn-demos-panel {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    background-color: #000;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
}
.ps-page--demos {
    position: relative;
    background-color: #fff;
    min-height: 100vh;
    padding: 50px 0;
    .ps-page__close {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
        font-size: 30px;
    }
}
</style>
