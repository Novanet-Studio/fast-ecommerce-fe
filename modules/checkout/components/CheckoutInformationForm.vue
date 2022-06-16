<template>
  <div>
    <!-- ps-form__heading -->
    <h3 class="font-semibold mb-3 text-yellow-300 text-2xl">
      Información de contacto
    </h3>
    <form>
      <div class="mb-4 md:mb-10">
        <label class="mb-6 text-dark-800">Email<sup class="ml-1 text-red-500">*</sup></label>
        <the-input v-model="form.email" placeholder="john@doe.com" :is-error="status.email.isError"
          :error-message="status.email.message" />
      </div>

      <div class="flex flex-col justify-between md:flex-row">
        <div class="flex-[0_0_100%] gap-4 md:flex-[0_0_calc(50%-1rem)]">
          <div class="mb-4 md:mb-10">
            <label class="mb-6 text-dark-800">Nombre</label>
            <the-input v-model="form.name" placeholder="John" :is-error="status.name.isError"
              :error-message="status.name.message" />
          </div>
        </div>
        <div class="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)]">
          <div class="mb-4 md:mb-10">
            <label class="mb-6 text-dark-800">Apellido</label>
            <the-input v-model="form.lastName" placeholder="Doe" :is-error="status.lastName.isError"
              :error-message="status.lastName.message" />
          </div>
        </div>
      </div>

      <h3 class="font-semibold mb-8 text-yellow-300 text-2xl md:mb-3">
        Informacion de envio
      </h3>

      <div class="mb-4 md:mb-10">
        <label class="mb-6 text-dark-800">Dirección</label>
        <the-input v-model="form.address" placeholder="Venezuela, dto capital" :is-error="status.address.isError"
          :error-message="status.address.message" />
      </div>
      <div class="mb-4 md:mb-10">
        <label class="mb-6 text-dark-800">Apartamento</label>
        <the-input v-model="form.home" placeholder="Apartamento nro 12" :is-error="status.home.isError"
          :error-message="status.home.message" />
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="mb-4 lg:mb-6">
          <label class="mb-6 text-dark-800">Ciudad</label>
          <the-input v-model="form.city" placeholder="Caracas" :is-error="status.city.isError"
            :error-message="status.city.message" />
        </div>
        <div class="mb-4 lg:mb-6">
          <label class="mb-6 text-dark-800">Código Postal</label>
          <the-input v-model="form.zipCode" placeholder="1073" :is-error="status.zipCode.isError"
            :error-message="status.zipCode.message" />
        </div>
        <div class="mb-4 md:mb-10">
          <label class="mb-6 text-dark-800">Numero de contacto</label>
          <the-input v-model="form.phone" placeholder="04122349782" :is-error="status.phone.isError"
            :error-message="status.phone.message" />
        </div>
      </div>

      <div class="mb-0 md:(mb-10 w-[25%])">
        <the-button btn-type="submit" text="Continuar" @click="onSubmit(handleToShipping)" />
      </div>
      <!-- <div class="ps-form__submit">
        <div class="ps-block__footer">
          <button class="ps-btn" @click.prevent="onSubmit(handleToShipping)">
            Continuar
          </button>
        </div>
      </div> -->
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { GetAddressByIdAndType } from '~/modules/addresses/queries';
import { AddressType } from '~/modules/shared/shared-types';


const { $store, $helpers } = useNuxtApp();
const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = $store.auth();
const checkout = $store.checkout();

const { form, status, onSubmit, verify } = useForm({
  form: () => ({
    name: '',
    lastName: '',
    email: '',
    address: '',
    home: '',
    city: '',
    zipCode: '',
    phone: '',
  }),
  rule: {
    name: yupFieldRule(yup.string().required('El campo es obligatorio')),
    lastName: yupFieldRule(yup.string().required('El campo es obligatorio')),
    email: [
      yupFieldRule(yup.string().required('El campo es obligatorio')),
      yupFieldRule(yup.string().email('Formato de email inválido')),
    ],
    address: yupFieldRule(yup.string().required('El campo es obligatorio')),
    home: yupFieldRule(yup.string().required('El campo es obligatorio')),
    city: yupFieldRule(yup.string().required('El campo es obligatorio')),
    zipCode: yupFieldRule(yup.string().required('El campo es obligatorio')),
    phone: yupFieldRule(yup.string().required('El campo es obligatorio')),
  },
  defaultMessage: '',
});

const fillFormFromStorage = () => {
  if (!checkout.email) return;

  form.email = checkout.email;
  form.name = checkout.name;
  form.lastName = checkout.lastName;
}

const fillFormFromStrapiShippingData = async () => {
  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Shipping,
    };

    // TODO: add typings for address response
    const { data } = await graphql<unknown[]>(GetAddressByIdAndType, body) as any;

    if (!data?.length) return;

    const response = data[0].attributes.address;

    Object.assign(form, response);

    // form.address = response.address;
    // form.city = response.city;
    // form.zipCode = response.zipcode;
    // form.phone = response.phone;
    // form.home = response.home;
    // form.country = response.country;
  } catch (err) {
    console.log(err);
  }
}

const handleToShipping = async () => {
  if (!verify()) return;

  const data = { ...form };
  checkout.shippingInfo(data);

  router.push('/shipping');
}

onMounted(() => {
  fillFormFromStorage();
  fillFormFromStrapiShippingData();
});
</script>
