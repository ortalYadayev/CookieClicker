<template>
  <div class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="saveCredentials">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="wallet-id">
              Wallet ID
            </label>
            <input id="wallet-id" type="text" placeholder="Wallet ID"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.guid"
                   :class="{ 'input-invalid tw-mb-3' : v$.guid.$invalid || errors.guid }"
                   @keydown="resetErrors('guid')"
            >
            <p v-if="v$.guid.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.guid.$errors[0].$message }}
            </p>
            <p v-else-if="errors.guid" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.guid[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="password">
              Main Password
            </label>
            <input id="password" type="password" placeholder="Password"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.password"
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
          <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pl-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="stock_amount">
              Stock Amount
            </label>
            <input id="stock_amount" type="number" min="0" placeholder="Stock Amount"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.stock_amount"
                   :class="{ 'input-invalid tw-mb-3' : v$.stock_amount.$invalid || errors.stock_amount }"
                   @keydown="resetErrors('stock_amount')"
            >
            <p v-if="v$.stock_amount.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.stock_amount.$errors[0].$message }}
            </p>
            <p v-else-if="errors.stock_amount" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.stock_amount[0] }}
            </p>
          </div>
        </div>
        <div class="tw-w-full tw-text-center">
          <button class="tw-h-full tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Admin.Bitcoin',
  setup() {
    const store = useStore();

    const payload = reactive({
      guid: '',
      password: '',
      stock_amount: null,
    });

    const errors = ref({});

    const rules = {
      guid: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      stock_amount: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(999999),
      },
    };

    const v$ = useVuelidate(rules, {
      guid: toRef(payload, 'guid'),
      password: toRef(payload, 'password'),
      stock_amount: toRef(payload, 'stock_amount'),
    });

    getBitcoinCredentials();

    return {
      payload,
      errors,
      v$,
      saveCredentials,
      resetErrors,
    };

    function getBitcoinCredentials() {
      store.dispatch('getBitcoinCredentials').then((response) => {
        if (! response.data) {
          return;
        }

        payload.guid = response.data.guid;
        payload.password = response.data.password;
        payload.stock_amount = response.data.stock_amount;
      });
    }

    function saveCredentials() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      store.dispatch('updateBitcoinCredentials', payload).then(() => {
        store.dispatch('addNotification', {
          type: 'success',
          message: 'Credentials saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        }
      });
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>