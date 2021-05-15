<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <router-link :to="{ name: 'Home' }">
      <img alt="logo" src="@/assets/images/Logo.png">
    </router-link>
    <form @submit.prevent="resetPassword" class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-10 tw-py-12">
      <div class="tw-mb-6">
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
      <div class="tw-mb-6">
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
      <button v-if="! isResetting" class="tw-w-full tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 tw-py-1 focus:tw-outline-none" type="submit">
        Reset
      </button>

      <div v-else class="tw-flex tw-justify-center tw-items-center tw-border tw-border-primary tw-bg-primary tw-rounded-full" style="padding: 11px 0">
        <LoopingRhombusesSpinner
            :animation-duration="2500"
            :rhombus-size="10"
            color="white"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { LoopingRhombusesSpinner } from "epic-spinners";
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, toRef } from "vue";

export default {
  name: 'ResetPassword',
  title: 'Reset Password',
  components: {
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isResetting = ref(false);
    const auth = reactive({
      password: '',
      confirmPassword: '',
    });

    if (route.query.token) {
      store.dispatch('checkForgotPasswordToken', route.query.token).then(() => {
        auth.token = route.query.token;
      }).catch(() => {
        store.dispatch('addNotification', {
          type: 'error',
          message: 'Expired or invalid token',
        });

        router.push({ name: 'Home' });
      });
    } else {
      store.dispatch('addNotification', {
        type: 'error',
        message: 'Token not found',
      });

      router.push({ name: 'Home' });
    }

    const errors = ref({});

    const rules = {
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('', 'password'),
      },
    };

    const v$ = useVuelidate(rules, {
      password: toRef(auth, 'password'),
      confirmPassword: toRef(auth, 'confirmPassword'),
    });

    const resetPassword = () => {
      v$.value.$touch();

      if (v$.value.confirmPassword.sameAsPassword.$invalid && auth.password === auth.confirmPassword) {
        v$.value.confirmPassword.$reset();
      }

      if (v$.value.$invalid  || ! auth.token) {
        return;
      }

      isResetting.value = true;
      errors.value = {};

      store.dispatch('resetPassword', auth).then(() => {
        isResetting.value = false;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Password has been reset successfully.'
        });

        router.push({ name: 'Login' });
      }).catch((err) => {
        isResetting.value = false;

        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: 'Token has expired!'
            });

            router.push({ name: 'Home' });
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
      isResetting,
      auth,
      errors,
      resetPassword,
      resetErrors,
    }
  },
}
</script>