import {
  PhFacebookLogo,
  PhInstagramLogo,
  PhWhatsappLogo,
  PhEnvelope,
} from '@phosphor-icons/vue';

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
        icon: PhInstagramLogo,
        text: '@fastecommerce',
      },
      {
        link: 'https://www.facebook.com/people/coracuero',
        icon: PhFacebookLogo,
        text: 'fast-ecommerce',
      },
      {
        link: '#',
        icon: PhWhatsappLogo,
        text: '+58 412-12315654',
      },
      {
        link: '#',
        icon: PhEnvelope,
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
