<template lang="html">
    <div class="table-repsonsive">
        <table v-if="invoiceExist === true" class="table table-bordered">
            <thead>
                <tr>
                    <th>Nº</th>
                    <th>Factura</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableInvoices" :key="item.id" @click="goToInvoice(item.id_invoice_user, item)">
                    <td class="invoice-hover">{{item.id_invoice_user}}</td>
                    <td>{{item.payment_id}}</td>
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

        },
        goToInvoice(idInvUser, invoice){
            const cookieParams = {
                invoice: invoice
            }
            this.$cookies.set('invoice', cookieParams, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });
            this.$router.push(`/invoice/${idInvUser}`)
        }

    }
};
</script>

<style lang="scss" scoped>
.status-color{
    background-color: rgba(216, 255, 154, 0.603);
}
.invoice-hover:hover{
    background-color: #feeed7;
    color: #dd2400;
}
</style>
