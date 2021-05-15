<template>
  <div class="tw-px-4 tw-pt-4 md:tw-px-8 md:tw-pt-8 lg:tw-px-10 lg:tw-pt-10">
    <div class="tw-font-bold tw-border-2 tw-border-red-500 tw-text-red-500 tw-rounded-lg tw-w-full tw-px-4 md:tw-px-8 tw-py-4 tw-flex tw-justify-between tw-items-center tw-text-sm">
      <div class="tw-flex tw-items-center">
        <fa-icon icon="snowflake" class="tw-hidden sm:tw-block tw-mr-2" style="width: 30px; height: 30px" />
        <article>
          <div class="tw-text-xl">
            You're frozen!
          </div>

          <div>
            Your account has been frozen due to suspicious activity. Please contact support about your account.
          </div>
        </article>
      </div>
      <a href="https://gemearn.reamaze.com/kb/my-account/why-is-my-account-frozen" target="_blank" class="tw-h-full tw-ml-2 md:tw-ml-4">
        Contact Support
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Freeze',
}
</script>
