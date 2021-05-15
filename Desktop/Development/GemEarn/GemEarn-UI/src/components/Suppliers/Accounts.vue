<template>
  <div v-if="accountsObj.hasOwnProperty('total_robux_earnings') && accountsObj.hasOwnProperty('daily_robux_earnings')" class="tw-text-center tw-flex tw-flex-wrap tw-justify-center sm:tw-flex-no-wrap tw-mb-4">
    <div class="stats-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4">
      <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-6">
        Total Sold Lifetime
      </div>
      <div class="tw-flex tw-justify-center tw-items-center">
        <svg class="tw-text-primary" width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>common/robux</title>
          <desc>Created with Sketch.</desc>
          <g id="common/robux" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path style="fill: var(--primary-color)" d="M27.402,9.574 C29.009,10.502 30,12.218 30,14.074 L30,21.93 C30,23.787 29.009,25.502 27.402,26.43 L20.597,30.359 C18.99,31.287 17.009,31.287 15.402,30.359 L8.597,26.43 C6.99,25.502 6,23.787 6,21.93 L6,14.074 C6,12.218 6.99,10.502 8.597,9.574 L15.402,5.646 C17.009,4.718 18.99,4.718 20.597,5.646 L27.402,9.574 Z M16.313,7.429 L9.686,11.255 C8.642,11.858 8,12.971 8,14.177 L8,21.828 C8,23.033 8.642,24.147 9.686,24.75 L16.313,28.575 C17.357,29.178 18.642,29.178 19.686,28.575 L26.313,24.75 C27.357,24.147 28,23.033 28,21.828 L28,14.177 C28,12.971 27.357,11.858 26.313,11.255 L19.686,7.429 C18.642,6.826 17.357,6.826 16.313,7.429 L16.313,7.429 Z M19.385,9.567 L24.614,12.585 C25.471,13.08 26,13.995 26,14.986 L26,21.023 C26,22.013 25.471,22.928 24.614,23.423 L19.385,26.442 C18.528,26.937 17.471,26.937 16.614,26.442 L11.385,23.423 C10.528,22.928 10,22.013 10,21.023 L10,14.986 C10,13.995 10.528,13.08 11.385,12.585 L16.614,9.567 C17.471,9.072 18.528,9.072 19.385,9.567 L19.385,9.567 Z M15,21.004 L21,21.004 L21,15.004 L15,15.004 L15,21.004 Z" id="coin" fill="#FFFFFF"></path>
          </g>
        </svg>
        <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ accountsObj.total_robux_earnings }}
          </span>
      </div>
    </div>
    <div class="stats-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mt-4 sm:tw-mt-0">
      <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-6">
        Total Sold Today
      </div>
      <div class="tw-flex tw-justify-center tw-items-center">
        <svg class="tw-text-primary" width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>common/robux</title>
          <desc>Created with Sketch.</desc>
          <g id="common/robux" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path style="fill: var(--primary-color)" d="M27.402,9.574 C29.009,10.502 30,12.218 30,14.074 L30,21.93 C30,23.787 29.009,25.502 27.402,26.43 L20.597,30.359 C18.99,31.287 17.009,31.287 15.402,30.359 L8.597,26.43 C6.99,25.502 6,23.787 6,21.93 L6,14.074 C6,12.218 6.99,10.502 8.597,9.574 L15.402,5.646 C17.009,4.718 18.99,4.718 20.597,5.646 L27.402,9.574 Z M16.313,7.429 L9.686,11.255 C8.642,11.858 8,12.971 8,14.177 L8,21.828 C8,23.033 8.642,24.147 9.686,24.75 L16.313,28.575 C17.357,29.178 18.642,29.178 19.686,28.575 L26.313,24.75 C27.357,24.147 28,23.033 28,21.828 L28,14.177 C28,12.971 27.357,11.858 26.313,11.255 L19.686,7.429 C18.642,6.826 17.357,6.826 16.313,7.429 L16.313,7.429 Z M19.385,9.567 L24.614,12.585 C25.471,13.08 26,13.995 26,14.986 L26,21.023 C26,22.013 25.471,22.928 24.614,23.423 L19.385,26.442 C18.528,26.937 17.471,26.937 16.614,26.442 L11.385,23.423 C10.528,22.928 10,22.013 10,21.023 L10,14.986 C10,13.995 10.528,13.08 11.385,12.585 L16.614,9.567 C17.471,9.072 18.528,9.072 19.385,9.567 L19.385,9.567 Z M15,21.004 L21,21.004 L21,15.004 L15,15.004 L15,21.004 Z" id="coin" fill="#FFFFFF"></path>
          </g>
        </svg>
        <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ accountsObj.daily_robux_earnings }}
        </span>
      </div>
    </div>
    <div v-if="$store.getters.isRoleSupplier || supplier.not_authenticated" class="stats-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 tw-mt-4 sm:tw-mt-0">
      <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-6">
        Rate
      </div>
      <div class="tw-flex tw-justify-center tw-items-center">
        <fa-icon icon="dollar-sign" class="tw-text-primary" style="width: 28px; height: 26px" />
        <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ supplier.robux_rate ? supplier.robux_rate : 0 }}
        </span>
      </div>
    </div>
  </div>

  <div v-if="! supplier.not_authenticated" class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="create">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="cookie">
              Cookie
            </label>
            <input id="cookie" type="text" placeholder="Cookie" autocomplete="off"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.cookie"
                   :class="{ 'input-invalid tw-mb-3' : v$.cookie.$invalid || errors.cookie }"
                   @keydown="resetErrors('cookie')"
            >
            <p v-if="v$.cookie.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.cookie.$errors[0].$message }}
            </p>
            <p v-else-if="errors.cookie" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.cookie[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-px-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="robux_account_id">
              Account ID
            </label>
            <input id="robux_account_id" type="number" min="1" placeholder="Account ID"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.robux_account_id"
                   :class="{ 'input-invalid tw-mb-3' : v$.robux_account_id.$invalid || errors.robux_account_id }"
                   @keydown="resetErrors('robux_account_id')"
            >
            <p v-if="v$.robux_account_id.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.robux_account_id.$errors[0].$message }}
            </p>
            <p v-else-if="errors.robux_account_id" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.robux_account_id[0] }}
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
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Account ID</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Roblox Username</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Remaining Robux</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Status</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="accountsObj.accounts" v-for="(account, index) in accountsObj.accounts" :key="index"  class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.robux_account_id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.robux_account_username" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="account.formatted_robux_amount" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3">
            <div class="tw-text-xs tw-rounded-xl tw-text-white tw-font-bold tw-text-center tw-inline-block tw-w-20 tw-px-4 tw-py-1"
                 :class="! account.disabled_at ? 'tw-bg-green-500' : 'tw-bg-red-500'"
            >
              {{ ! account.disabled_at ? 'Active' : 'Inactive' }}
            </div>
          </td>
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="refresh(account)"
                      class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2"
                      :class="{ 'rotating' : account.isRefreshing }"
              >
                <fa-icon icon="sync-alt" />
              </button>
              <button @click="destroy(account)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500">
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

  <template v-if="chartData.labels">
    <div class="tw-text-primary tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-my-4 tw-text-center">
      Monthly Sales
    </div>

    <LineChart :data="chartData" :options="options" />
  </template>
