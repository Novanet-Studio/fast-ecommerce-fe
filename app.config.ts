import {
  PhFacebookLogo,
  PhInstagramLogo,
  PhWhatsappLogo,
  PhEnvelope,
} from '@phosphor-icons/vue';

export default defineAppConfig({
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
});
