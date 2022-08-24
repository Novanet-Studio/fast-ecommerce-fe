import axios from 'axios';

const baseDomain = process.env.STRAPI_URL; // Change your API here

export const customHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
>>>>>>> c2a6b00 (add: environment variable fo content API)
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
  baseUrl,
  headers: customHeaders,
});

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
