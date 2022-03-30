<template lang="html">

    <div class="ps-page__content">
        <div class="ps-section--account-setting">
            <div class="ps-section__header">
                <h3>Notifications</h3>
            </div>
            <div class="ps-section__content">
                <TableNotifications />
            </div>
        </div>
    </div>

</template>

<script>
import TableNotifications from './modules/TableNotifications';
export default {
    name: 'InvoiceDetail',
    components: { TableNotifications},

};
</script>

<style lang="scss" scoped></style>
