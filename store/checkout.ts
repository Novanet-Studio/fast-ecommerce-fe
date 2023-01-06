import { defineStore } from 'pinia';

type ShippingInfo = {
  email?: string;
  name?: string;
  lastName?: string;
  address?: string;
  home?: string;
  city?: string;
  zipCode?: string;
};

export const useCheckout = defineStore('checkout', {
  state: () => ({
    email: '',
    name: '',
    lastName: '',
    address: '',
    home: '',
    city: '',
    zipCode: '',
    phone: '',
  }),
  getters: {
    fullName() {
      return `${this.name} ${this.lastName}`;
    },
    fullAddress() {
      return `${this.address}, ${this.city}, ${this.zipCode}`;
    },
  },
  actions: {
    shippingInfo(info: ShippingInfo) {
      this.email = info.email;
      this.name = info.name;
      this.lastName = info.lastName;
      this.address = info.address;
      this.home = info.home;
      this.city = info.city;
      this.zipCode = info.zipCode;
    },
    async invoiceInfo(id: string) {
      // get invoice by id from database and return response
      return { id, invoice: 'xxxxxx' };
    },
    async getInvoicesList(userId: string) {
      // get all invoices of the current user from database
      return {
        data: [
          {
            attributes: {
              id_invoice_user: 1,
              date: new Date().toLocaleDateString(),
              createdAt: new Date().toLocaleDateString(),
              paid: true,
              amount: 20,
              status: '',
            },
          },
        ],
      };
    },
    async createInvoice(data: any) {
      // create invoice and return response
      return {};
    },
    async setAddress(address: any) {
      // const response = await Repository.post(`${baseUrl}/addresses`, payload)
      //   .then((response) => {
      //     return response;
      //   })
      //   .catch((error) => ({ error: JSON.stringify(error) }));

      // return response;
      return 'address added';
    },
    async updateAddress(address: any) {
      // const addId = payload.addId;
      // const data = payload.data;
      // const response = await Repository.put(
      //   `${baseUrl}/addresses/${addId}`,
      //   data
      // )
      //   .then((response) => {
      //     return response;
      //   })
      //   .catch((error) => ({ error: JSON.stringify(error) }));

      // return response;
      return { id: 1, address: 'xxx xxx xxxxxx xx' };
    },

    async getAddress({ userId, type }: { userId: string; type: string }) {
      // const userId = payload.userId;
      // const type = payload.type;

      // const response = await Repository.get(
      //   `${baseUrl}/addresses?populate=*&filters[user_id]=${userId}&filters[type]=${type}`
      // )
      //   .then((response) => {
      //     return response.data.data;
      //   })
      //   .catch((error) => ({ error: JSON.stringify(error) }));

      // return response;
      return { id: 1, address: 'xxx xxx xxxxxx xx' };
    },
  },
});
