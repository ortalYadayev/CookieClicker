<template>
  <footer class="tw-flex tw-items-center tw-flex-col tw-bg-primary tw-px-4 sm:tw-px-8 md:tw-px-16 tw-py-6 lg:tw-py-8">
    <router-link :to="{ name: 'Home' }">
      <div class="logo" />
    </router-link>
    <div class="tw-mt-4 tw-flex tw-justify-center tw-flex-wrap">
      <a v-for="(socialMedia, index) in SocialMedia" :key="index" :href="socialMedia.link" target="_blank"
         class="social tw-px-2 tw-text-secondary tw-uppercase tw-tracking-wider tw-font-light hover:tw-font-bold"
         v-html="socialMedia.icon"
      />
    </div>

    <div class="md:tw-w-2/4 tw-border-t tw-border-solid tw-border-transparent-50 tw-py-4 tw-mt-4">
      <div class="tw-text-center">
        <router-link :to="{ name: 'Terms' }" class="tw-px-2 tw-text-secondary tw-uppercase tw-tracking-wider tw-font-light hover:tw-font-bold tw-duration-300">
          Terms
        </router-link>
        <router-link :to="{ name: 'Privacy' }" class="tw-px-2 tw-text-secondary tw-uppercase tw-tracking-wider tw-font-light hover:tw-font-bold tw-duration-300">
          Privacy
        </router-link>
      </div>
    </div>
    <div class="md:tw-w-2/4 tw-pt-4">
      <div class="tw-text-secondary tw-font-light tw-text-transparent-60 tw-text-base md:tw-text-sm tw-text-center">
        © GemEarn {{ new Date().getFullYear() }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
import { SocialMedia } from '@/_helpers/social-media';

export default {
  name: 'Footer',
  setup() {
    return {
      SocialMedia,
    }
  },
}
</script>
