<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <router-link :to="{ name: 'Home' }">
      <img alt="logo" src="@/assets/images/Logo.png">
    </router-link>
    <form @submit.prevent="login" class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-10 tw-py-12">
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
          Username
        </label>
        <input id="username" type="text" placeholder="Username"
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
          <template v-if="errors.username[0] === 'The selected username is invalid.'">
            This username doesn't exist on GemEarn!
            <router-link :to="{ name: 'Register' }" class="tw-text-primary tw-underline">Click here</router-link>
            to create an account.
          </template>
          <template v-else>
            {{ errors.username[0] }}
          </template>
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
      </div>
      <div v-if="auth.two_factor_code !== null" class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="two_factor_code">
          Two Factor Code
        </label>
        <input id="two_factor_code" type="text" placeholder="123456"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.two_factor_code"
               :class="{ 'input-invalid tw-mb-3' : v$.two_factor_code.$invalid || errors.two_factor_code }"
               @keydown="resetErrors('two_factor_code')"
        >
        <p v-if="v$.two_factor_code.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.two_factor_code.$errors[0].$message }}
        </p>
        <p v-else-if="errors.two_factor_code" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.two_factor_code[0] }}
        </p>
      </div>
      <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <button v-if="! isLogging" class="tw-w-1/3 tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1 focus:tw-outline-none" type="submit">
          Login
        </button>

        <div v-else class="tw-w-1/3 tw-flex tw-justify-center tw-items-center tw-border tw-border-primary tw-bg-primary tw-rounded-full" style="padding: 11px 0">
          <LoopingRhombusesSpinner
              :animation-duration="2500"
              :rhombus-size="10"
              color="white"
          />
        </div>

        <router-link :to="{ name: 'ForgotPassword' }" class="tw-inline-block tw-align-baseline tw-font-bold tw-text-sm tw-text-primary">
          Forgot Password?
        </router-link>
        <router-link :to="{ name: 'Register' }" class="tw-w-full tw-mt-4 tw-text-center tw-font-bold tw-text-sm tw-text-primary">
          You don't have an account yet?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { required, minLength, maxLength, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import router from "@/router";
import { useStore } from 'vuex';
import { ref, reactive, toRef } from "vue";

export default {
  name: 'Login',
  title: 'Login',
  components: {
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const isLogging = ref(false)
    const isInvalidUsername = ref(false)
    const auth = reactive({
      username: '',
      password: '',
      two_factor_code: null,
    });

    const errors = ref({});

    const rules = {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
        valid: helpers.regex(/^\w+$/u),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      two_factor_code: {
        minLength: minLength(6),
        maxLength: maxLength(6),
      },
    };

    const v$ = useVuelidate(rules, {
      username: toRef(auth, 'username'),
      password: toRef(auth, 'password'),
      two_factor_code: toRef(auth, 'two_factor_code'),
    });

    const login = () => {
      v$.value.$touch();

      if (! v$.value.username.$invalid && (auth.username.match(/_/g) || []).length > 1) {
        isInvalidUsername.value = true;
        return;
      }

      if (v$.value.$invalid) {
        return;
      }

      isLogging.value = true;

      store.dispatch('login', auth).then(() => {
        isLogging.value = false;

        router.push({ name: 'Home' });
      }).catch((err) => {
        isLogging.value = false;

        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else if (err.response.data.message === '2FA-CODE') {
            if (auth.two_factor_code === null) {
              auth.two_factor_code = '';

              store.dispatch('addNotification', {
                message: 'You have received an email which contains two factor login code.',
              });
            } else {
              errors.value = {
                'two_factor_code': ['Incorrect 2FA code!'],
              }
            }
          } else {
            errors.value = {
              'password': [err.response.data.message],
            }
          }
        } else if (err.response.status === 403) {
          if (err.response.data.message === '2FA') {
            auth.two_factor_code = '';

            store.dispatch('addNotification', {
              message: 'You have received an email which contains two factor login code.',
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        }
      });
    }

    const resetErrors = (key) => {
      v$.value[key].$reset();
      delete errors.value[key];
    }

    return {
      v$,
      isLogging,
      isInvalidUsername,
      auth,
      errors,
      login,
      resetErrors,
    }
  },
}
</script>