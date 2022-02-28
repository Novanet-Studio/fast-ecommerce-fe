<template lang="html">
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="og-btn--language-mobile"
                color="success"
                block
                depressed
                :ripple="false"
                v-bind="attrs"
                v-on="on"
            >
                <img :src="selectedLocale.image" />
                {{ selectedLocale.name }}
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="item in languages" :key="item.id">
                <v-list-item-title
                    @click.prevent="handleSwitchLanguage(item.code)"
                >
                    <span class="language-item">
                        <img :src="item.image" />
                        {{ item.text }}
                    </span>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'MobileLangugeSwitcher',
    computed: {
        currentLocale() {
            return this.$i18n.locale;
        },
        selectedLocale() {
            return this.languages.find(
                item => item.code === this.currentLocale
            );
        }
    },
    data() {
        return {
            languages: [
                {
                    id: 1,
                    code: 'en',
                    image: '/img/flag/en.png',
                    text: 'English'
                },
                {
                    id: 2,
                    code: 'fr',
                    image: '/img/flag/fr.png',
                    text: 'Français'
                }
            ]
        };
    },
    methods: {
        handleSwitchLanguage(locale) {
            this.$router.push(this.switchLocalePath(locale));
        }
    }
};
</script>

<style lang="scss">
.og-btn--language-mobile {
    letter-spacing: 0 !important;
    text-transform: capitalize !important;
    font-size: 14px !important;
    color: #fff !important;
    background-color: $color-heading !important;
}
.language-item {
    font-size: 14px;
    vertical-align: middle;
}
</style>
