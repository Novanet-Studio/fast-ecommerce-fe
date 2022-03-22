<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Log In Your Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="username"
                    class="ps-text-field"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    placeholder="Usernamer or email"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    type="password"
                    class="ps-text-field"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Please enter password"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-checkbox label="Remember me" color="warning" />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >
                    Login
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
    name: 'Login',
    computed: {
        usernameErrors() {
            const errors = [];
            if(this.username){
                if (!this.$v.username.$dirty) return errors;
                !this.$v.username.required && errors.push('This field is required');
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
            password: null
        };
    },
    validations: {
        username: { required },
        password: { required }
    },
    methods: {
        async handleSubmit() {
            
            this.$v.$touch();
            const user = {
                username: this.username,
                password: this.password
            }
            if (!this.$v.$invalid) {
                var respuesta = await this.$store.dispatch('auth/getUser', user);
                if(respuesta.jwt){
                    this.$store.dispatch('auth/setAuthStatus', true)
                    
                    this.$cookies.set('auth', respuesta, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    });
                    this.$router.push('/');
                    console.log('logeado')
                }else{
                    alert(respuesta.alert)
                    console.log('no esta logeado')
                }
                console.log(respuesta)
            }
        }


    }
};
</script>

<style lang="scss" scoped></style>
