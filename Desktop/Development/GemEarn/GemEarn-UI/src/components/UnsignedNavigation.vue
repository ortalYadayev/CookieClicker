<template>
  <div class="unsigned-nav tw-bg-primary">
    <div class="tw-container tw-m-auto tw-px-4">
      <div class="tw-flex tw-items-center tw-py-2 md:tw-py-1">
        <div class="tw-flex-1">
          <router-link class="tw-inline-block" :to="{ name: 'Home' }">
            <div class="logo tw-duration-300" />
          </router-link>
        </div>

        <nav class="tw-flex tw-z-10">
          <router-link :to="{ name: 'Login' }" class="tw-text-sm sm:tw-text-base tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-transparent hover:tw-border-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-2 md:tw-mr-4">
            <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
            Login
          </router-link>
          <router-link :to="{ name: 'Register' }" class="tw-text-sm sm:tw-text-base tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 hover:tw-bg-white hover:tw-text-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
            Register
          </router-link>
        </nav>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnsignedNavigation',
}
</script>