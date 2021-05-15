<template>
  <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-mb-2">
    <button class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-primary tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-8 tw-py-2"
            @click="openEditSupplierRateModal"
    >
      Change Global Rate
    </button>
  </div>
  <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap" :class="{ 'tw-mb-4' : chosenType }">
    <template v-for="(type, index) in ['Suppliers', 'Accounts', 'Payments']" :key="index">
      <button
              class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-4 tw-py-1 tw-m-2"
              :class="type === chosenType ? 'tw-bg-primary tw-text-white' : 'tw-text-primary'"
              @click="chosenType = type"
      >
        {{ type }}
      </button>
    </template>
  </div>

  <Index v-if="chosenType === 'Suppliers'" :global-rate="supplierRate" />
  <Accounts v-else-if="chosenType === 'Accounts'" />
  <Payments v-else-if="chosenType === 'Payments'" />

  <VModal v-model:visible="modal.visible">
    <form @submit.prevent="updateSupplierRate" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_rate">
            Global Rate
          </label>
          <input id="edit_rate" type="number" min="1" max="100" step=".01" placeholder="Rate"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.rate"
          >
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
import Payments from '@/components/Admin/Suppliers/Payments';
import Index from '@/components/Admin/Suppliers/Index';
import Accounts from '@/components/Admin/Suppliers/Accounts';
import VModal from '@/components/VModal';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';

export default {
  name: 'Admin.Suppliers',
  components: {
    Pagination,
    Payments,
    Index,
    Accounts,
    VModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const chosenType = ref(route.query.page && parseInt(route.query.page) ? 'Suppliers' : null);
    const supplierRate = ref(6);
    const modal = reactive({
      visible: false,
      rate: null,
    });

    store.dispatch('getSupplierRate').then((response) => {
      supplierRate.value = response.data;
      modal.rate = response.data;
    });

    return {
      chosenType,
      supplierRate,
      modal,
      openEditSupplierRateModal,
      updateSupplierRate,
    };

    function openEditSupplierRateModal() {
      modal.visible = true;
      modal.rate = supplierRate.value;
    }

    function updateSupplierRate() {
      store.dispatch('updateSupplierRate', modal.rate).then((response) => {
        modal.visible = false;
        supplierRate.value = response.data;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Global Rate saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors && err.response.data.errors.rate)
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.errors.rate[0],
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
      });
    }
  },
}
</script>