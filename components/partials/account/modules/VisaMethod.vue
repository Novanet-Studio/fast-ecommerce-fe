<template lang="html">
    <form>
        <div class="form-group">
            <label>
                Card Number
            </label>
            <input type="text" class="form-control" />
        </div>
        <div class="form-group">
            <label>
                Card Holders
            </label>
            <input type="text" class="form-control" />
        </div>
        <div class="row">
            <div class="col-8">
                <div class="form-group">
                    <label>
                        Expiration Date
                    </label>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <select class="form-control">
                                    <option v-for="month in months">
                                        {{ month }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <select class="form-control">
                                    <option v-for="year in years">
                                        {{ year }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label>
                        CVV
                    </label>
                    <input type="text" class="form-control" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <p>
                By making this purchase you agree to
                <a href="#" class="highlight">our terms and conditions</a>.
            </p>
            <button class="ps-btn ps-btn--fullwidth">
                Submit
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'VisaMethod',
    computed: {
        days() {
            let days = [];
            for (let i = 1; i <= 31; i++) {
                days.push(i);
            }
            return days;
        },
        months() {
            let month = [];
            for (let i = 1; i <= 12; i++) {
                month.push(i);
            }
            return month;
        },
        years() {
            let year = [];
            for (let i = 1; i <= 12; i++) {
                year.push(i);
            }
            return year;
        }
    }
};
</script>

<style lang="scss" scoped>
.highlight {
    color: $color-1st;
}
</style>
