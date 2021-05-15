<template>
  <div class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="create">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="currency">
              Currency
            </label>
            <input id="currency" type="text" placeholder="Currency" autocomplete="off"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.currency"
                   :class="{ 'input-invalid tw-mb-3' : v$.currency.$invalid || ! modal.visible && errors.currency }"
                   @keydown="resetErrors('currency')"
            >
            <p v-if="v$.currency.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.currency.$errors[0].$message }}
            </p>
            <p v-else-if="! modal.visible && errors.currency" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.currency[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="name">
              Name
            </label>
            <input id="name" type="text" placeholder="Name" autocomplete="off"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.name"
                   :class="{ 'input-invalid tw-mb-3' : v$.name.$invalid || ! modal.visible && errors.name }"
                   @keydown="resetErrors('name')"
            >
            <p v-if="v$.name.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.name.$errors[0].$message }}
            </p>
            <p v-else-if="! modal.visible && errors.name" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.name[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="symbol">
              Symbol
            </label>
            <input id="symbol" type="text" placeholder="Symbol" autocomplete="off"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.symbol"
                   :class="{ 'input-invalid tw-mb-3' : v$.symbol.$invalid || ! modal.visible && errors.symbol }"
                   @keydown="resetErrors('symbol')"
            >
            <p v-if="v$.symbol.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.symbol.$errors[0].$message }}
            </p>
            <p v-else-if="! modal.visible && errors.symbol" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.symbol[0] }}
            </p>
          </div>
        </div>
        <div class="tw-w-full tw-text-center">
          <button class="tw-h-full tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="full-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Currency</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40 ">Name</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Symbol</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="currenciesObj.currencies" v-for="(currency, index) in currenciesObj.currencies" :key="index"  class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="currency.currency" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="currency.name" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="currency.symbol" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="openEditModal(currency)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2">
                <fa-icon icon="cog" />
              </button>
              <button @click="destroy(currency)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500">
                <fa-icon :icon="['far', 'trash-alt']" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! currenciesObj.currencies" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="currenciesObj.pagination" v-model="page" :records="currenciesObj.pagination.total" :per-page="currenciesObj.pagination.per_page" @paginate="getCurrencies" :options="{ chunk: 5, edgeNavigation: true }" />
  <VModal v-model:visible="modal.visible">
    <form @submit.prevent="edit" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_currency">
            Currency
          </label>
          <input id="edit_currency" type="text" placeholder="Currency"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.currency"
                 :class="{ 'input-invalid tw-mb-3' : v2$.currency.$invalid || errors.currency }"
                 @keydown="resetErrors('currency')"
          >
          <p v-if="v2$.currency.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v2$.currency.$errors[0].$message }}
          </p>
          <p v-else-if="errors.currency" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.currency[0] }}
          </p>
        </div>
        <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_name">
            Name
          </label>
          <input id="edit_name" type="text" placeholder="Name"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.name"
                 :class="{ 'input-invalid tw-mb-3' : v2$.name.$invalid || errors.name }"
                 @keydown="resetErrors('name')"
          >
          <p v-if="v2$.name.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v2$.name.$errors[0].$message }}
          </p>
          <p v-else-if="errors.name" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.name[0] }}
          </p>
        </div>
      </div>
      <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
        <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_symbol">
          Symbol
        </label>
        <input id="edit_symbol" type="text" placeholder="Symbol"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="modal.symbol"
               :class="{ 'input-invalid tw-mb-3' : v2$.symbol.$invalid || errors.symbol }"
               @keydown="resetErrors('symbol')"
        >
        <p v-if="v2$.symbol.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v2$.symbol.$errors[0].$message }}
        </p>
        <p v-else-if="errors.symbol" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.symbol[0] }}
        </p>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
  </VModal>
</template>

<script>
import dayjs from "dayjs";
import Pagination from 'v-pagination-3';
import VModal from '@/components/VModal';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { Roles } from '@/_helpers/roles';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef, watch } from 'vue';

export default {
  name: 'Admin.Currencies',
  components: {
    Pagination,
    VModal,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const currenciesObj = ref({});
    const page = ref(1);
    const payload = reactive({
      currency: '',
      name: '',
      symbol: '',
    });
    const modal = reactive({
      currencyObj: null,
      visible: false,
      currency: '',
      name: '',
      symbol: '',
    });

    const errors = ref({});

    const rules = {
      currency: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(3),
      },
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
      symbol: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(4),
      },
    };

    const v$ = useVuelidate(rules, {
      currency: toRef(payload, 'currency'),
      name: toRef(payload, 'name'),
      symbol: toRef(payload, 'symbol'),
    });

    const v2$ = useVuelidate(rules, {
      currency: toRef(modal, 'currency'),
      name: toRef(modal, 'name'),
      symbol: toRef(modal, 'symbol'),
    });

    watch(() => modal.visible, () => {
      errors.value = {};
      v$.value.$reset();
      v2$.value.$reset();
    });

    getCurrencies();

    return {
      Roles,
      currenciesObj,
      page,
      payload,
      modal,
      errors,
      v$,
      v2$,
      getCurrencies,
      openEditModal,
      destroy,
      create,
      edit,
      resetErrors,
    };

    function getCurrencies() {
      delete currenciesObj.value.currencies;

      store.dispatch('getCurrencies', page.value).then((response) => {
        currenciesObj.value = response.data;
      });
    }

    function openEditModal(currency) {
      modal.currencyObj = currency;
      modal.visible = true;
      modal.currency = currency.currency;
      modal.name = currency.name;
      modal.symbol = currency.symbol;
    }

    function destroy(currency) {
      store.dispatch('deleteCurrency', currency.id).then(() => {
        currenciesObj.value.currencies.splice(currenciesObj.value.currencies.indexOf(currency), 1);
        currenciesObj.value.pagination.total--;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Currency removed successfully!',
        });

        if (page.value > 1 && currenciesObj.value.pagination.total <= 10) {
          page.value = 1;

          getCurrencies();
        }
      });
    }

    function create() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      store.dispatch('storeCurrency', payload).then((response) => {
        v$.value.$reset();

        payload.currency = '';
        payload.name = '';
        payload.symbol = '';
        currenciesObj.value.currencies.unshift(response.data);
        currenciesObj.value.pagination.total++;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Currency created successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data.errors) {
          errors.value = err.response.data.errors;
        }
      });
    }

    function edit() {
      v2$.value.$touch();

      if (v2$.value.$invalid) {
        return;
      }

      errors.value = {};

      const payload = {
        currency_id: modal.currencyObj.id,
        currency: modal.currency,
        name: modal.name,
        symbol: modal.symbol,
      };

      store.dispatch('updateCurrency', payload).then((response) => {
        modal.visible = false;
        modal.currencyObj.currency = response.data.currency;
        modal.currencyObj.name = response.data.name;
        modal.currencyObj.symbol = response.data.symbol;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Currency saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data.errors) {
          errors.value = err.response.data.errors;
        }
      });
    }

    function resetErrors(key) {
      (modal.visible ? v2$ : v$).value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>
