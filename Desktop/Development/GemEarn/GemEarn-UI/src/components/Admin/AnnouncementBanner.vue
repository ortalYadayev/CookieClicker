<template>
  <div class="tw-w-full tw-relative tw-flex tw-justify-center tw-shadow-md tw-text-white tw-items-center tw-bg-primary tw-px-8 tw-py-4 tw-mb-4" style="min-height: 56px">
    <div v-html="payload.text" />
    <button class="tw-absolute tw-text-sm" style="top: 50%; right: 12px; transform: translateY(-50%)">
      <fa-icon icon="times" />
    </button>
  </div>
  <form @submit.prevent="saveAnnouncementBanner" class="tw-flex tw-flex-col">
    <div class="tw-flex tw-flex-wrap">
      <div class="tw-w-full tw-mb-4">
        <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-mb-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold" for="text">
            Banner Text
          </label>
          <div>
            <div class="tw-relative tw-inline-block tw-w-10 tw-mr-2 tw-align-middle tw-select-none">
              <input type="checkbox" name="toggle" id="toggle"
                     class="toggle-checkbox tw-duration-300 tw-absolute tw-block tw-w-6 tw-h-6 tw-rounded-full tw-bg-white tw-border-4 tw-appearance-none tw-cursor-pointer"
                     v-model="payload.is_enabled"
              >
              <label for="toggle" class="toggle-label tw-duration-300 tw-block tw-overflow-hidden tw-h-6 tw-rounded-full tw-bg-gray-300 tw-cursor-pointer" />
            </div>
            <label for="toggle" class="tw-text-primary tw-font-bold tw-text-sm tw-cursor-pointer">
              Banner Enabled?
            </label>
          </div>
        </div>
        <input id="text" type="text" placeholder="Text"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="payload.text"
               :class="{ 'input-invalid tw-mb-3' : v$.text.$invalid || errors.text }"
               @keydown="resetErrors('text')"
        >
        <p v-if="v$.text.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.text.$errors[0].$message }}
        </p>
        <p v-else-if="errors.text" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.text[0] }}
        </p>
      </div>
    </div>
    <div class="tw-text-center">
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </div>
  </form>
</template>

<script>
import { maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Admin.AnnouncementBanner',
  setup() {
    const store = useStore();

    const payload = reactive({
      text: store.state.announcement_banner.text,
      is_enabled: !! store.state.announcement_banner.is_enabled,
    });

    const errors = ref({});

    const rules = {
      text: {
        required: required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
    };

    const v$ = useVuelidate(rules, {
      text: toRef(payload, 'text'),
    });

    store.dispatch('getAnnouncementBanner').then(() => {
      payload.text = store.state.announcement_banner.text;
      payload.is_enabled = !! store.state.announcement_banner.is_enabled;
    });

    return {
      payload,
      v$,
      errors,
      resetErrors,
      saveAnnouncementBanner,
    }

    function saveAnnouncementBanner() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      store.dispatch('updateAnnouncementBanner', payload).then(() => {
        store.dispatch('addNotification', {
          type: 'success',
          message: 'Announcement banner saved successfully!'
        });
      }).catch((err) => {
        store.dispatch('addNotification', {
          type: 'error',
          message: "You've got errors!"
        });

        if (err.response.status === 422 && err.response.data.errors) {
          errors.value = err.response.data.errors;
        }
      });
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>

<style scoped>
.toggle-checkbox {
  right: 100%;
  transform: translateX(100%);
}

.toggle-checkbox:checked {
  transform: none;

  @apply right-0 border-primary;
}

.toggle-checkbox:checked + .toggle-label {
  @apply bg-primary;
}
</style>