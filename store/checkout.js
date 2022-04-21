import axios from 'axios';

import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { baseUrl } from '~/repositories/Repository';

export const mutations = {
    setShippingInfo(state, payload){
        state.email = payload.email;
        state.name = payload.name;
        state.lastName = payload.lastName;
        state.address = payload.address;
        state.home = payload.home;
        state.city = payload.city;
        state.zipCode = payload.zipCode;
    },


}

export const actions = {
    shippingInfo({commit, state}, payload){
        commit('setShippingInfo', payload)

        const cookieParams = {
            email: state.email,
            name: state.name,
            lastName: state.lastName,
            address: state.address,
            home: state.home,
            city: state.city,
            zipCode: state.zipCode,
        }
        this.$cookies.set('shippingInfo', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    async invoiceInfo({commit}, payload){
        const id = payload
        const response = await Repository.get(`${baseUrl}/invoices/${id}`)
            .then(response => {
                return response.data
            })
            .catch(error => ({ error: JSON.stringify(error) }));

        return response;
    },
    async getAllInvoices({commit}, payload){
        const userId = payload
        const response = await Repository.get(`${baseUrl}/invoices?user_id=${userId}`)
            .then(response => {
                return response.data
            })
            .catch(error => ({ error: JSON.stringify(error) }));

        return response;
    },

    async createInvoice({commit},payload){

        const response = await Repository.post(`${baseUrl}/invoices`, payload)
            .then(response => {
                return response
            })
            .catch(error => ({ error: JSON.stringify(error) }));

        return response;
    },

    async setAddress({commit}, payload){
        const response = await Repository.post(`${baseUrl}/addresses`, payload)
            .then(response => {
                return response
            })
            .catch(error => ({ error: JSON.stringify(error) }));

        return response;
    }
   

}