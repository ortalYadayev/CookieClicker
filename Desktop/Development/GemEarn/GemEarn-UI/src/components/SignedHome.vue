<template>
  <div class="tw-mb-6">
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
      Offerwalls
    </div>
    <div class="tw-flex tw-flex-wrap md:tw--mx-4">
      <div v-for="(offerwall, index) in $store.state.offerwalls" :key="index" class="offerwall-card tw-w-full sm:tw-w-1/2 md:tw-w-1/3 lg:tw-w-1/3 xl:tw-w-1/4 tw-px-3 md:tw-px-4 tw-my-2">
        <router-link :to="{ name: 'Offerwall', params: { provider: offerwall.provider } }"
                     class="tw-h-full tw-flex tw-justify-center tw-items-center tw-rounded-2xl tw-shadow tw-duration-300 tw-overflow-hidden"
                     :class="`offerwall-${offerwall.provider}`"
                     :style="{ background: offerwall.background || 'var(--primary-color)' }"
        >
          <img class="offerwall-image" :src="offerwall.image">
        </router-link>
      </div>
    </div>
  </div>
  <div v-if="! Array.isArray(socialMediaTasksOptions) && socialMediaTasksOptions" class="tw-mb-6">
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
      Extra Points
    </div>
    <div class="tw-flex tw-flex-wrap md:tw--mx-4">
      <div v-for="(socialMedia, index) in socialMediaTasksOptions" :key="index" class="extra-points-card tw-w-full sm:tw-w-1/2 md:tw-w-1/3 lg:tw-w-1/3 xl:tw-w-1/4 tw-px-3 md:tw-px-4 tw-my-2">
        <button @click="socialMedia.text !== 'Redeemed' || socialMedia.is_redeeming ? storeSocialMediaTask(socialMedia) : ''" class="tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center tw-rounded-2xl tw-shadow tw-duration-300 tw-overflow-hidden">
          <div class="tw-flex tw-justify-around tw-items-center tw-flex-col tw-relative tw-w-full tw-h-full tw-py-4 tw-text-center tw-px-2"
               :class="{ 'tw-opacity-50 tw-cursor-default' : socialMedia.text === 'Redeemed' }"
               :style="`background: url('${socialMedia.thumbnail}'); background-size: cover`"
          >
            <div class="tw-absolute badge badge-success">
              <fa-icon class="tw-mr-1" icon="coins" />{{ socialMedia.points }}
            </div>
            <div class="social-icon" v-html="socialMedia.icon" />
            <div class="tw-text-white tw-text-xl sm:tw-text-lg md:tw-text-base xl:tw-text-xl" v-text="socialMedia.text" />
          </div>
        </button>
      </div>
    </div>
  </div>
  <div>
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
      Promo Codes
    </div>
    <div class="tw-flex tw-flex-wrap tw-p-6 tw-bg-white tw-rounded-sm tw-shadow">
      <div class="tw-w-full md:tw-w-1/2 xl:tw-w-3/5 tw-mb-3 sm:tw-mb-6 md:tw-m-0">
        <div class="tw-text-lg xl:tw-text-xl tw-font-medium tw-mb-3">
          Redeem a promo code for free points
        </div>
        <div class="tw-text-sm">
          You can find promo codes in videos from our sponsors! <br> We also often post promo codes on our social media so make sure to follow our accounts and turn your notifications on!
        </div>
      </div>
      <div class="tw-w-full md:tw-w-1/2 xl:tw-w-1/4 tw-flex tw-flex-col tw-justify-center tw-m-auto md:tw-pl-6 xl:tw-p-0">
        <div class="tw-mb-5">
          <input v-model="promoCode" placeholder="Promo Code" type="text" class="tw-border tw-w-full tw-px-2 tw-py-4 tw-text-center">
        </div>
        <button @click="redeemPromoCode" class="tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-px-10 tw-py-2 tw-duration-200"
                :class="promoCode ? 'tw-bg-primary tw-text-white' : 'tw-bg-secondary tw-text-gray-500'"
                :disabled="! promoCode"
        >
          Redeem
        </button>
      </div>
    </div>
  </div>

  <VModal v-model:visible="modal.visible">
    <h1>
      Congratulations!
    </h1>

    <p style="margin: 0">
      You got
      <strong>
        <fa-icon class="tw-mr-1" icon="coins" />{{ modal.social_media.points }}
      </strong>
      for {{ modal.social_media.congrats }}
    </p>
  </VModal>
</template>

<script>
import { SocialMedia } from '@/_helpers/social-media';
import VModal from '@/components/VModal';
import { useStore } from "vuex";
import { ref, reactive } from "vue";

export default {
  name: 'SignedHome',
  title: 'Earn Points',
  components: {
    VModal,
  },
  setup() {
    const store = useStore();
    const promoCode = ref('');
    const socialMediaTasksOptions = ref(localStorage.getItem('social_media_task_options') ? JSON.parse(localStorage.getItem('social_media_task_options')) : null);
    const modal = reactive({
      visible: false,
      social_media: null,
    });

    getSocialMediaTasks();

    return {
      promoCode,
      socialMediaTasksOptions,
      modal,
      redeemPromoCode,
      storeSocialMediaTask,
    }

    function getSocialMediaTasks() {
      store.dispatch('getSocialMediaTasks').then((response) => {
        socialMediaTasksOptions.value = response.data.social_media_tasks_options;

        SocialMedia.forEach((media) => {
          if (socialMediaTasksOptions.value[media.provider]) {
            socialMediaTasksOptions.value[media.provider] = {
              points: socialMediaTasksOptions.value[media.provider],
              ...media,
            }
          }
        });

        localStorage.setItem('social_media_task_options', JSON.stringify(socialMediaTasksOptions.value));
      });
    }

    function redeemPromoCode() {
      store.dispatch('redeemPromoCode', promoCode.value).then(() => {
        promoCode.value = '';

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Promo code has been redeemed',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.errors ? err.response.data.errors.code[0] : err.response.data.message,
          });
        }

        promoCode.value = '';
      });
    }

    function storeSocialMediaTask(media) {
      if (media.is_redeeming) {
        return;
      }

      media.is_redeeming = true;

      store.dispatch('storeSocialMediaTasks', media.provider).then(() => {
        window.open(media.link, "_blank");

        modal.visible = true;
        modal.social_media = media;
        media.text = 'Redeemed';
        media.is_redeeming = false;

        const filteredSocialMediaTasks = Object.entries(socialMediaTasksOptions.value).filter(([key, socialMedia]) => socialMedia.text !== 'Redeemed');

        localStorage.setItem('social_media_task_options', JSON.stringify(Object.fromEntries(filteredSocialMediaTasks)));
      }).catch((err) => {
        media.is_redeeming = false;

        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message
          });
        }

        getSocialMediaTasks();
      })
    }
  }
}
</script>

<style>
.badge {
  top: 10px;
  right: 10px;
}

.social-icon {
  > svg {
    @apply w-8 h-8;
  }
}

@media (min-width: 1024px) {
  .social-icon {
    > svg {
      @apply w-10 h-10;
    }
  }
}
</style>
