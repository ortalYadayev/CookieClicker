<template>
  <div class="half-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="table tw-w-full tw-flex sm:tw-bg-white tw-rounded-lg sm:tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
      <tr v-for="index in loginsObj.logins && loginsObj.logins.length ? loginsObj.logins.length : 1" :key="index" class="tw-bg-primary tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-rounded-l-lg sm:tw-rounded-none tw-mb-2 sm:tw-mb-0">
        <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Date</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">IP</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Previous IP</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Location</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Device</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Browser</th>
      </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
      <tr v-if="loginsObj.logins" v-for="(login, index) in loginsObj.logins" :key="index"  class="tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-mb-2 sm:tw-mb-0">
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="login.id" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="login.formatted_created_at" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="login.ip" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="login.previous_ip" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="login.location" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="login.device" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="login.browser" />
      </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! loginsObj.logins" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="loginsObj.pagination" v-model="page" :records="loginsObj.pagination.total" :per-page="loginsObj.pagination.per_page" @paginate="getLogins" :options="{ chunk: 5, edgeNavigation: true }" />
</template>

<script>
import Pagination from 'v-pagination-3';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from 'vuex';
import { ref } from "vue";

export default {
  name: 'Profile.Logins',
  components: {
    Pagination,
    LoopingRhombusesSpinner,
  },
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();

    const loginsObj = ref({});
    const page = ref(1);

    getLogins();

    return {
      loginsObj,
      page,
      getLogins,
    }

    function getLogins() {
      delete loginsObj.value.logins;

      store.dispatch('getLoginLogs', { user_id: props.user.id, page: page.value }).then((response) => {
        loginsObj.value = response.data;
      });
    }
  }
}
</script>