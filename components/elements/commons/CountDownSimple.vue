<template lang="html">
    <ul class="ps-countdown">
        <li>
            <span class="days">{{ days }}</span>
        </li>
        <li>
            <span class="hours">{{ hours }}</span>
        </li>
        <li>
            <span class="minutes">{{ minutes }}</span>
        </li>
        <li>
            <span class="seconds">{{ seconds }}</span>
        </li>
    </ul>
</template>

<script>
import moment from 'moment';

export default {
    name: 'CountDownSimple',
    data() {
        return {
            seconds: null,
            minutes: null,
            hours: null,
            days: null
        };
    },
    props: {
        time: {
            type: String,
            default: () => ''
        },
        format: {
            type: String,
            default: () => ''
        }
    },

    mounted() {
        setInterval(() => {
            const then = moment(this.time, this.format);
            const now = moment();
            const countdown = moment(then - now);
            this.days = countdown.format('D');
            this.hours = countdown.format('HH');
            this.minutes = countdown.format('mm');
            this.seconds = countdown.format('ss');
        }, 1000);
    }
};
</script>

<style lang="scss" scoped></style>
