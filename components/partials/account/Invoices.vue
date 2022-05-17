<template lang="html">

    <div class="ps-page__content">
        <div class="ps-section--account-setting">
            <div class="ps-section__header">
                <h3>Ordenes de compra</h3>
            </div>
            <div class="ps-section__content">
                <TableInvoices />
            </div>
        </div>
    </div>
</template>

<script>
import TableInvoices from './modules/TableInvoices';
export default {
    name: 'InvoiceDetail',
    components: { TableInvoices},
};
</script>

<style lang="scss" scoped></style>
