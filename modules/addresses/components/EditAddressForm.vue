<template>
  <form @submit.prevent="onSubmit(handleSave)">
    <div class="mb-8 pb-3 border-b border-b-light-800">
      <h3 class="text-2xl font-semibold text-yellow-400" v-if="type === AddressType.Billing">Dirección de facturación
      </h3>
      <h3 class="text-2xl font-semibold text-yellow-400" v-else>Dirección de envío</h3>
    </div>
    <div>
      <div class="mb-10">
        <label class="mb-6 text-dark-800">País<sup class="ml-1 text-red-500">*</sup></label>
        <the-input v-model="form.country" placeholder="Venezuela" :is-error="status.country.isError"
          :error-message="status.country.message" />
      </div>
      <div class="mb-10">
        <label class="mb-6 text-dark-800" for="streetAddress">Dirección<sup class="ml-1 text-red-500">*</sup> </label>
        <the-input v-model="form.streetAddress" placeholder="Av Fco Miranda, calle solar"
          :is-error="status.streetAddress.isError" :error-message="status.streetAddress.message" />
      </div>
      <div class="mb-10">
        <label class="mb-6 text-dark-800" for="state">Estado<sup class="ml-1 text-red-500">*</sup> </label>
        <the-input v-model="form.state" placeholder="Av Fco Miranda, calle solar" :is-error="status.state.isError"
          :error-message="status.state.message" />
      </div>
      <div class="mb-10">
        <label class="mb-6 text-dark-800">Código postal<sup class="ml-1 text-red-500">*</sup> </label>
        <the-input v-model="form.postcode" placeholder="Av Fco Miranda, calle solar" :is-error="status.postcode.isError"
          :error-message="status.postcode.message" />
      </div>
      <div class="mb-10 md:w-[25%]">
        <the-button btn-type="submit" text="Guardar" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { AddressType } from '~/modules/shared/shared-types';
import { GetAddressByIdAndType, CreateAddress, UpdateAddress } from '../queries';

const props = defineProps<{ type: AddressType }>();

const { $store, $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const router = useRouter();

const auth = $store.auth();

const haveLastAddress = ref(false);
const existentId = ref('');

const type = computed(() =>
  [AddressType.Billing, AddressType.Shipping].includes(props.type) ? props.type : AddressType.None,
)

const { form, status, reset, onSubmit, clearErrors, verify } = useForm({
  form: () => ({
    country: '',
    streetAddress: '',
    state: '',
    postcode: ''
  }),
  rule: {
    country: yupFieldRule(yup.string().required('El campo es obligatorio')),
    streetAddress: yupFieldRule(yup.string().required('El campo es obligatorio')),
    state: yupFieldRule(yup.string().required('El campo es obligatorio')),
    postcode: yupFieldRule(yup.string().required('El campo es obligatorio')),
  }
});

const goToAddresses = () => {
  setTimeout(() => {
    router.push('/addresses');
  }, 500);
}

const createAddress = async (data: any) => {
  const result = await graphql<AddressResponse>(CreateAddress, data);

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
  }

  const { data: { updateAddress: { data: result } } } = await graphql<UpdateAddressResponse>(UpdateAddress, body);

  if (!result) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un error'
    });
    return;
  }

  $notify({
    group: 'all',
    title: 'Éxito!',
    text: 'La dirección se ha actualizado!'
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

const handleSave = () => {
  if (!verify() || type.value === AddressType.None) return;

  const info = {
    address: form.streetAddress,
    country: form.country,
    city: form.state,
    zipCode: form.postcode,
  };

  const body = {
    type: type.value,
    userId: auth.user.id,
    address: info,
  }

  sendAddress(body);
}

const getLastAddress = async () => {
  const id = auth.user.id;
  if (type.value === AddressType.None) return;

  const body = {
    id,
    type: type.value,
  };

  const { data } = await graphql<AddressResponse>(GetAddressByIdAndType, body);

  if (!data.addresses.data.length) return;

  const [address] = data.addresses.data;

  haveLastAddress.value = true;
  existentId.value = address.id;
  form.country = address.attributes.address.country;
  form.state = address.attributes.address.city;
  form.streetAddress = address.attributes.address.address;
  form.postcode = address.attributes.address.zipCode;
}

onMounted(() => {
  getLastAddress();
});
</script>
