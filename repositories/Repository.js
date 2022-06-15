import axios from 'axios';

const baseDomain = 'https://farine-be-test.herokuapp.com/api'; // Change your API here
// const baseDomain = 'http://localhost:1337/api'; // Change your API here


export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders
});

export const serializeQuery = query => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
};
