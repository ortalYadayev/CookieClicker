<template>
  <div class="full-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Username</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Rate</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Total Earned</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Available Earnings</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Total Withdrawn</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="suppliersObj.suppliers" v-for="(supplier, index) in suppliersObj.suppliers" :key="index" class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="supplier.username" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="'$' + supplier.formatted_robux_rate" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="'$' + supplier.formatted_accounts_total_earnings" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="'$' + supplier.formatted_accounts_available_earnings" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="'$' + supplier.formatted_total_supplier_withdrawals" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="openEditModal(supplier)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2">
                <fa-icon icon="cog" />
              </button>
              <router-link :to="{ name: 'Supplier', query: { tab: 'accounts', supplier: supplier.id, back: page } }" class="tw-w-8 tw-h-8 tw-flex tw-justify-center tw-items-center tw-duration-300 tw-bg-gray-300 tw-text-green-500 tw-rounded-full hover:tw-text-white hover:tw-bg-green-500">
                <fa-icon :icon="['far', 'eye']" />
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! suppliersObj.suppliers" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="suppliersObj.pagination" v-model="page" :records="suppliersObj.pagination.total" :per-page="suppliersObj.pagination.per_page" @paginate="getSuppliers" :options="{ chunk: 5, edgeNavigation: true }" />
  <VModal v-model:visible="modal.visible">
    <form @submit.prevent="editRate" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4" :class="{ 'sm:tw-w-1/2 sm:tw-pr-2' : modal.rate_type === 'custom' }">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="rate_type">
            Rate Type
          </label>
          <select v-model="modal.rate_type" @change="modal.robux_rate = null" id="rate_type"
                  class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none"
                  style="height: 38px"
          >
            <option value="global" selected>
              Global Rate
            </option>
            <option value="custom">
              Custom Rate
            </option>
          </select>
        </div>
        <div v-if="modal.rate_type === 'custom'" class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_rate">
            Rate
          </label>
          <input id="edit_rate" type="number" min="1" max="100" step=".01" placeholder="Rate"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.robux_rate"
                 :class="{ 'input-invalid tw-mb-3' : v$.robux_rate.$invalid || errors.robux_rate }"
                 @keydown="resetErrors('robux_rate')"
          >
          <p v-if="v$.robux_rate.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v$.robux_rate.$errors[0].$message }}
          </p>
          <p v-else-if="errors.robux_rate" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.robux_rate[0] }}
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
import { requiredIf, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import router from '@/router';
import { ref, reactive, toRef, watch } from 'vue';

export default {
  name: 'Admin.SuppliersIndex',
  components: {
    Pagination,
    VModal,
    LoopingRhombusesSpinner,
  },
  props: {
    globalRate: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();

    const suppliersObj = ref({});
    const page = ref(route.query.page && parseInt(route.query.page) ? parseInt(route.query.page) : 1);

    if (route.query.page) {
      router.replace({ ...router.currentRoute, query: { tab: 'suppliers' }});
    }

    const modal = reactive({
      supplier: null,
      visible: false,
      rate_type: 'global',
      robux_rate: null,
    });

    const errors = ref({});

    const rules = {
      robux_rate: {
        requiredIf: requiredIf(() => modal.rate_type === 'custom'),
        minValue: minValue(1),
        maxValue: maxValue(100),
      },
    };

    const v$ = useVuelidate(rules, {
      robux_rate: toRef(modal, 'robux_rate'),
    });

    watch(() => modal.visible, () => {
      errors.value = {};
      v$.value.$reset();
    });

    watch(() => props.globalRate, () => {
      if (suppliersObj.value.suppliers) {
        suppliersObj.value.suppliers.forEach((supplier) => {
          if (! supplier.robux_rate) {
            supplier.formatted_robux_rate = props.globalRate;
          }
        });
      }
    });

    getSuppliers();

    return {
      suppliersObj,
      page,
      modal,
      errors,
      v$,
      getSuppliers,
      openEditModal,
      editRate,
      resetErrors,
    };

    function getSuppliers() {
      delete suppliersObj.value.suppliers;

      store.dispatch('getSuppliers', page.value).then((response) => {
        suppliersObj.value = response.data;

        if (suppliersObj.value.pagination.last_page < page.value) {
          page.value = 1;

          getSuppliers();
        }
      });
    }

    function openEditModal(supplier) {
      modal.supplier = supplier;
      modal.visible = true;
      modal.rate_type = supplier.robux_rate ? 'custom' : 'global';
      modal.robux_rate = supplier.robux_rate ? supplier.formatted_robux_rate : null;
    }

    function editRate() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      const payload = {
        supplier_id: modal.supplier.id,
        robux_rate: modal.robux_rate,
      };

      store.dispatch('updateSupplier', payload).then((response) => {
        modal.visible = false;
        modal.supplier.robux_rate = response.data.robux_rate;
        modal.supplier.formatted_robux_rate = response.data.formatted_robux_rate;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Rate saved successfully!',
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