</template>

<script>
import Pagination from 'v-pagination-3';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import LineChart from '../LineChart';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Supplier.Accounts',
  components: {
    Pagination,
    LoopingRhombusesSpinner,
    LineChart,
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
    const accountsObj = ref({});
    const page = ref(1);
    const payload = reactive({
      cookie: '',
      robux_account_id: null,
    });
    const chartData = reactive({
      datasets: [
          {
            label: 'Robux Sold',
            borderColor: "rgba(19, 160, 101, 1)",
            backgroundColor: "rgba(19, 160, 101, 0.2)",
            pointBackgroundColor: "rgba(19, 160, 101, 1)",
            borderWidth: 3,
            pointRadius: 2,
          }
      ],
    });
    const options = reactive({
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              zeroLineColor: "#bbb",
            },
            ticks: {
              min: 0,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent",
            },
          },
        ],
      },
    });

    const errors = ref({});

    const rules = {
      cookie: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(1000),
      },
      robux_account_id: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(9999999999),
      },
    };

    const v$ = useVuelidate(rules, {
      cookie: toRef(payload, 'cookie'),
      robux_account_id: toRef(payload, 'robux_account_id'),
    });

    getRobuxAccounts();

    return {
      accountsObj,
      page,
      payload,
      errors,
      v$,
      chartData,
      options,
      getRobuxAccounts,
      destroy,
      create,
      refresh,
      resetErrors,
    };

    function getRobuxAccounts() {
      delete accountsObj.value.accounts;

      const payload = {
        page: page.value,
        user_id: props.supplier.id
      }

      store.dispatch('getRobuxAccounts', payload).then((response) => {
        accountsObj.value = response.data;

        chartData.labels = getDaysInMonth();
        chartData.datasets[0].data = [];

        for (let i = 0; i < chartData.labels.length; i++) {
          const earning = accountsObj.value.monthly_robux_earnings.find((earning) => earning.date === i + 1);
          chartData.datasets[0].data[i] = earning ? earning.total_robux_amount : 0;
        }

        const dailyEarning = accountsObj.value.monthly_robux_earnings.find((earning) => new Date().getDate() === earning.date);
        accountsObj.value.daily_robux_earnings = dailyEarning ? dailyEarning.total_robux_amount : 0;
      });
    }

    function destroy(account) {
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

    function refresh(account) {
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

    function create() {
      v$.value.$touch();

      if (v$.value.$invalid || isCreating.value) {
        return;
      }

      errors.value = {};
      isCreating.value = true;

      store.dispatch('storeRobuxAccount', payload).then((response) => {
        v$.value.$reset();

        payload.cookie = '';
        payload.robux_account_id = null;
        accountsObj.value.accounts.unshift(response.data);
        accountsObj.value.pagination.total++;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Account created successfully!',
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

    function getDaysInMonth() {
      const date = new Date();
      const days = [];
      const month = date.getMonth();

      date.setDate(1);

      while (date.getMonth() === month) {
        days.push(`${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`);
        date.setDate(date.getDate() + 1);
      }

      return days;
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
