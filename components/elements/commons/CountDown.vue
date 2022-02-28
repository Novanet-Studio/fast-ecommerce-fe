<template lang="html">
    <ul class="ps-countdown">
        <li>
            <span class="days">{{ days }}</span>
            <p>Days</p>
        </li>
        <li>
            <span class="hours">{{ hours }}</span>
            <p>Hours</p>
        </li>
        <li>
            <span class="minutes">{{ minutes }}</span>
            <p>Minutes</p>
        </li>
        <li>
            <span class="seconds">{{ seconds }}</span>
            <p>Seconds</p>
        </li>
    </ul>
</template>

<script>
import moment from 'moment';

export default {
    name: 'CountDown',
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
