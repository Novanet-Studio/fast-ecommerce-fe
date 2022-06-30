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
            <!-- <tbody v-if="page = false">
                <tr v-for="item in tableInvoices" :key="item.id" @click="goToInvoice(item.attributes.id_invoice_user, item)">
                    <td class="invoice-hover">{{item.attributes.id_invoice_user}}</td>
                    <td>{{item.attributes.order_id}}</td>
                    <td>{{ item.attributes.date }}</td>
                    <td>${{ item.attributes.amount }}</td>
                    <td v-if="item.attributes.paid === true" class="status-color">{{ item.attributes.status }}</td>
                    <td v-else class="status-color--pending">{{ item.attributes.status }}</td>
                </tr>
            </tbody> -->
            <tbody>
                <tr v-for="item in tableInvoices" :key="item.id" @click="goToInvoice(item.attributes.id_invoice_user, item)">
                    <td class="invoice-hover">{{item.attributes.id_invoice_user}}</td>
                    <td>{{item.attributes.order_id}}</td>
                    <td>{{ item.attributes.date }}</td>
                    <td>${{ item.attributes.amount }}</td>
                    <td v-if="item.attributes.paid === true" class="status-color">{{ item.attributes.status }}</td>
                    <td v-else class="status-color--pending">{{ item.attributes.status }}</td>
                </tr>
            </tbody>
        </table>
        <h4 v-else>No posees ninguna factura aun!</h4>
        <div class="ps-pagination">
            <ul class="pagination">
                <li class="pagination_links" id="page_1">
                    <a href="#" @click="changeTo(1)">1</a>
                </li>
                <li class="pagination_links" id="page_2">
                    <a href="#" @click="changeTo(2)">2</a>
                </li>
                <li class="pagination_links" id="page_3">
                    <a href="#" @click="changeTo(3)">3</a>
                </li>
                <li class="pagination_links" id="page_rest">
                    <a href="#" @click="changePage()">
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
            page: 1,
            pages: [],
            number: null,
            allInvoices: null,
            currentPage: 1,
        };
    },
    computed: {
        user(){
            return this.$cookies.get('auth').user;
        },
    },
    mounted(){
        // this.getPayments();
        this.getPaymentsPaginated()
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
        async getPaymentsPaginated(){
            var payload = {
                userId: this.user.id, 
                page: this.page
            }
            const respuesta = await this.$store.dispatch('checkout/getAllInvoicesPaginator', payload ).then( ress => {
                console.log('===? los invoices',ress.data)
                if(ress.data.data.length > 0){
                    var res = ress.data.data
                    this.invoiceExist = true;
                    if(this.page === 1){
                        for (let i = 0; i < res.length; i++) {
                            res[i].attributes.id_invoice_user = i+1;
                            res[i].attributes.date = new Date(res[i].attributes.createdAt).toLocaleDateString()
                            if(res[i].attributes.paid === true){
                                res[i].attributes.status = 'Pagado'
                            }else{
                                res[i].attributes.status = 'Pendiente'
                            }
                        }
                    }else{
                        for (let i = 0; i < res.length; i++) {
                            res[i].attributes.id_invoice_user = ((this.page-1)*10)+(i+1);
                            res[i].attributes.date = new Date(res[i].attributes.createdAt).toLocaleDateString()
                            if(res[i].attributes.paid === true){
                                res[i].attributes.status = 'Pagado'
                            }else{
                                res[i].attributes.status = 'Pendiente'
                            }
                        }
                    }
                    this.tableInvoices = res
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
        async changePage(){
            this.page = this.page + 1; 

            var payload = {
                userId: this.user.id, 
                page: this.page
            }
            const respuesta = await this.$store.dispatch('checkout/getAllInvoicesPaginator', payload ).then( ress => {
                if(ress.data.data.length > 0 && ress.data.meta.pagination.pageCount >= this.page){
                    var all_links = document.querySelectorAll('.pagination_links')
                    all_links.forEach(item => {
                        if(item.classList.value.includes('active')){
                            item.classList.remove('active')
                        }
                    })
                    var current_link = document.getElementById(`page_${this.page}`);
                    current_link.classList.add('active')
                    this.getPaymentsPaginated()
                }
            })
        },
        changeTo(number){
            this.page = number; 
            var all_links = document.querySelectorAll('.pagination_links')
            all_links.forEach(item => {
                if(item.classList.value.includes('active')){
                    item.classList.remove('active')
                }
            })
            var current_link = document.getElementById(`page_${number}`);
            current_link.classList.add('active')

            this.getPaymentsPaginated()
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
