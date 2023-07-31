export default defineAppConfig({
  header: {
    logo: 'logo.png',
  },
  footer: {
    copyright: {
      site: 'fast-ecommerce.com',
    },
    widgets: [
      {
        link: 'https://www.instagram.com/coracuero/',
        icon: 'i-ph-instagram-logo-light',
        text: '@fastecommerce',
      },
      {
        link: 'https://www.facebook.com/people/coracuero',
        icon: 'i-ph-facebook-logo-light',
        text: 'fast-ecommerce',
      },
      {
        link: '#',
        icon: 'i-ph-whatsapp-logo-light',
        text: '+58 412-12315654',
      },
      {
        link: '#',
        icon: 'i-ph-envelope-simple-logo-light',
        text: 'fast@ecommerce.com',
      },
    ],
  },
  home: {
    slider: ['/img/home/1.jpg', '/img/home/2.jpg'],
    promotions: ['/img/home/promotion-1.jpeg'],
  },
  about: {
    slider: ['/img/home/3.jpg', '/img/home/2.jpg'],
  },
});
