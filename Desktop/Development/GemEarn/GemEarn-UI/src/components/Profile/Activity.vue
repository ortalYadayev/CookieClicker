<template>
  <div class="half-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="table tw-w-full tw-flex sm:tw-bg-white tw-rounded-lg tw-overflow-hidden">
      <thead class="tw-text-white">
      <tr v-for="index in activitiesObj.activities && activitiesObj.activities.length ? activitiesObj.activities.length : 1" :key="index" class="tw-bg-primary tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-rounded-l-lg sm:tw-rounded-none tw-mb-2 sm:tw-mb-0">
        <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Date</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Type</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Amount</th>

        <template v-if="user.not_authenticated">
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Payout</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Offer Name</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Offer ID</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">IP</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Location</th>
        </template>
      </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
      <tr v-if="activitiesObj.activities" v-for="(activity, index) in activitiesObj.activities" :key="index"  class="tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-mb-2 sm:tw-mb-0">
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="activity.id" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="activity.formatted_created_at" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="activity.formatted_type" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="activity.formatted_points" />

        <template v-if="user.not_authenticated">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="activity.data && activity.data.revenue ? ('$' + activity.data.revenue) : null" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="activity.data && activity.data.offer_name ? activity.data.offer_name : null" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="activity.data && activity.data.offer_id ? activity.data.offer_id : null" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="activity.data && activity.data.user_ip ? activity.data.user_ip : null" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="activity.data && activity.data.location ? activity.data.location : null" />
        </template>
      </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! activitiesObj.activities" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="activitiesObj.pagination" v-model="page" :records="activitiesObj.pagination.total" :per-page="activitiesObj.pagination.per_page" @paginate="getActivities" :options="{ chunk: 5, edgeNavigation: true }" />
</template>

<script>
import Pagination from 'v-pagination-3';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from 'vuex';
import { ref } from "vue";

export default {
  name: 'Profile.Activity',
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

    const activitiesObj = ref({});
    const page = ref(1);

    getActivities();

    return {
      activitiesObj,
      page,
      getActivities,
    }

    function getActivities() {
      delete activitiesObj.value.activities;

      store.dispatch('getActivities', { user_id: props.user.id, page: page.value }).then((response) => {
        activitiesObj.value = response.data;
      });
    }
  },
}
</script>