export default {
  head: {
    titleTemplate: "Martfury - Multi-purpose Ecomerce template with vuejs",
    title: "Martfury - Multi-purpose Ecomerce template with vuejs",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "Martfury - Multipurpose Marketplace Vuejs Ecommerce Template",
      },
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext",
      },
    ],
    script: [
      {
        type: "module",
        src: "https://sandbox.web.squarecdn.com/v1/square.js",
      },
    ],
  },
  env: {
    //Must match the values found in the corresponding production or sandbox environment
    SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
    SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
  },

  css: [
    "swiper/dist/css/swiper.css",
    "~/static/fonts/Linearicons/Font/demo-files/demo.css",
    "~/static/fonts/fontawesome/css/fontawesome.css",
    "~/static/fonts/fontawesome/css/brands.css",
    "~/static/fonts/fontawesome/css/regular.css",
    "~/static/fonts/fontawesome/css/solid.css",
    "~/static/css/bootstrap.min.css",
    "~/assets/scss/style.scss",
  ],

  plugins: [
    { src: "~plugins/vueliate.js", ssr: false },
    { src: "~/plugins/swiper-plugin.js", ssr: false },
    { src: "~/plugins/vue-notification.js", ssr: false },
    { src: "~/plugins/axios.js", ssr: false },
    { src: "~/plugins/lazyLoad.js", ssr: false },
    { src: "~/plugins/http.js", ssr: false },
    { src: "~/plugins/firebase.js", ssr: false },
    { src: "~/plugins/vue-html2pdf", mode: "client" },
    { src: "~/plugins/lodash.js" },
  ],

  buildModules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/style-resources",
    "cookie-universal-nuxt",
  ],

  styleResources: {
    scss: "./assets/scss/env.scss",
  },

  modules: [
    "@nuxtjs/axios",
    "nuxt-i18n",
    "@nuxtjs/proxy",
    "@nuxt/http",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyB3pU_zCM7DaYkmZq2_9_TNUnRCTqPgRxs",
          authDomain: "farine-square-service.firebaseapp.com",
          projectId: "farine-square-service",
          storageBucket: "farine-square-service.appspot.com",
          messagingSenderId: "191699462649",
          appId: "1:191699462649:web:172b66bef6401b24d1b528",
        },
        services: {
          functions: true,
        },
        functions: {
          location: "us-central1",
          emulatorPort: 12345,
          emulatorHost: "http://10.10.10.3",
        },
      },
    ],
  ],

  i18n: {
    locales: [
      { code: "en", file: "en.json" },
      { code: "es", file: "es.json" },
      { code: "fr", file: "fr.json" },
    ],
    lazy: true,
    defaultLocale: "en",
    langDir: "lang/locales/",
  },

  router: {
    linkActiveClass: "",
    linkExactActiveClass: "active",
  },

  server: {
    port: 4002,
    host: "localhost",
  },

  axios: {
    credentials: false,
    proxyheaders: false,
  },
};
