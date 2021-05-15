<template>
  <div class="activity-items tw-flex tw-items-end">
    <transition-group name="activity" tag="div" class="tw-w-full tw-relative tw-flex tw-px-2 md:tw-px-6 lg:tw-px-8 tw-overflow-hidden">
      <div v-for="activity in activities" :key="activity.id" class="activity-item tw-h-full tw-flex tw-justify-center tw-items-center tw-flex-no tw-bg-white tw-text-xs tw-font-light tw-text-primary tw-rounded-md tw-border-b-2 tw-border-primary tw-mx-2 tw-px-4" style="white-space: nowrap">
        <span class="tw-w-6 tw-inline-block tw-mr-2">
          <img class="tw-object-cover tw-bg-secondary tw-rounded-full tw-w-6 tw-h-6" :src="activity.user.profile_image_url" :alt="activity.user.username">
        </span>
          <span class="user-activity tw-text-sm tw-font-medium tw-inline-block tw-truncate tw-mr-1">
          {{ activity.user.username }}
        </span>
          earned
          <span class="tw-flex tw-text-sm tw-font-medium tw-ml-1">
          <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
          {{ activity.formatted_points }}
        </span>
        <span class="tw-ml-1">
          from
          <template v-if="! activity.provider">
            {{ (/^[aeiou]$/i).test(activity.formatted_type[0]) ? 'an' : 'a' }}
          </template>
          {{ activity.formatted_type }}
        </span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Pusher from "pusher-js/with-encryption";
import { ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'LiveActivity',
  setup() {
    const store = useStore();

    const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
      cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
      encrypted: true,
      authEndpoint: 'process.env.VUE_APP_WEBSOCKET_URL',
      auth: {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        }
      }
    });

    const activities = ref([]);

    store.dispatch('getRecentActivities').then((response) => {
      activities.value = response.data.activities;

      pusher.subscribe('activities')
          .bind('activities.created', ({ activity }) => {
            activities.value.unshift(activity);

            if (store.state.user && store.state.user.id && activity.user.id === store.state.user.id) {
              store.dispatch('getLoggedUser');
            }
          });
    });

    onBeforeUnmount(() => {
      pusher.unsubscribe('activities');
    });

    return {
      activities
    }
  }
}
</script>

<style scoped>
.activity-enter-from,
.activity-leave-to {
  opacity: 0;
  transform: translateX(-250px);
}
</style>