<template>
  <router-link :to="{ name: to }" class="router tw-w-1/5 sm:tw-w-2/12 sm:tw-mx-2 tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-px-2 tw-text-secondary">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'BottomNavigationRoute',
  props: {
    to: {
      type: String,
      required: true,
    },
  }
}
</script>
