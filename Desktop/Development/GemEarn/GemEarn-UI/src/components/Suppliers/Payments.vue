<template>
  <div v-if="paymentsObj.hasOwnProperty('available_earnings') && paymentsObj.hasOwnProperty('total_earnings') && paymentsObj.hasOwnProperty('total_withdrawals')" class="tw-text-center tw-flex tw-flex-wrap tw-justify-center sm:tw-flex-no-wrap tw-mb-4">
    <div class="stats-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4">
      <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-6">
        Total Earnings
      </div>
      <div class="tw-flex tw-justify-center tw-items-center">
        <span class="tw-text-primary tw-font-medium tw-text-2xl">
          $
        </span>
        <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ paymentsObj.total_earnings }}
        </span>
      </div>
    </div>
    <div class="stats-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mt-4 sm:tw-mt-0">
      <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-6">
        Total Withdrawn
      </div>
      <div class="tw-flex tw-justify-center tw-items-center">
        <span class="tw-text-primary tw-font-medium tw-text-2xl">
          $
        </span>
        <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ paymentsObj.total_withdrawals }}
        </span>
      </div>
    </div>
    <div class="stats-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 tw-mt-4 sm:tw-mt-0">
      <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-6">
        Available Earnings
      </div>
      <div class="tw-flex tw-justify-center tw-items-center">
        <span class="tw-text-primary tw-font-medium tw-text-2xl">
          $
        </span>
        <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ paymentsObj.available_earnings }}
        </span>
      </div>
    </div>
  </div>

  <div v-if="! supplier.not_authenticated" class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="create">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="method">
              Method
            </label>
            <select v-model="payload.method" id="method"
                    class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none"
                    :class="{ 'input-invalid tw-mb-3' : v$.method.$invalid || errors.method }"
                    @change="payload.destination = null; resetErrors('method'); resetErrors('destination')"
                    style="height: 38px"
            >
              <option value="paypal" selected>
                PayPal
              </option>
              <option value="bitcoin">
                Bitcoin
              </option>
            </select>
            <p v-if="v$.method.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.method.$errors[0].$message }}
            </p>
            <p v-else-if="errors.method" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.method[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="destination">
              {{ payload.method === 'paypal' ? 'PayPal Email' : 'Bitcoin Address' }}
            </label>
            <input id="destination" type="text" :placeholder="payload.method === 'paypal' ? 'PayPal Email' : 'Bitcoin Address'"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.destination"
                   :class="{ 'input-invalid tw-mb-3' : v$.destination.$invalid || errors.destination }"
                   @keydown="resetErrors('destination')"
            >
            <p v-if="v$.destination.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.destination.$errors[0].$message }}
            </p>
            <p v-else-if="errors.destination" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.destination[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-px-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="value">
              Amount
            </label>
            <input id="value" type="number" min="5" step=".01" placeholder="Amount"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.value"
                   :class="{ 'input-invalid tw-mb-3' : v$.value.$invalid || errors.value }"
                   @keydown="resetErrors('value')"
            >
            <p v-if="v$.value.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.value.$errors[0].$message }}
            </p>
            <p v-else-if="errors.value" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.value[0] }}
            </p>
          </div>
          <div class="tw-w-full tw-text-center">
            <button class="tw-h-full tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="full-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Date</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Method</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Destination</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Amount</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Status</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Note</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="paymentsObj.payments" v-for="(payment, index) in paymentsObj.payments" :key="index"  class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="payment.id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="payment.formatted_created_at" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="payment.formatted_method" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="payment.destination" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="'$' + payment.formatted_value" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3">
            <div class="tw-text-xs tw-rounded-xl tw-text-white tw-font-bold tw-text-center tw-inline-block tw-w-20 tw-px-4 tw-py-1"
                 :class="{
                    'tw-bg-green-500' : payment.status === 'paid',
                    'tw-bg-red-500' : payment.status === 'denied',
                    'tw-bg-gray-500' : payment.status === 'pending',
                 }"
            >
              {{ payment.formatted_status }}
            </div>
          </td>
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="payment.denial_reason" />
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! paymentsObj.payments" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="paymentsObj.pagination" v-model="page" :records="paymentsObj.pagination.total" :per-page="paymentsObj.pagination.per_page" @paginate="getSupplierPayments" :options="{ chunk: 5, edgeNavigation: true }" />
</template>

<script>
import Pagination from 'v-pagination-3';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Supplier.Payments',
  components: {
    Pagination,
    LoopingRhombusesSpinner,
  },
  props: {
    supplier: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();

    const isCreating = ref(false);
    const paymentsObj = ref({});
    const page = ref(1);
    const payload = reactive({
      method: 'paypal',
      destination: '',
      value: null,
    });

    const errors = ref({});

    const rules = {
      method: {
        required,
      },
      destination: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      value: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(10000),
      },
    };

    const v$ = useVuelidate(rules, {
      method: toRef(payload, 'method'),
      destination: toRef(payload, 'destination'),
      value: toRef(payload, 'value'),
    });

    getSupplierPayments();

    return {
      paymentsObj,
      page,
      payload,
      errors,
      v$,
      getSupplierPayments,
      create,
      resetErrors,
    };

    function getSupplierPayments() {
      delete paymentsObj.value.payments;

      const payload = {
        page: page.value,
        user_id: props.supplier.id
      }

      store.dispatch('getSupplierPayments', payload).then((response) => {
        paymentsObj.value = response.data;
      });
    }

    function create() {
      v$.value.$touch();

      if (v$.value.$invalid || isCreating.value) {
        return;
      }

      errors.value = {};
      isCreating.value = true;

      store.dispatch('storeSupplierPayment', payload).then((response) => {
        v$.value.$reset();

        payload.method = 'paypal';
        payload.destination = '';
        payload.value = null;
        paymentsObj.value.payments.unshift(response.data.payment);
        paymentsObj.value.pagination.total++;
        paymentsObj.value.total_earnings = response.data.total_earnings;
        paymentsObj.value.total_withdrawals = response.data.total_withdrawals;
        paymentsObj.value.available_earnings = response.data.available_earnings;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Payment submitted successfully!',
        });

        isCreating.value = false;
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

        isCreating.value = false;
      });
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>

<style scoped>
.stats-card {
  min-height: 150px;
}

@media (min-width: 1024px) {
  .stats-card {
    max-width: 300px;
  }
}
</style>
