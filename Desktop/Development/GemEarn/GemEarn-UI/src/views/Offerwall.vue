<template>
  <div>
    <div class="tw-justify-between tw-flex tw-flex-wrap tw-mb-4">
      <div class="tw-mb-2 sm:tw-m-0 tw-w-full sm:tw-w-1/3 xl:tw-w-1/4 tw-h-12 tw-bg-primary tw-rounded-xl">
        <router-link :to="{ name: 'Home' }" class="tw-rounded-lg tw-w-full tw-h-full tw-flex tw-rounded-xl tw-text-secondary tw-justify-center tw-items-center">
          <fa-icon icon="reply" />
          <div class="tw-text-sm sm:tw-text-base tw-uppercase tw-tracking-wider tw-ml-3">
            More Offers
          </div>
        </router-link>
      </div>
      <div class="tw-bg-red-600 tw-w-full sm:tw-w-1/3 xl:tw-w-1/4 tw-h-12 tw-rounded-xl">
        <a href="https://gemearn.reamaze.com/kb/missing-points" target="_blank" class="tw-uppercase tw-tracking-wider tw-rounded-xl tw-w-full tw-h-full tw-flex tw-text-secondary tw-justify-center tw-items-center">
          <fa-icon icon="exclamation" />
          <div class="tw-text-sm sm:tw-text-base tw-uppercase tw-tracking-wider tw-ml-3">
             Missing Points?
          </div>
        </a>
      </div>
    </div>
    <template v-if="offerwall">
      <div class="offerwall-card tw-w-full tw-mb-4">
        <div
            class="tw-h-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-xl tw-shadow tw-overflow-hidden"
            :class="`offerwall-${offerwall.provider}`"
            :style="{ background: offerwall.background || 'var(--primary-color)' }"
        >
          <img class="offerwall-image" :src="offerwall.image">
        </div>
      </div>

      <div v-if="isLoading" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-12">
        <LoopingRhombusesSpinner
            :animation-duration="2500"
            :rhombus-size="25"
            color="var(--primary-color)"
        />
      </div>

      <div v-if="iframe" style="min-height: 1200px">
        <iframe @load="isLoading = false" :src="iframe" width="100%" style="height: 1200px"></iframe>
      </div>
    </template>
  </div>
</template>

<script>
import { LoopingRhombusesSpinner } from "epic-spinners";
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'Offerwall',
  title: () => {
    const provider = useRoute().params.provider;
    const offerwall = useStore().state.offerwalls.filter(offerwall => offerwall.provider === provider)[0];

    return offerwall ? offerwall.name : 'Offerwall';
  },
  components: {
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const provider = route.params.provider;

    const offerwall = store.state.offerwalls.filter(offerwall => offerwall.provider === provider)[0];

    if (! offerwall) {
      router.push({ name: 'Home' });
      return;
    }

    const isLoading = ref(true);
    const iframe = ref(null);

    if (store.state.user.id && store.state.user.username && store.state.user.email) {
      setIframe();
    } else {
      store.dispatch('getLoggedUser').then(() => {
        setIframe();
      });
    }


    return {
      offerwall,
      isLoading,
      iframe,
    }

    function setIframe() {
      let iframeUrl = offerwall.iframe;

      iframeUrl = iframeUrl.replace(/\{user_id}/gi, store.state.user.id);
      iframeUrl = iframeUrl.replace(/\{username}/gi, store.state.user.username);
      iframeUrl = iframeUrl.replace(/\{email}/gi, store.state.user.email);

      iframe.value = iframeUrl;
    }
  }
}
</script>
