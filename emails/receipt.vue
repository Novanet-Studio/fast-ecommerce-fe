<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  preview?: string;
  header?: HeaderTemplate;
  body?: BodyTemplate;
  footer?: FooterTemplate;
  theme?: {
    primary: string;
    primaryTop: string;
    secondary: string;
    secondaryInfo: string;
    foreground: string;
    info: string;
  };
}

interface HeaderTemplate {
  icon: {
    url: string;
    alt: string;
  };
  contact: {
    instagram: string;
    phone: string;
    email: string;
  };
}

interface BodyTemplate {
  customer: string;
  email: string;
  orderId: string;
  table: Table;
  payed: string;
  date: string;
}

interface FooterTemplate {
  cta: {
    text: string;
    link: string;
  };
  /**
   * Object with the needed social networks
   * @example
   * social: [
   *   {
   *      icon: 'https://raw.githubcontent/project/icon/png'
   *      link: '@mybussiness'
   *   }
   * ]
   */
  social?: Record<string, string>[];
  copyright: {
    text: string;
    location: string;
  };
}

interface Column {
  /**
   * Header of the column
   * @example
   * header: 'Product'
   *
   * */
  header: string;
  /**
   * Key of the column
   * @example
   * key: 'product'
   */
  key: string;
}

interface Table {
  columns: Column[];
  /**
   * Data of the table
   * @example
   * data: [
   *   {
   *     product: 'Product 1',
   *     price: 50
   *   },
   * ]
   */
  data: Record<string, any>[];
}

const props = withDefaults(defineProps<Props>(), {
  preview: 'Tienda en Mano - Recibo de compra',
  header: () => ({
    icon: {
      url: 'https://raw.githubusercontent.com/Novanet-Studio/tem-core/main/static/email/favicon.png',
      alt: 'Novanet Logo',
    },
    contact: {
      email: 'temdemo@gmail.com',
      instagram: '@temdemo',
      phone: '0412.123.4567',
    },
  }),
  footer: () => ({
    cta: {
      link: 'https://tem-demo.netlify.app/',
      text: 'Ir a la tienda',
    },
    social: [
      {
        icon: 'https://raw.githubusercontent.com/Novanet-Studio/tem-core/main/static/email/x.png',
        link: '#',
      },
      {
        icon: 'https://raw.githubusercontent.com/Novanet-Studio/tem-core/main/static/email/facebook.png',
        link: '#',
      },
      {
        icon: 'https://raw.githubusercontent.com/Novanet-Studio/tem-core/main/static/email/whatsapp.png',
        link: '#',
      },
    ],
    copyright: {
      text: '© 2023 TeM',
      location: 'Caracas, Venezuela',
    },
  }),
});

const headers = props.body?.table.columns.map((col) => col.header);
const newKeys = props.body?.table.columns.map((col) => col.key);
const newValues = props.body?.table.data.map((row) => row);

const items = computed(() => {
  return newValues?.map((v: any) => {
    const items: string[] = [];

    newKeys?.forEach((k) => {
      items.push(v[k]);
    });

    return items;
  });
});

function getFirstUppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<template>
  <ETailwind
    :config="{
      theme: {
        extend: {
          colors: {
            primary: theme?.primary || '#001e61',
            'primary-top': theme?.primaryTop || '#193470',
            secondary: theme?.secondary || '#f18a00',
            'secondary-info': theme?.secondaryInfo || '#ffffff',
            foreground: theme?.foreground || '#efeef1',
            info: theme?.info || '#acb5cb',
          },
        },
      },
    }"
  >
    <EHtml>
      <EHead />
      <EPreview>{{ preview }}</EPreview>
      <EBody class="bg-foreground font-sans">
        <EContainer class="max-w-[580px] mx-auto my-8 bg-white">
          <ESection class="w-full flex">
            <ERow>
              <EColumn class="h-3 bg-primary-top w-[249px]" />
              <EColumn class="h-3 bg-primary-top w-[102px]" />
              <EColumn class="h-3 bg-primary-top w-[249px]" />
            </ERow>
          </ESection>
          <ESection class="bg-[#001e61] w-full">
            <ERow class="max-w-[200px] w-[114px] mx-auto block">
              <EColumn align="center">
                <EImg
                  class="mt-3"
                  width="114"
                  :src="header.icon.url"
                  :alt="header.icon.alt"
                />
              </EColumn>
            </ERow>
          </ESection>
          <ESection class="w-full bg-[#001e61]">
            <ERow class="mb-2 mx-auto">
              <EColumn align="center">
                <EText class="my-0 text-info mt-2"
                  ><b>Instagram</b> {{ header.contact.instagram }}</EText
                >
                <EText class="my-0 text-info"
                  ><b>Teléfono</b> {{ header.contact.phone }}</EText
                >
                <EText class="my-0 text-info mb-4"
                  ><b>Email</b> {{ header.contact.email }}</EText
                >
              </EColumn>
            </ERow>
          </ESection>
          <ESection>
            <EText class="font-bold text-[#80817f] text-sm mb-1" align="center"
              >¡Gracias por su compra!</EText
            >
            <EText class="font-bold text-[#80817f] text-xs my-1" align="center"
              >Recibo de compra</EText
            >
            <EText class="font-bold text-[#80817f] text-xs" align="center">{{
              body?.date
            }}</EText>
          </ESection>
          <ESection class="max-w-[480px] mx-auto mb-8">
            <EText class="text-[#80817f] text-sm my-1" align="left"
              ><b>Cliente: </b> {{ body?.customer }}</EText
            >
            <EText class="text-[#80817f] text-sm my-1" align="left"
              ><b>Email: </b> {{ body?.email }}</EText
            >
            <EText class="text-[#80817f] text-sm my-1" align="left"
              ><b>Orden: </b> {{ body?.orderId }}</EText
            >
          </ESection>
          <ESection class="mt-4">
            <ERow
              class="max-w-[450px] mx-auto border-none border-b border-t border-solid border-b-black"
            >
              <EColumn
                class="w-[150px]"
                v-for="(key, index) in headers"
                :key="index"
              >
                <EText align="center">
                  <span class="font-bold">{{ getFirstUppercase(key) }}</span>
                </EText>
              </EColumn>
            </ERow>
            <ERow
              class="max-w-[450px] mx-auto border-b border-solid border-b-black/20"
              v-for="(item, index) in items"
              :key="index"
            >
              <EColumn
                class="w-[150px]"
                v-for="(_, index) in newKeys"
                :key="index"
              >
                <EText class="text-center">{{ item[index] }}</EText>
              </EColumn>
            </ERow>
          </ESection>

          <ESection
            class="py-4 bg-secondary max-w-[450px] mx-auto my-8 rounded-md"
          >
            <ERow>
              <EText
                class="text-base font-bold text-secondary-info"
                align="center"
                ><span class="uppercase font-extrabold text-base">total</span>
                ${{ body?.payed }}</EText
              >
            </ERow>
          </ESection>
        </EContainer>

        <ESection class="max-w-[580px] mx-auto">
          <ERow class="mb-5">
            <EColumn align="center" class="w-full mx-auto">
              <ELink
                class="underline text-gray-600"
                :href="footer.cta.link"
                target="_blank"
                >{{ footer.cta.text }}</ELink
              >
            </EColumn>
          </ERow>
          <ERow>
            <EColumn align="center" class="w-full">
              <ELink
                :href="item.link"
                v-for="(item, index) in footer.social"
                :key="index"
              >
                <EImg
                  width="30"
                  class="inline-block first:mrl-0 mx-2 last:mr-0"
                  :src="item.icon"
                />
              </ELink>
            </EColumn>
          </ERow>
          <EText class="text-center text-[#706a7b]">
            {{ footer.copyright.text }} <br />
            {{ footer.copyright.location }}
          </EText>
        </ESection>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
