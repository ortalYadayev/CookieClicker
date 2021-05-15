<template>
  <div v-if="! isLoading">
    <div v-if="supplier.not_authenticated">
      <div class="tw-flex tw-justify-center tw-items-center tw-font-medium tw-text-2xl lg:tw-text-3xl tw-tracking-wider tw-mb-4">
        <div>
          {{ supplier.username }}
        </div>

        <router-link :to="{ name: 'Admin', query: { tab: 'suppliers', page: backPage } }" class="tw-w-8 tw-h-8 tw-flex tw-justify-center tw-items-center tw-bg-gray-300 hover:tw-text-secondary hover:tw-bg-primary tw-duration-300 tw-text-primary tw-rounded-full tw-text-sm tw-ml-2">
          <fa-icon class="tw-h-6 fa-w-20" icon="undo-alt" />
        </router-link>
      </div>
    </div>

    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md">
        <Tabs @changedRoute="getSupplier" class="tw-min-h-12 tw-w-full">
          <Tab name="Accounts" query="accounts">
            <Accounts :supplier="supplier" />
          </Tab>
          <Tab v-if="$store.getters.isRoleSupplier || supplier.not_authenticated" name="Payments" query="payments">
            <Payments :supplier="supplier" />
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>

  <div v-else class="tw-absolute tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-h-screen tw-w-full">
    <LoopingRhombusesSpinner
        class="tw-z-10"
        :animation-duration="2500"
        :rhombus-size="40"
        color="var(--primary-color)"
    />
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import Accounts from '@/components/Suppliers/Accounts';
import Payments from '@/components/Suppliers/Payments';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import router from "@/router";

export default {
  name: 'Supplier',
  title: 'Supplier',
  components: {
    Tab,
    Tabs,
    Accounts,
    Payments,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const supplier = ref(store.state.user);
    const backPage = ref(route.query.back && parseInt(route.query.back) ? parseInt(route.query.back) : 1);
    const isLoading = ref(false);

    getSupplier();

    return {
      supplier,
      backPage,
      isLoading,
      getSupplier,
    }

    function getSupplier() {
      if (supplier.value.robux_rate && supplier.value.id === parseInt(route.query.supplier)) {
        return;
      }

      if (store.getters.isRoleSuperAdmin && ! (route.query.supplier && parseInt(route.query.supplier) && parseInt(route.query.supplier) !== store.state.user.id)) {
        isLoading.value = true;

        setTimeout(() => {
          supplier.value = store.state.user;
          isLoading.value = false;
        }, 0);

        return;
      }

      isLoading.value = store.getters.isRoleSuperAdmin;

      store.dispatch('getSupplier', route.query.supplier ? parseInt(route.query.supplier) : store.state.user.id).then((response) => {
        response.data.not_authenticated = store.getters.isRoleSuperAdmin;
        supplier.value = response.data;

        isLoading.value = false;
      }).catch(() => {
        router.push({ name: 'Admin', query: { tab: 'suppliers', page: backPage.value } })
      })
    }
  }
}
</script>