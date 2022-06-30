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
            <tbody v-if="page = false">
                <tr v-for="item in tableInvoices" :key="item.id" @click="goToInvoice(item.attributes.id_invoice_user, item)">
                    <td class="invoice-hover">{{item.attributes.id_invoice_user}}</td>
                    <td>{{item.attributes.payment_id}}</td>
                    <td>{{ item.attributes.date }}</td>
                    <td>${{ item.attributes.amount }}</td>
                    <td v-if="item.attributes.paid === true" class="status-color">{{ item.attributes.status }}</td>
                    <td v-else class="status-color--pending">{{ item.attributes.status }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="item in tableInvoices" :key="item.id" @click="goToInvoice(item.attributes.id_invoice_user, item)">
                    <td class="invoice-hover">{{item.attributes.id_invoice_user}}</td>
                    <td>{{item.attributes.payment_id}}</td>
                    <td>{{ item.attributes.date }}</td>
                    <td>${{ item.attributes.amount }}</td>
                    <td v-if="item.attributes.paid === true" class="status-color">{{ item.attributes.status }}</td>
                    <td v-else class="status-color--pending">{{ item.attributes.status }}</td>
                </tr>
            </tbody>
        </table>
        <h4 v-else>No posees ninguna factura aun!</h4>
        <div class="ps-pagination" v-if="page !== false">
            hola
            <ul class="pagination">
                <li class="active" v-for="link in pages" @click="setPageInvoice(link)">
                    <a href="#">{{ link }}</a>
                </li>
                <li>
                    <a href="#">
                        Next Page
                        <i class="icon-chevron-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TableInvoices',
    data() {
        return {
            invoiceExist: false, 
            tableInvoices: null,
            page: false,
            pages: [],
            number: null,
            allInvoices: null,
        };
    },
    computed: {
        user(){
            return this.$cookies.get('auth').user;
        },
    },
    mounted(){
        this.getPayments();
    },
    methods: {
        async getPayments(){
            const respuesta = await this.$store.dispatch('checkout/getAllInvoices', this.user.id).then( ress => {
                console.log('===? los invoices',ress.data)
                if(ress.data.length > 0){
                    var res = ress.data
                    this.invoiceExist = true;
                    for (let i = 0; i < res.length; i++) {
                        res[i].attributes.id_invoice_user = i+1;
                        res[i].attributes.date = new Date(res[i].attributes.createdAt).toLocaleDateString()
                        if(res[i].attributes.paid === true){
                            res[i].attributes.status = 'Pagado'
                        }else{
                            res[i].attributes.status = 'Pendiente'
                        }
                    }
                    this.tableInvoices = res
                    this.pagination()
                }else{
                    this.invoiceExist = false;
                }
            })
                    console.log('===> todo creo', this.tableInvoices)


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
        },
        pagination(){
            if(this.invoiceExist !== false ){
                if(this.tableInvoices.length > 10){
                    this.page = true;
                    this.number = (this.tableInvoices.length/10).toFixed(0)
                    var pages = []
                    for (let i = 1; i <= (this.number); i++) {
                        pages.push(i)
                    }
                    // for (let i = i; i < pages.length; i++) {
                    //     console.log(this.tableInvoices.splice(0, 10))
                        
                    // }
                    
                    this.pages = pages; 

                }
            }
        },
        setPageInvoice(number){
            console.log('===> number', number)
        }

    }
};
</script>

<style lang="scss" scoped>
.status-color{
    background-color: rgba(216, 255, 154, 0.603);
}
.status-color--pending{
    background-color: rgba(242, 191, 51, 0.603);
}
.invoice-hover:hover{
    background-color: #feeed7;
    color: #dd2400;
}
</style>
