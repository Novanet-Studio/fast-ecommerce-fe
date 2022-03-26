import axios from 'axios';

const baseApiSquare = 'https://connect.squareupsandbox.com'; 

export const headerSquare = {
    timeout:3000,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + process.env.SQUARE_ACCESS_TOKEN,
    'Square-Version': '2022-03-16',
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    "Access-Control-Allow-Origin": "*",
};

export const baseUrl = `${baseApiSquare}`;

export default axios.create({
    baseUrl,
    headers: headerSquare
});
