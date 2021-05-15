<template>
  <div class="notification-message tw-flex tw-items-center tw-border-l-4 tw-py-2 tw-px-3 tw-shadow-md"
       :class="`notification-${notification.type || 'info'}`"
  >
    <div class="notification-icon tw-rounded-full tw-mr-3 tw-bg-white">
      <svg v-if="notification.type === 'success'" width="1.8em" height="1.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
      </svg>
      <svg v-else-if="notification.type === 'alert'" width="1.8em" height="1.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
      </svg>
      <svg v-else-if="notification.type === 'error'" width="1.8em" height="1.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
      </svg>
      <svg v-else width="1.8em" height="1.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
        <circle cx="8" cy="4.5" r="1"/>
      </svg>
    </div>

    <div class="tw-flex-1 tw-text-white tw-max-w-xs">
      {{ notification.message }}
    </div>

    <button @click="$store.dispatch('removeNotification', notification)" class="tw-flex tw-justify-center tw-text-white tw-text-sm tw-ml-2">
      <fa-icon icon="times" />
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onBeforeUnmount } from 'vue';

export default {
  name: 'NotificationMessage',
  props: {
    notification: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store = useStore();

    const timeout = setTimeout(() => {
      store.dispatch('removeNotification', props.notification);
    }, 5000);

    onBeforeUnmount(() => {
      clearTimeout(timeout);
    });

    return {
      timeout,
    }
  }
}
</script>

<style scoped>
.notification-message {
  margin-top: 15px;
  transition: opacity 300ms, transform 300ms;
}

@media (max-width: 400px) {
  .notification-message {
    @apply border-t-2 border-l-0;
  }
}

.notification-success {
  @apply bg-green-500 border-green-700;

  .notification-icon {
    @apply text-green-500;
  }
}

.notification-info {
  @apply bg-blue-400 border-blue-700;

  .notification-icon {
    @apply text-blue-500;
  }
}

.notification-alert {
  @apply bg-orange-400 border-orange-700;

  .notification-icon {
    @apply text-orange-500;
  }
}

.notification-error {
  @apply bg-red-500 border-red-700;

  .notification-icon {
    @apply text-red-500;
  }
}
</style>