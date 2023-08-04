<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string, minLength, email, any } from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';
import { GetAddressByIdAndType } from '~/graphql/queries';
import countries from '~/data/countries.json';

type Form = {
  name: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  home: string;
  city: string;
  zipCode: string;
  phone: string;
}

const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = useAuthStore();
const checkout = useCheckoutStore();

const schema = toTypedSchema(
  object({
    name: string([minLength(1, 'Este campo es requerido')]),
    lastName: string([minLength(1, 'Este campo es requerido')]),
    email: string([minLength(1, 'Este campo es requerido'), email('Formato de correo no valido')]),
    address: string([minLength(1, 'Este campo es requerido')]),
    country: any(),
    home: string([minLength(1, 'Este campo es requerido')]),
    city: string([minLength(1, 'Este campo es requerido')]),
    zipCode: string([minLength(1, 'Este campo es requerido')]),
    phone: string([minLength(1, 'Este campo es requerido')]),
  })
)

const { setValues, handleSubmit, defineComponentBinds, errors } = useForm<Form>({
  validationSchema: schema,
});

const country = defineComponentBinds('country')

const submit = handleSubmit(async (data) => {
  checkout.shippingInfo(data);
  router.push('/shipping');
});

const fillFormFromStorage = () => {
  if (auth.user.email) {
    setValues({
      email: auth.user.email,
    });
  }

  if (auth.user.email !== checkout.email) {
    checkout.reset();
    checkout.email = auth.user.email as string;
    return;
  }

  if (!checkout.email) return;

  setValues({
    email: checkout?.email || '',
    name: checkout?.name || '',
    lastName: checkout?.lastName || '',
  });

  if (!checkout.saveInformation) return;

  setValues({
    address: checkout.address || '',
    home: checkout.home || '',
    city: checkout.city || '',
    zipCode: checkout.zipCode || '',
    phone: checkout.phone || '',
  });
};

const fillFormFromStrapiShippingData = async () => {
  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Shipping,
    };

    const { data } = (await graphql<AddressRequest>(
      GetAddressByIdAndType,
      body
    )) as any;

    if (!data?.addresses?.data.length) return;

    const response = data?.addresses?.data[0]?.attributes.address;

    setValues({
      ...response,
    });

  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fillFormFromStrapiShippingData();
  fillFormFromStorage();
});
</script>

<template>
  <div>
    <h3 class="title">Información de contacto</h3>
    <form>
      <div class="form__group">
        <label class="form__label">Email<sup class="form__required">*</sup></label>
        <app-input name="email" placeholder="correo@mail.com" />
      </div>

      <div class="form__container">
        <div class="form__left">
          <div class="form__group">
            <label class="form__label">Nombre</label>
            <app-input name="name" placeholder="Juan" />
          </div>
        </div>
        <div class="form__right">
          <div class="form__group">
            <label class="form__label">Apellido</label>
            <app-input name="lastName" placeholder="Pérez" />
          </div>
        </div>
      </div>

      <h3 class="form__title">Informacion de envio</h3>

      <div class="form__group">
        <label class="form__label">Dirección</label>
        <app-input name="address" placeholder="Av. Principal con calle Secundaria" />
      </div>
      <div class="form__group">
        <label class="form__label">Apartamento</label>
        <app-input name="home" placeholder="11E" />
      </div>

      <div class="form__group">
        <label class="form__label">Pais</label>
        <app-select v-bind="country" label="name" value-key="code" :options="countries"
          placeholder="Selecciona una opcion" :error="!!errors.country" :error-message="errors.country" />
      </div>

      <div class="form__grid">
        <div class="form__group-alt">
          <label class="form__label">Ciudad</label>
          <app-input name="city" placeholder="Caracas" />
        </div>
        <div class="form__group-alt">
          <label class="form__label">Código Postal</label>
          <app-input name="zipCode" placeholder="1050" />
        </div>
        <div class="form__group">
          <label class="form__label">Numero de contacto</label>
          <app-input name="phone" placeholder="04120000102" />
        </div>
      </div>

      <div class="form__group">
        <app-checkbox label="Guardar informacion" v-model="checkout.saveInformation" />
      </div>

      <div class="form__btn-group">
        <app-button type="submit" @click="submit">Continuar</app-button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.title {
  @apply font-semibold mb-3 text-color-2 text-2xl;
}

.form__title {
  @apply font-semibold mb-8 text-color-2 text-2xl md: mb-3;
}

.form__group-alt {
  @apply mb-4 lg: mb-6;
}

.form__container {
  @apply flex flex-col justify-between md: flex-row;
}

.form__grid {
  @apply grid grid-cols-1 gap-4 md: grid-cols-2;
}

.form__left {
  @apply flex-[0_0_100%] gap-4 md: flex-[0_0_calc(50%-1rem)];
}

.form__right {
  @apply flex-[0_0_100%] md: flex-[0_0_calc(50%-1rem)];
}
</style>
