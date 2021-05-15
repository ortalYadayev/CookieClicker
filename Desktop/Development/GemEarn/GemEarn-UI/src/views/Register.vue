<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <router-link :to="{ name: 'Home' }">
      <img alt="logo" src="@/assets/images/Logo.png">
    </router-link>
    <form @submit.prevent="openHcaptcha" class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-10 tw-py-12">
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="email">
          Email
        </label>
        <input id="email" type="text" placeholder="Email" autocomplete="off"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.email"
               :class="{ 'input-invalid tw-mb-3' : v$.email.$invalid || errors.email }"
               @keydown="resetErrors('email')"
               @keydown.space.prevent
        >
        <p v-if="v$.email.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.email.$errors[0].$message }}
        </p>
        <p v-else-if="errors.email" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.email[0] }}
        </p>
      </div>
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
          Username
        </label>
        <input id="username" type="text" placeholder="Username" autocomplete="off"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.username"
               :class="{ 'input-invalid tw-mb-3' : isInvalidUsername || v$.username.$invalid || errors.username }"
               @keydown="resetErrors('username'); isInvalidUsername = false"
               @keydown.space.prevent
        >
        <p v-if="isInvalidUsername || v$.username.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ isInvalidUsername || v$.username.$errors[0].$validator === 'valid' ? 'Usernames may only contain letters, numbers, and at most one underscore.' : v$.username.$errors[0].$message }}
        </p>
        <p v-else-if="errors.username" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.username[0] }}
        </p>
      </div>
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="password">
          Password
        </label>
        <input id="password" type="password" placeholder="******************"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.password"
               :class="{ 'input-invalid tw-mb-3' : v$.password.$invalid || errors.password }"
               @keydown="resetErrors('password')"
        >
        <p v-if="v$.password.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.password.$errors[0].$message }}
        </p>
        <p v-else-if="errors.password" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.password[0] }}
        </p>
        <p v-else class="tw-duration-300 tw-text-xs tw-italic tw-mt-3">
          We recommend using a unique password for your GemEarn account
        </p>
      </div>
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="confirmPassword">
          Confirm Password
        </label>
        <input id="confirmPassword" type="password" placeholder="******************"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.confirmPassword"
               :class="{ 'input-invalid tw-mb-3' : v$.confirmPassword.$invalid }"
               @keydown="resetErrors('confirmPassword')"
        >
        <p v-if="v$.confirmPassword.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          <template v-if="v$.confirmPassword.sameAsPassword.$invalid">
            Passwords must be identical
          </template>
          <template v-else>
            {{ v$.confirmPassword.$errors[0].$message }}
          </template>
        </p>
      </div>
      <div class="tw-flex tw-mb-4">
        <label class="tw-flex tw-items-center tw-text-xs">
            <input v-model="auth.tos_accepted"
                   type="checkbox"
                   class="tw-h-5 tw-w-5 tw-duration-300 tw-form-checkbox tw-text-primary"
                   :class="{ 'tw-form-checkbox-invalid' : v$.tos_accepted.$invalid }"
                   @change="resetErrors('tos_accepted')"
            >
            <span class="tw-ml-2">
              I have read and agree to the
              <a href="/terms" target="_blank" class="tw-text-primary tw-underline">
                Terms of Service
              </a>
              and
              <a href="/privacy" target="_blank" class="tw-text-primary tw-underline">
                Privacy Policy
              </a>
          </span>
        </label>
      </div>
      <div class="tw-flex tw-flex-col">
        <button v-if="! isRegistering" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 tw-py-1 focus:tw-outline-none" type="submit">
          Register
        </button>

        <div v-else class="tw-flex tw-justify-center tw-items-center tw-border tw-border-primary tw-bg-primary tw-rounded-full" style="padding: 11px 0">
          <LoopingRhombusesSpinner
              :animation-duration="2500"
              :rhombus-size="10"
              color="white"
          />
        </div>

        <VueHcaptcha :sitekey="sitekey"
                     @verify="register"
                     @opened="isRegistering = false"
                     size="invisible"
                     ref="hcaptcha"
        />

        <router-link :to="{ name: 'Login' }" class="tw-mt-4 tw-text-center tw-inline-block tw-align-baseline tw-font-bold tw-text-sm tw-text-primary">
          You already have an account?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { LoopingRhombusesSpinner } from 'epic-spinners';
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';
import { required, minLength, maxLength, email, sameAs, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import router from "@/router";
import { useStore } from 'vuex';
import { reactive, ref, toRef } from "vue";

export default {
  name: 'Register',
  title: 'Register',
  components: {
    LoopingRhombusesSpinner,
    VueHcaptcha,
  },
  setup() {
    const store = useStore();

    const sitekey = ref(process.env.VUE_APP_HCAPTCHA_SITEKEY);
    const hcaptcha = ref(null)
    const isRegistering = ref(false)
    const isInvalidUsername = ref(false)
    const auth = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      referral_token: localStorage.getItem('ref_id') || null,
      tos_accepted: false,
    });

    const errors = ref({});

    const rules = {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
        valid: helpers.regex(/^\w+$/u),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('', 'password'),
      },
      tos_accepted: {
        required,
        checked: (value) => value === true,
      },
    };

    const v$ = useVuelidate(rules, {
      username: toRef(auth, 'username'),
      email: toRef(auth, 'email'),
      password: toRef(auth, 'password'),
      confirmPassword: toRef(auth, 'confirmPassword'),
      tos_accepted: toRef(auth, 'tos_accepted'),
    });

    const register = () => {
      isRegistering.value = true;
      errors.value = {};

      store.dispatch('register', auth).then(() => {
        isRegistering.value = false;
        localStorage.removeItem('ref_id');

        router.push({ name: 'Home' });
      }).catch((err) => {
        isRegistering.value = false;

        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            errors.value = {
              'password': [err.response.data.message],
            }
          }
        } else if (err.response.status === 403) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          })
        }
      });
    }

    const openHcaptcha = () => {
      v$.value.$touch();

      if (v$.value.confirmPassword.sameAsPassword.$invalid && auth.password === auth.confirmPassword) {
        v$.value.confirmPassword.$reset();
      }

      if (! v$.value.username.$invalid && (auth.username.match(/_/g) || []).length > 1) {
        isInvalidUsername.value = true;
        return;
      }

      if (v$.value.$invalid) {
        return;
      }

      isRegistering.value = true;
      hcaptcha.value.execute()
    }

    const resetErrors = (key) => {
      v$.value[key].$reset();
      delete errors.value[key];
    }

    return {
      v$,
      sitekey,
      hcaptcha,
      isRegistering,
      isInvalidUsername,
      auth,
      errors,
      register,
      openHcaptcha,
      resetErrors,
    }
  },
}
</script>