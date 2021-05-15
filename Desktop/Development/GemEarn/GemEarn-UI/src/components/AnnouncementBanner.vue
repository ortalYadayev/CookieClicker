<template>
  <transition name="bounce">
    <div v-if="$store.state.announcement_banner.is_enabled" class="tw-w-full tw-relative tw-flex tw-justify-center tw-shadow-md tw-text-white tw-items-center tw-bg-primary tw-px-8 tw-py-4">
      <div v-html="$store.state.announcement_banner.text" />
      <button @click="$store.state.announcement_banner.is_enabled = false" class="tw-absolute tw-text-sm" style="top: 50%; right: 12px; transform: translateY(-50%)">
        <fa-icon icon="times" />
      </button>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: 'AnnouncementBanner',
  setup() {
    const store = useStore();

    store.dispatch('getAnnouncementBanner');
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>