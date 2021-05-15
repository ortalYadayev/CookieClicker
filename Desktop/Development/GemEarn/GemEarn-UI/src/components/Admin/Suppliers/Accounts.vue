<template>
  <div class="full-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Supplier</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Roblox Username</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Withdrawn</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Robux</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Cookie</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Status</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="accountsObj.accounts" v-for="(account, index) in accountsObj.accounts" :key="index" class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.supplier_user.username" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.robux_account_username" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.formatted_total_withdrawn" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.formatted_robux_amount" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.cookie" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3">
            <div class="tw-text-xs tw-rounded-xl tw-text-white tw-font-bold tw-text-center tw-inline-block tw-w-20 tw-px-4 tw-py-1"
                 :class="account.disabled_at ? 'tw-bg-red-500' : 'tw-bg-green-500'"
            >
              {{ account.disabled_at ? 'Inactive' : 'Active' }}
            </div>
          </td>
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="refreshRobuxAccount(account)"
                      class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2"
                      :class="{ 'rotating' : account.isRefreshing }"
              >
                <fa-icon icon="sync-alt" />
              </button>
              <button v-if="! account.disabled_at" @click="disableRobuxAccount(account)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500">
                <fa-icon icon="lock" />
              </button>
              <button v-else @click="enableRobuxAccount(account)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-green-500 tw-rounded-full hover:tw-text-white hover:tw-bg-green-500">
                <fa-icon icon="unlock-alt" />
              </button>
              <button @click="destroyRobuxAccount(account)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500 tw-ml-2">
                <fa-icon :icon="['far', 'trash-alt']" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! accountsObj.accounts" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="accountsObj.pagination" v-model="page" :records="accountsObj.pagination.total" :per-page="accountsObj.pagination.per_page" @paginate="getRobuxAccounts" :options="{ chunk: 5, edgeNavigation: true }" />
</template>

<script>
import Pagination from 'v-pagination-3';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'Admin.SupplierAccounts',
  components: {
    Pagination,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const accountsObj = ref({});
    const page = ref(1);

    getRobuxAccounts();

    return {
      accountsObj,
      page,
      getRobuxAccounts,
      disableRobuxAccount,
      enableRobuxAccount,
      refreshRobuxAccount,
      destroyRobuxAccount,
    };

    function getRobuxAccounts() {
      delete accountsObj.value.accounts;

      store.dispatch('getRobuxAccounts', { page: page.value }).then((response) => {
        accountsObj.value = response.data;
      });
    }

    function disableRobuxAccount(account) {
      store.dispatch('disableRobuxAccount', account.id).then((response) => {
        account.disabled_at = response.data.disabled_at;
        account.formatted_disabled_at = response.data.formatted_disabled_at;
      });
    }

    function enableRobuxAccount(account) {
      store.dispatch('enableRobuxAccount', account.id).then((response) => {
        account.disabled_at = response.data.disabled_at;
        account.formatted_disabled_at = response.data.formatted_disabled_at;
      });
    }

    function refreshRobuxAccount(account) {
      if (account.isRefreshing) {
        return;
      }

      account.isRefreshing = true;

      store.dispatch('refreshRobuxAccount', account.id).then((response) => {
        account.robux_account_username = response.data.robux_account_username;
        account.robux_amount = response.data.robux_amount;
        account.formatted_robux_amount = response.data.formatted_robux_amount;
        account.disabled_at = response.data.disabled_at;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Account refreshed successfully!',
        });

        account.isRefreshing = false;
      }).catch((err) => {
        if (err.response.status === 404) {
          accountsObj.value.accounts.splice(accountsObj.value.accounts.indexOf(account), 1);
          accountsObj.value.pagination.total--;

          if (page.value > 1 && accountsObj.value.pagination.total <= 10) {
            page.value = 1;

            getRobuxAccounts();
          }
        } else if (err.response.status === 422) {
          if (err.response.data.account) {
            account.robux_amount = err.response.data.account.robux_amount;
            account.formatted_robux_amount = err.response.data.account.formatted_robux_amount;
            account.disabled_at = err.response.data.account.disabled_at;
          }
        }

        store.dispatch('addNotification', {
          type: 'error',
          message: err.response.data.message,
        });

        account.isRefreshing = false;
      });
    }

    function destroyRobuxAccount(account) {
      store.dispatch('deleteRobuxAccount', account.id).then(() => {
        accountsObj.value.accounts.splice(accountsObj.value.accounts.indexOf(account), 1);
        accountsObj.value.pagination.total--;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Account removed successfully!',
        });

        if (page.value > 1 && accountsObj.value.pagination.total <= 10) {
          page.value = 1;

          getRobuxAccounts();
        }
      });
    }
  },
}
</script>