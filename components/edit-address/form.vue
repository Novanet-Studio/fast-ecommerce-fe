<template>
  <form class="address-form">
    <header class="address-form__header">
      <h3 class="address-form__title">
        {{ title }}
      </h3>
    </header>
    <div>
      <div class="address-form__group">
        <label class="address-form__label"
          >País<sup class="address-form__required">*</sup></label
        >
        <app-input
          v-model="form.country"
          placeholder="Venezuela"
          :is-error="status.country.isError"
          :error-message="status.country.message"
        />
      </div>
      <div class="address-form__group">
        <label class="address-form__label" for="streetAddress"
          >Dirección<sup class="address-form__required">*</sup>
        </label>
        <app-input
          v-model="form.streetAddress"
          placeholder="Av Fco Miranda, calle solar"
          :is-error="status.streetAddress.isError"
          :error-message="status.streetAddress.message"
        />
      </div>
      <div class="address-form__group">
        <label class="address-form__label" for="state"
          >Estado<sup class="address-form__required">*</sup>
        </label>
        <app-input
          v-model="form.state"
          placeholder="Miranda"
          :is-error="status.state.isError"
          :error-message="status.state.message"
        />
      </div>
      <div class="address-form__group">
        <label class="address-form__label"
          >Código postal<sup class="address-form__required">*</sup>
        </label>
        <app-input
          v-model="form.postcode"
          placeholder="1073"
          :is-error="status.postcode.isError"
          :error-message="status.postcode.message"
        />
      </div>
      <div class="address-form__group-btn">
        <app-button btn-type="submit" text="Guardar" @click="submit" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import {
  getAddressByIdAndType,
  createAdress as CreateAddress,
  updateAddress as UpdateAddress,
} from '~/graphql';

const props = defineProps<{ type: AddressType }>();

const { $store, $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const router = useRouter();

const auth = $store.auth();

const haveLastAddress = ref(false);
const existentId = ref('');

const type = computed(() =>
  [AddressType.Billing, AddressType.Shipping].includes(props.type)
    ? props.type
    : AddressType.None
);

const title = computed(() =>
  type.value === AddressType.Billing
    ? 'Dirección de facturación'
    : 'Dirección de envío'
);

const { form, status, submitter, verify } = useForm({
  form: () => ({
    country: '',
    streetAddress: '',
    state: '',
    postcode: '',
  }),
  rule: {
    country: yupFieldRule(yup.string().required('El campo es obligatorio')),
    streetAddress: yupFieldRule(
      yup.string().required('El campo es obligatorio')
    ),
    state: yupFieldRule(yup.string().required('El campo es obligatorio')),
    postcode: yupFieldRule(yup.string().required('El campo es obligatorio')),
  },
});

const goToAddresses = () => {
  setTimeout(() => {
    router.push('/addresses');
  }, 1000);
};

const createAddress = async (data: any) => {
  await graphql<AddressResponse>(CreateAddress, data);

  $notify({
    group: 'all',
    title: 'Éxito',
    text: 'Dirección creada con éxito',
  });

  goToAddresses();
};

const updateAddress = async (data: any) => {
  if (!existentId.value) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un error',
    });
    return;
  }

  const body = {
    id: existentId.value,
    data: {
      user_id: data.userId,
      address: data.address,
      type: data.type,
    },
  };

  const {
    data: {
      updateAddress: { data: result },
    },
  } = await graphql<UpdateAddressResponse>(UpdateAddress, body);

  if (!result) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un error',
    });
    return;
  }

  $notify({
    group: 'all',
    title: 'Éxito!',
    text: 'La dirección se ha actualizado!',
  });

  goToAddresses();
};

const sendAddress = async (data: object) => {
  if (haveLastAddress.value) {
    updateAddress(data);
    return;
  }

  createAddress(data);
};

const { submit } = submitter(() => {
  if (!verify() || type.value === AddressType.None) return;

  const info = {
    address: form.streetAddress,
    country: form.country,
    city: form.state,
    zipCode: form.postcode,
  };

  const body = {
    type: type.value,
    userId: +auth.user.id,
    address: info,
  };

  sendAddress(body);
});

const getLastAddress = async () => {
  const id = +auth.user.id;
  if (type.value === AddressType.None) return;

  const body = {
    id,
    type: type.value,
  };

  const { data } = await graphql<AddressResponse>(getAddressByIdAndType, body);

  if (!data.addresses.data.length) return;

  const [address] = data.addresses.data;

  haveLastAddress.value = true;
  existentId.value = address.id;
  form.country = address.attributes.address.country;
  form.state = address.attributes.address.city;
  form.streetAddress = address.attributes.address.address;
  form.postcode = address.attributes.address.zipCode;
};

onMounted(() => {
  getLastAddress();
});
</script>
