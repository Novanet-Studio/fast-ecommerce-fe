<template lang="html">
    <div class="table-repsonsive">
        <table v-if="invoiceExist === true" class="table table-bordered">
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
                <tr v-for="item in tableInvoices" :key="item.id">
                    <td>
                        <nuxt-link to="/account/invoice-detail">{{
                            item.id_invoice_user
                        }}</nuxt-link>
                    </td>
                    <td>CACHITO</td>
                    <td>{{ item.date }}</td>
                    <td>${{ item.amount }}</td>
                    <td v-if="item.paid === true" class="status-color">{{ item.status }}</td>
                    <td v-else>{{ item.status }}</td>
                </tr>
            </tbody>
        </table>
        <h4 v-else>No posees ninguna factura aun!</h4>
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
            ],
            invoiceExist: false, 
            tableInvoices: null
        };
    },
    computed: {
        user(){
            return this.$cookies.get('auth').user;
        },
    },
    mounted(){
        this.getPayments()
    },
    methods: {
        async getPayments(){
            const respuesta = await this.$store.dispatch('checkout/getAllInvoices', this.user.id).then( res=> {
                if(res.length > 0){
                    this.invoiceExist = true;
                    for (let i = 0; i < res.length; i++) {
                        res[i].id_invoice_user = i+1;
                        res[i].date = new Date(res[i].created_at).toLocaleDateString()
                        if(res[i].paid === true){
                            res[i].status = 'Pagado'
                        }else{
                            res[i].status = 'Cancelado'
                        }
                    }
                    this.tableInvoices = res
                }else{
                    this.invoiceExist = false;
                }
            })

            console.log(this.invoiceExist)
        },
        async getProductInvoices(data){
            const productos = await this.$store.dispatch('product/getProductById', data )
        }

    }
};
</script>

<style lang="scss" scoped>
.status-color{
    background-color: rgba(216, 255, 154, 0.603);
}
</style>
