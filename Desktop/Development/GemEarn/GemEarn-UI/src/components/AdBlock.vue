<template>
  <div class="tw-px-4 tw-pt-4 md:tw-px-8 md:tw-pt-8 lg:tw-px-10 lg:tw-pt-10">
    <div class="tw-font-bold tw-border-2 tw-border-red-500 tw-bg-red-500 tw-text-white tw-rounded-lg tw-w-full tw-px-4 md:tw-px-8 tw-py-4 tw-flex tw-items-center tw-text-sm">
      <fa-icon icon="exclamation-triangle" class="tw-hidden sm:tw-block tw-mr-2" style="width: 30px; height: 30px" />
      <article>
        <div class="tw-text-xl">
          AdBlocker Detected!
        </div>

        <div>
          Please disable adblocker as it may cause issues with displaying and crediting offers. Reload this page once disabled.
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdBlock',
}
</script>
