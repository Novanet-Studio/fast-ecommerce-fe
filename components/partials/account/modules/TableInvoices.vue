<template lang="html">
    <div class="table-repsonsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.id">
                    <td>
                        <nuxt-link to="/account/invoice-detail">{{
                            item.invoiceId
                        }}</nuxt-link>
                    </td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.dateCreate }}</td>
                    <td>${{ item.amount }}</td>
                    <td>{{ item.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TableInvoices',
    data() {
        return {
            tableData: [
                {
                    id: '1',
                    invoiceId: '500884010',
                    title: 'Marshall Kilburn Portable Wireless Speaker',
                    dateCreate: '20-1-2020',
                    amount: '42.99',
                    status: 'Successful delivery'
                },
                {
                    id: '2',
                    invoiceId: '593347935',
                    title: 'Herschel Leather Duffle Bag In Brown Color',
                    dateCreate: '20-1-2020',
                    amount: '199.99',
                    status: 'Cancel'
                },
                {
                    id: '3',
                    invoiceId: '593347935',
                    title: 'Xbox One Wireless Controller Black Color',
                    dateCreate: '20-1-2020',
                    amount: '199.99',
                    status: 'Cancel'
                },
                {
                    id: '4',
                    invoiceId: '615397400',
                    title: 'Grand Slam Indoor Of Show Jumping Novel',
                    dateCreate: '20-1-2020',
                    amount: '41.00',
                    status: 'Cancel'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
