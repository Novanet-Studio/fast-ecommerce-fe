<template lang="html">
    <div class="ps-dropdown">
        <a href="#">
            {{ selectedCurrency.name }}
        </a>
        <ul class="ps-dropdown-menu">
            <li v-for="item in currencyItems" :key="item.id">
                <a href="#" @click.prevent="handleChangeCurrency(item.code)">
                    {{ item.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'CurrencyDropdown',
    computed: {
        ...mapState({
            currency: state => state.app.currency,
            app: state => state.app
        }),
        selectedCurrency() {
            return this.currencyItems.find(item => item.code === this.currency);
        }
    },
    data() {
        return {
            currencyItems: [
                {
                    id: 1,
                    code: '$',
                    name: 'US Dollar'
                },
                {
                    id: 2,
                    code: '€',
                    name: 'Euro'
                },
                {
                    id: 3,
                    code: '£',
                    text: 'GBP'
                }
            ]
        };
    },
    methods: {
        handleChangeCurrency(code) {
            this.$store.dispatch('app/changeCurrency', code);
        }
    }
};
</script>

<style lang="scss" scoped></style>
