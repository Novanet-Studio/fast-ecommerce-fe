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
        <app-custom-select
          v-model="form.country"
          label="name"
          value-key="code"
          :options="countries"
          placeholder="Selecciona una opcion"
          :error="status.country.isError"
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
import { AddressType } from '~/types';
import countries from '~/data/countries.json';

const props = defineProps<{ type: AddressType }>();

const { $store } = useNuxtApp();

const auth = $store.auth();
const checkout = $store.checkout();

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

const sendAddress = async (data: Record<string, string>) => {
  if (haveLastAddress.value) {
    checkout.updateAddress(existentId.value, data);
    return;
  }

  checkout.createAddress(data);
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

  sendAddress(body as unknown as Record<string, string>);
});

const getLastAddress = async () => {
  const id = +auth.user.id;
  const address = await checkout.getAddress({ userId: id, type: type.value });

  if (!address) return;

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
