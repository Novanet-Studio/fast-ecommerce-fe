import axios from 'axios';

import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { baseUrl } from '~/repositories/Repository';

export const state = () => ({
    isLoggedIn: false
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setUser(state, payload){
        state.username = payload.username;
        state.password = payload.password;
    },
    setNewUser(state, payload){
        state.username = payload.username;
        state.email = payload.email;
        state.password = payload.password;
    }
};

export const actions = {
    setAuthStatus({ commit, state }, payload) {
        commit('setIsLoggedIn', payload);
        const cookieParams = {
            isLoggedIn: state.isLoggedIn
        };

        this.$cookies.set('auth', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },
    getUser({commit, state}, payload){
        commit('setUser', payload)
        const response = axios
            .post(`${baseUrl}/auth/local`, {
                identifier: state.username,
                password: state.password,
            })
            .then(response => {
                // Handle success.        
               return response.data;
            })
            .catch(error => {
               // Handle error.
                if(error){
                    var alerta = {
                        alert: 'el username o clave son incorrectos',
                        error: JSON.stringify(error.response)
                    }
                    return alerta;
                }
            });

        return response;
    },
    setNewUser({commit, state}, payload){
        commit('setNewUser', payload);
        const respuesta = axios
            .post(`${baseUrl}/auth/local/register`, {
                username: state.username,
                email: state.email,
                password: state.password,
            })
              .then(response => {
                // Handle success.
                return response.data;
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                if(error){
                    var alerta = {
                        alert: 'el usuario o correo ya existe',
                        error: JSON.stringify(error.response)
                    }
                    return alerta;
                }

              });
        return respuesta;

    }
};
