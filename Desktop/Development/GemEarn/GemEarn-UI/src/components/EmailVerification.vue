<template>
  <div class="tw-px-4 tw-pt-4 md:tw-px-8 md:tw-pt-8 lg:tw-px-10 lg:tw-pt-10">
    <div class="tw-border-2 tw-border-primary tw-text-primary tw-rounded-lg tw-w-full tw-px-4 md:tw-px-8 tw-py-4 tw-flex tw-justify-between tw-items-center tw-text-sm">
      <div class="tw-flex tw-items-center">
        <fa-icon v-if="! hasSentVerification" icon="envelope" class="tw-hidden sm:tw-block tw-mr-2" style="width: 30px; height: 30px" />
        <fa-icon v-else icon="envelope-open" class="tw-hidden sm:tw-block tw-mr-2" style="width: 30px; height: 30px" />
        <article>
          <div class="tw-text-xl">
            Email Verification
          </div>

          <div>
            {{ ! hasSentVerification ?
              'You need to verify your email address for a better experience. Make sure to also check your spam folder!' :
              'We have successfully sent an email to ' + $store.state.user.email
            }}
          </div>
        </article>
      </div>
      <button v-if="! hasSentVerification" @click="resendEmailVerification" class="tw-h-full tw-ml-2 md:tw-ml-4">
        Resend email
      </button>
      <button v-else @click="$store.commit('tempEmailVerification')" class="tw-h-full tw-ml-2 md:tw-ml-4">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'EmailVerification',
  setup() {
    const store = useStore();
    const hasSentVerification = ref(false);

    const resendEmailVerification = () => {
      store.dispatch('resendEmailVerification').then(() => {
        store.dispatch('addNotification', {
          type: 'success',
          message: `We have successfully sent an email to ${store.state.user.email}`
        });

        hasSentVerification.value = true;
      }).catch((err) => {
        if (err.response.status !== 422) {
          return;
        }

        store.dispatch('getLoggedUser').then(() => {
          if (store.state.user.email_verified_at) {
            store.dispatch('addNotification', {
              type: 'error',
              message: "Your account is already verified!"
            });
          }
        });
      });
    }

    return {
      resendEmailVerification,
      hasSentVerification,
    }
  },
}
</script>
