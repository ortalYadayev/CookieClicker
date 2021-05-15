<template>
  <div class="tw-text-center">
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      Affiliates Dashboard
    </div>

    <div class="tw-p-6 tw-bg-white tw-rounded-sm tw-shadow">
      <div class="tw-text-xl tw-text-primary tw-mb-6">
        Share your referral link with your friends and earn up to 10% of all their earnings!
      </div>
      <div class="tw-rounded-xl tw-pt-4 tw-pr-4 tw-bg-primary tw-shadow-md tw-inline-block">
        <div class="tw-flex tw-justify-center tw-flex-wrap">
          <div ref="referral" class="tw-flex tw-items-center tw-text-secondary tw-inline-block tw-px-4 tw-break-all tw-mb-4">
            {{ inviteLink }}
          </div>

          <button @click="copyInviteLink" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border hover:tw-text-primary hover:tw-bg-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mb-4">
            <fa-icon class="tw-h-4 fa-w-20" :icon="['far', 'copy']" />
            Copy
          </button>
        </div>
      </div>

      <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-mt-6">
        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${inviteLink}`" target="_blank" class="social-button bg-facebook tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
          <fa-icon class="social-icon" :icon="['fab', 'facebook-f']" />
          Share on facebook
        </a>
        <a :href="`https://twitter.com/intent/tweet?text=Hey everyone! You can claim free Giftcards, ROBUX and Crypto by watching videos, filling out surveys and installing apps at GemEarn!&url=${inviteLink}`" target="_blank" class="social-button bg-twitter tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
          <fa-icon class="social-icon" :icon="['fab', 'twitter']" />
          Share on Twitter
        </a>
        <a :href="`https://reddit.com/submit?url=${inviteLink}&title=Hey everyone! You can claim free Giftcards, ROBUX and Crypto by watching videos, filling out surveys and installing apps at GemEarn!`" target="_blank" class="social-button bg-reddit tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
          <fa-icon class="social-icon" :icon="['fab', 'reddit-alien']" />
          Share on Reddit
        </a>
      </div>
    </div>

    <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-mt-8">
      <div class="affiliate-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4">
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
          Total Users
        </div>
        <div class="tw-mb-6">
          Number of invited users
        </div>
        <div class="tw-flex tw-justify-center tw-items-center">
          <fa-icon class="tw-h-8 fa-w-40 tw-text-primary" icon="user" />
          <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ stats.total_referrals }}
          </span>
        </div>
      </div>
      <div class="affiliate-card tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 sm:tw-mx-0 tw-mt-4 sm:tw-mt-0">
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
          TOTAL REVENUE
        </div>
        <div class="tw-mb-6">
          Your affiliate earnings
        </div>
        <div class="tw-flex tw-justify-center tw-items-center">
          <fa-icon class="tw-h-8 fa-w-40 tw-text-primary" icon="coins" />
          <span class="similar-integers tw-text-2xl tw-ml-2">
            {{ stats.total_revenue }}
          </span>
        </div>
      </div>
    </div>

    <div class="tw-text-primary tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-my-4 lg:tw-my-8">
      How does it work?
    </div>
    <div class="tw-flex tw-justify-center tw-flex-wrap">
      <div class="affiliate-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          1
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          INVITE FRIENDS
        </div>
        <div class="tw-text-sm tw-mb-2">
          Share your referral link with your friends in order to attract new users to GemEarn.
        </div>
        <div class="tw-text-sm tw-mb-2">
          Each user you invite, you'll receive 10% of his earnings.
        </div>
      </div>

      <div class="affiliates-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="affiliate-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          2
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          Receive Points
        </div>
        <div class="tw-text-sm tw-mb-2">
          Once someone has signed up on GemEarn using your referral link, you'll receive points any time they complete an offer.
        </div>
      </div>

      <div class="affiliates-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="affiliate-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          3
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          CLAIM REWARDS
        </div>
        <div class="tw-text-sm tw-mb-2">
          Once you've earned enough points, you can use them to claim one of our many available rewards!
        </div>
        <div class="tw-text-sm tw-mb-2">
          More friends you invite means more revenue, and more generated revenue means more rewards to claim!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';

export default {
  name: 'Invite',
  title: 'Invite Friends',
  setup() {
    const store = useStore();

    const stats = reactive({
      total_referrals: 0,
      total_revenue: 0,
    });
    const referral = ref(null);
    const inviteLink = ref(`${window.location.origin}/?ref_id=${store.state.user.referral_token}`);

    const selectText = (element) => {
      let range;
      if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }

    const unselectText = () => {
      if (document.selection) {
        document.selection.empty();
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
    }

    const copyInviteLink = () => {
      selectText(referral.value);
      document.execCommand('copy');
      unselectText();

      store.dispatch('addNotification', {
        type: 'success',
        message: `Copied referral link to clipboard`
      });
    }

    store.dispatch('getReferralsStats').then((response) => {
      stats.total_referrals = response.data.total_referrals;
      stats.total_revenue = response.data.total_revenue;
    });

    return {
      stats,
      referral,
      inviteLink,
      copyInviteLink,
    }
  }
}
</script>

<style scoped>
.affiliate-card {
  min-height: 200px;
}

.affiliates-arrow {
  max-width: 100px;
  fill: var(--primary-color);

  @apply flex justify-center items-center;

  svg {
    max-width: 100%;
    height: auto;
  }
}

@media (min-width: 1024px) {
  .affiliate-card, .affiliate-description-card {
    max-width: 300px;
  }

  .affiliate-description-card {
    flex: 3;
  }

  .affiliates-arrow {
    flex: 1;
  }
}

@media (max-width: 1023px) {
  .affiliates-arrow {
    transform: rotate(90deg);
    max-width: 40px;
    margin: 15px 0;
  }
}
</style>
