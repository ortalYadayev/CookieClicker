<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <router-link :to="{ name: 'Home' }">
      <img alt="logo" src="@/assets/images/Logo.png">
    </router-link>
    <div class="tw-w-full tw-max-w-2xl tw-text-lg tw-text-center tw-mx-auto tw-mb-4">
      If you have forgotten your password and would like to reset it, you can fill out this form and receive instructions by email on how to reset your password.
    </div>
    <form @submit.prevent="forgotPassword" class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-10 tw-py-12">
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="email">
          Email
        </label>
        <input id="email" type="text" placeholder="Email"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.email"
               :class="{ 'input-invalid tw-mb-3' : v$.email.$invalid || errors.email }"
               @keydown="resetErrors('email')"
        >
        <p v-if="v$.email.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.email.$errors[0].$message }}
        </p>
        <p v-else-if="errors.email" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.email[0] }}
        </p>
      </div>
      <div class="tw-flex tw-flex-col">
        <button v-if="! isRequesting" class="tw-w-full tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 tw-py-1 focus:tw-outline-none" type="submit">
          Send Request
        </button>

        <div v-else class="tw-flex tw-justify-center tw-items-center tw-border tw-border-primary tw-bg-primary tw-rounded-full" style="padding: 11px 0">
          <LoopingRhombusesSpinner
              :animation-duration="2500"
              :rhombus-size="10"
              color="white"
          />
        </div>

        <transition name="slide-down">
          <button v-if="! isEmailVerified" @click="sendEmailVerification" class="tw-duration-300 tw-mt-4 tw-text-center tw-inline-block tw-align-baseline tw-font-bold tw-text-sm tw-text-primary" type="button">
            Email Verification
          </button>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import router from "@/router";
import { useStore } from 'vuex';
import { ref, reactive, toRef } from "vue";

export default {
  name: 'ForgotPassword',
  title: 'Forgot Password',
  components: {
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const isRequesting = ref(false);
    const isEmailVerified = ref(true);
    const auth = reactive({
      email: '',
    });

    const errors = ref({});

    const rules = {
      email: {
        required,
        email,
      },
    };

    const v$ = useVuelidate(rules, { email: toRef(auth, 'email') });

    const forgotPassword = () => {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      isRequesting.value = true;

      store.dispatch('forgotPassword', auth).then(() => {
        isRequesting.value = false;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Password reset request sent to email.',
        });

        router.push({ name: 'Home' });
      }).catch((err) => {
        isRequesting.value = false;

        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            isEmailVerified.value = false;

            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        }
      });
    }

    const sendEmailVerification = () => {
      store.dispatch('resendEmailVerification', auth.email).then(() => {
        isEmailVerified.value = true;

        store.dispatch('addNotification', {
          type: 'success',
          message: `We have successfully sent an email to ${auth.email}`
        });
      }).catch((err) => {
        if (err.response.status !== 422) {
          return;
        }

        if (err.response.data.errors) {
          store.dispatch('addNotification', {
            type: 'error',
            message: 'Email could not be found',
          });
        } else {
          isEmailVerified.value = true;

          store.dispatch('addNotification', {
            type: 'info',
            message: 'Email is already verified',
          });
        }
      });
    }

    const resetErrors = (key) => {
      v$.value[key].$reset();
      delete errors.value[key];
    }

    return {
      v$,
      isRequesting,
      isEmailVerified,
      auth,
      errors,
      forgotPassword,
      sendEmailVerification,
      resetErrors,
    }
  },
}
</script>

<style scoped>
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-37px);
  opacity: 0;
}
</style>