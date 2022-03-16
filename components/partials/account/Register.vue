<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Register An Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="username"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    placeholder="Usario"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    placeholder="Email Address"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Password"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >
                    Register
                </button>
            </div>
        </div>
        <div class="ps-form__footer">
            <p>Connect with:</p>

            <ul class="ps-list--social">
                <li>
                    <a href="#" class="facebook">
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="google">
                        <i class="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="twitter">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="instagram">
                        <i class="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </div>
    </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'Register',
    computed: {
        usernameErrors() {
            const errors = [];
            if(this.username){
                if (!this.$v.username.$dirty) return errors;
                !this.$v.username.required && errors.push('This field is required');
                return errors;
            }
        },
        emailErrors() {
            const errors = [];
            if(this.email){
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.required && errors.push('This field is required');
                return errors;
            }
        },
        passwordErrors() {
            const errors = [];
            if(this.password){
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('This field is required');
                return errors;
            }
        }
    },
    data() {
        return {
            username: null,
            email: null,
            password: null,
        };
    },
    validations: {
        username: { required },
        email: { required },
        password: { required }
    },
    methods: {
        async handleSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const data = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                const respuesta = await this.$store.dispatch('auth/setNewUser', data);
                if(respuesta.jwt){
                    //status usuario loggeado true
                    this.$store.dispatch('auth/setAuthStatus', true)
                    this.$router.push('/');
                    alert('se ha registrado el ausuario')
                }else{
                    alert(respuesta.alert)
                }
                console.log(respuesta);


            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
