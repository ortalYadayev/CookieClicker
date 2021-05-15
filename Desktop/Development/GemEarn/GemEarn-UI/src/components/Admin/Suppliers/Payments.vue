<template>
  <div class="full-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Supplier</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Method</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Destination</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Amount</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Status</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Note</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="paymentsObj.payments" v-for="(payment, index) in paymentsObj.payments" :key="index" class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="payment.id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="payment.supplier_user.username" />
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
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="openEditModal(payment)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2">
                <fa-icon icon="cog" />
              </button>
            </div>
          </td>
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
  <VModal v-model:visible="modal.visible">
    <form @submit.prevent="editStatus" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4" :class="{ 'sm:tw-w-1/2 sm:tw-pr-2' : modal.status === 'denied' }">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="status">
            Status
          </label>
          <select v-model="modal.status" @change="modal.denial_reason = null" id="status"
                  class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none"
                  style="height: 38px"
          >
            <option value="pending" selected>
              Pending
            </option>
            <option value="paid">
              Paid
            </option>
            <option value="denied">
              Denied
            </option>
          </select>
        </div>
        <div v-if="modal.status === 'denied'" class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="denial_reason">
            Denial Reason
          </label>
          <input id="denial_reason" type="text" placeholder="Denial Reason" autocomplete="off"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.denial_reason"
                 :class="{ 'input-invalid tw-mb-3' : v$.denial_reason.$invalid || errors.denial_reason }"
                 @keydown="resetErrors('denial_reason')"
          >
          <p v-if="v$.denial_reason.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v$.denial_reason.$errors[0].$message }}
          </p>
          <p v-else-if="errors.denial_reason" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.denial_reason[0] }}
          </p>
        </div>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
  </VModal>
</template>

<script>
import Pagination from 'v-pagination-3';
import VModal from '@/components/VModal';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import useVuelidate from '@vuelidate/core';
import { required, requiredIf, minLength, maxLength } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef, watch } from 'vue';

export default {
  name: 'Admin.SuppliersPayments',
  components: {
    Pagination,
    VModal,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const paymentsObj = ref({});
    const page = ref(1);
    const modal = reactive({
      visible: false,
      account: null,
      status: 'paid',
      denial_reason: null,
    });

    const errors = ref({});

    const rules = {
      status: {
        requiredIf: required,
        minLength: minLength(1),
        maxLength: maxLength(255),
      },
      denial_reason: {
        requiredIf: requiredIf(() => modal.status === 'denied'),
        minLength: minLength(1),
        maxLength: maxLength(255),
      },
    };

    const v$ = useVuelidate(rules, {
      status: toRef(modal, 'status'),
      denial_reason: toRef(modal, 'denial_reason'),
    });

    watch(() => modal.visible, () => {
      errors.value = {};
      v$.value.$reset();
    });

    getSupplierPayments();

    return {
      paymentsObj,
      page,
      modal,
      errors,
      v$,
      getSupplierPayments,
      openEditModal,
      editStatus,
      resetErrors,
    };

    function getSupplierPayments() {
      delete paymentsObj.value.payments;

      console.log(page.value)

      store.dispatch('getSupplierPayments', { page: page.value }).then((response) => {
        paymentsObj.value = response.data;
      });
    }

    function openEditModal(account) {
      modal.account = account;
      modal.visible = true;
      modal.status = account.status;
      modal.denial_reason = account.denial_reason;
    }

    function editStatus() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      const payload = {
        supplier_payment_id: modal.account.id,
        status: modal.status,
        denial_reason: modal.denial_reason,
      };

      store.dispatch('updateSupplierPaymentStatus', payload).then((response) => {
        modal.visible = false;
        modal.account.status = response.data.status;
        modal.account.formatted_status = response.data.formatted_status;
        modal.account.denial_reason = response.data.denial_reason;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Status saved successfully!',
        });
      }).catch((err) => {
        store.dispatch('addNotification', {
          type: 'error',
          message: 'Error occurred!',
        });

        if (err.response.status === 422 && err.response.data.errors) {
          errors.value = err.response.data.errors;
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
