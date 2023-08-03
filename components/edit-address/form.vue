<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string, minLength, nonNullable, any } from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';
import countries from '~/data/countries.json';

type Form = {
  country: string;
  streetAddress: string;
  state: string;
  postcode: string;
}

const props = defineProps<{ type: AddressType }>();
const auth = useAuthStore();
const checkout = useCheckoutStore();

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

const schema = toTypedSchema(
  object({
    country: nonNullable(any()),
    streetAddress: string([minLength(1, 'Este campo es requerido')]),
    state: string([minLength(1, 'Este campo es requerido')]),
    postcode: string([minLength(1, 'Este campo es requerido')]),
  })
)

const { handleSubmit, defineComponentBinds, setValues, errors } = useForm<Form>({
  validationSchema: schema,
});

const country = defineComponentBinds('country');

const sendAddress = async (data: Record<string, string>) => {
  if (haveLastAddress.value) {
    checkout.updateAddress(existentId.value, data);
    return;
  }

  checkout.createAddress(data);
};

const submit = handleSubmit((data) => {
  if (type.value === AddressType.None) return;

  const info = {
    address: data.streetAddress,
    country: data.country,
    city: data.state,
    zipCode: data.postcode,
  };

  const body = {
    type: type.value,
    userId: +auth.user.id,
    address: info,
  };

  sendAddress(body as unknown as Record<string, string>);
});

const getLastAddress = async () => {
  const id = Number(auth.user.id);
  const address = await checkout.getAddress({ userId: id, type: type.value });

  if (!address) return;

  haveLastAddress.value = true;
  existentId.value = address.id;

  setValues({
    country: address.attributes.address.country,
    state: address.attributes.address.city,
    streetAddress: address.attributes.address.address,
    postcode: address.attributes.address.zipCode,
  });
};

onMounted(() => {
  getLastAddress();
});
</script>

<template>
  <form class="address-form">
    <header class="address-form__header">
      <h3 class="address-form__title">
        {{ title }}
      </h3>
    </header>
    <div>
      <div class="address-form__group">
        <label class="address-form__label">País<sup class="address-form__required">*</sup></label>
        <app-select v-bind="country" label="name" value-key="code" :options="countries"
          placeholder="Selecciona una opcion" :error="!!errors.country" :error-message="errors.country" />
      </div>
      <div class="address-form__group">
        <label class="address-form__label" for="streetAddress">Dirección<sup class="address-form__required">*</sup>
        </label>
        <app-input name="streetAddress" placeholder="Av Fco Miranda, calle solar" />
      </div>
      <div class="address-form__group">
        <label class="address-form__label" for="state">Estado<sup class="address-form__required">*</sup>
        </label>
        <app-input name="state" placeholder="Miranda" />
      </div>
      <div class="address-form__group">
        <label class="address-form__label">Código postal<sup class="address-form__required">*</sup>
        </label>
        <app-input name="postcode" placeholder="1073" />
      </div>
      <div class="address-form__group-btn">
        <app-button type="submit" @click="submit">Guardar</app-button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.address-form {
  @apply;
}

.address-form__header {
  @apply mb-8 pb-3 border-b border-b-light-800;
}

.address-form__title {
  @apply text-2xl font-semibold text-color-2;
}

.address-form__group {
  @apply mb-10;
}

.address-form__label {
  @apply mb-6 text-dark-800;
}

.address-form__required {
  @apply ml-1 text-red-500;
}

.address-form__group-btn {
  @apply mb-10 md: w-[25%];
}
</style>
