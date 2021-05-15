<template>
  <div class="tw-text-center">
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      Giveaways
    </div>

    <div class="tw-flex tw-justify-center tw-p-6 tw-bg-white tw-rounded-sm tw-shadow">
      <div class="tw-w-full xl:tw-w-3/4 tw-text-xl tw-text-primary tw-flex tw-justify-between xl:tw-justify-around tw-flex-row-reverse tw-items-center tw-flex-wrap">
        <div class="tw-w-1/2 sm:tw-w-1/3">
          <div class="tw-text-2xl tw-font-bold">
            <fa-icon class="tw-text-primary" icon="coins" />
            {{ giveaway.current_giveaway ? giveaway.current_giveaway.points : 0 }}
          </div>
          <div class="tw-text-black tw-text-xs tw-uppercase tw-tracking-wider">
            Winning Amount
          </div>
        </div>
        <div class="tw-w-1/2 sm:tw-w-1/3">
          <div class="similar-integers tw-text-2xl tw-font-bold tw-rounded-full tw-text-center">
            {{ countdown.displayMinutes }}m {{ countdown.displaySeconds }}s
          </div>
          <div class="tw-text-black tw-text-xs tw-uppercase tw-tracking-wider">
            Time left
          </div>
        </div>
        <div class="tw-w-full sm:tw-w-1/3 tw-mt-4 sm:tw-m-0">
          <button v-if="$store.state.user && ! $store.state.user.registered_giveaway_at" @click="$refs.hcaptcha.execute()" class="tw-w-full sm:tw-w-auto tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary tw-text-primary hover:tw-text-white hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            Enter Giveaway
          </button>
          <div v-else class="tw-w-full sm:tw-w-auto tw-inline-block tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-border-2 tw-border-primary tw-text-white tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            You've entered
          </div>

          <VueHcaptcha :sitekey="sitekey"
                       @verify="enterGiveaway"
                       size="invisible"
                       ref="hcaptcha"
          />
        </div>
      </div>
    </div>

    <div v-if="giveaway.recent_giveaway_entries" class="tw-flex tw-justify-center tw-flex-wrap tw-mt-8">
      <div class="similar-integers tw-inline-block tw-w-full sm:tw-w-1/2 xl:tw-w-1/3 tw-border-t-2 tw-border-primary tw-shadow-md tw-px-4 tw-pt-4 xl:tw-mr-4">
        <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap">
          <div class="tw-text-lg md:tw-text-xl tw-uppercase tw-tracking-wider tw-mr-2">
            Recent Entries
          </div>
          <div>
            {{ giveaway.recent_giveaway_entries ? giveaway.recent_giveaway_entries.length : 0 }} Entries
          </div>
        </div>
        <div v-for="(entry, index) in giveaway.recent_giveaway_entries.slice(0, 10)" :key="index" :class="{ 'tw-border-b' : giveaway.recent_giveaway_entries.length <= 10 && index + 1 !== giveaway.recent_giveaway_entries.length || giveaway.recent_giveaway_entries.length >= 10 && index + 1 !== 10 }" class="body-ga tw-border-primary tw-flex tw-justify-between tw-py-3">
          <div class="tw-mr-2">
            <img class="tw-rounded-full tw-h-6 tw-w-6" :src="entry.profile_image_url">
          </div>
          <div class="tw-flex-1 tw-text-left tw-truncate">
            {{ entry.username }}
          </div>
          <div class="similar-integers tw-flex tw-justify-end tw-items-center tw-w-12 sm:tw-w-16 tw-text-right tw-text-xs sm:tw-text-base">
            {{ entry.formatted_registered_giveaway_at }}
          </div>
        </div>
      </div>

      <div v-if="giveaway.recent_giveaway_winners" class="similar-integers tw-inline-block tw-w-full sm:tw-w-1/2 xl:tw-w-1/3 tw-border-t-2 tw-border-primary tw-shadow-md tw-px-4 tw-pt-4 tw-mt-4 sm:tw-mt-0">
        <div class="tw-flex tw-text-lg md:tw-text-xl tw-uppercase tw-tracking-wider">
          Previous Winners
        </div>
        <div v-for="(winner, index) in giveaway.recent_giveaway_winners" :key="index" :class="{ 'tw-border-b' : index + 1 !== giveaway.recent_giveaway_winners.length }" class="body-ga tw-border-primary tw-flex tw-justify-between tw-py-3">
          <div class="tw-mr-2">
            <img class="tw-rounded-full tw-h-6 tw-w-6" :src="winner.user.profile_image_url">
          </div>
          <div class="tw-flex-1 tw-text-left tw-truncate">
            {{ winner.user.username }}
          </div>
          <div class="tw-flex tw-justify-end tw-items-center tw-mr-1 tw-mr-2 tw-text-xs sm:tw-text-base">
            <fa-icon class="tw-mx-2 tw-text-primary" icon="coins" />
            {{ winner.points }}
          </div>
          <div class="similar-integers tw-flex tw-justify-end tw-items-center tw-w-12 sm:tw-w-16 tw-text-right tw-text-xs sm:tw-text-base">
            {{ winner.won_at }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-12">
      <LoopingRhombusesSpinner
          :animation-duration="2500"
          :rhombus-size="25"
          color="var(--primary-color)"
      />
    </div>

    <div class="tw-text-primary tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-my-4 lg:tw-my-8">
      How does it work?
    </div>
    <div class="tw-flex tw-justify-center tw-flex-wrap">
      <div class="giveaway-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          1
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          Enter The Giveaway
        </div>
        <div class="tw-text-sm tw-mb-2">
          In order to participate in the giveaway, you must complete at least one offer in the last hour.
        </div>
        <div class="tw-text-sm tw-mb-2">
          After completing an offer, you'll be able to enter the giveaway by clicking the "ENTER GIVEAWAY" button above.
        </div>
      </div>

      <div class="giveaway-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="giveaway-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          2
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          Receive Points
        </div>
        <div class="tw-text-sm tw-mb-2">
          Once you've entered the giveaway, you have a chance to win the amount of points that is shown above.
        </div>
      </div>

      <div class="giveaway-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="giveaway-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
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
          The more you participate in giveaways, the better chance to win!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Pusher from 'pusher-js/with-encryption';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';
import { useStore } from 'vuex';
import { ref, reactive, computed, onBeforeUnmount } from 'vue';

export default {
  name: 'Giveaway',
  title: 'Giveaways',
  components: {
    LoopingRhombusesSpinner,
    VueHcaptcha,
  },
  setup: function () {
    const store = useStore();

    const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
      cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
      encrypted: true,
      authEndpoint: process.env.VUE_APP_WEBSOCKET_URL,
      auth: {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
        }
      }
    });

    const sitekey = ref(process.env.VUE_APP_HCAPTCHA_SITEKEY);
    const giveaway = ref({});
    const timer = ref(null);

    dayjs.extend(utc);
    dayjs.extend(timezone);

    let now = dayjs().tz(process.env.VUE_APP_TIMEZONE);

    const getDistance = (date = null) => {
      now = dayjs().tz(process.env.VUE_APP_TIMEZONE);

      if (!date) {
        return now.endOf('day') - now;
      }

      return now - dayjs(date);
    };

    const countdown = reactive({
      displayMinutes:59 - now.get('minute'),
      displaySeconds:59 - now.get('second'),
    });

    const _seconds = computed(() => 1000);
    const _minutes = computed(() => _seconds.value * 60);
    const _hours = computed(() => _minutes.value * 60);
    const _days = computed(() => _hours.value * 24);

    const showRemaining = () => {
      timer.value = setInterval(() => {
        const distance = getDistance();

        countdown.displayMinutes = Math.floor((distance % _hours.value) / _minutes.value);
        countdown.displaySeconds = Math.floor((distance % _minutes.value) / _seconds.value);

        formatGiveawayTimes();
      }, 1000);
    };

    const getCorrectTimeDisplay = (distance) => {
      const hours = Math.floor((distance % _days.value) / _hours.value);
      const minutes = Math.floor((distance % _hours.value) / _minutes.value);
      const seconds = Math.floor((distance % _minutes.value) / _seconds.value);

      let time = seconds + 's';

      if (hours) {
        time = hours + 'h';
      } else if (minutes) {
        time = minutes + 'm'
      }

      return time + ' ago';
    }

    const formatGiveawayTimes = () => {
      if (giveaway.value.recent_giveaway_entries) {
        const max = giveaway.value.recent_giveaway_entries.length <= 10 ? giveaway.value.recent_giveaway_entries.length : 10;

        for (let i = 0; i < max; i++) {
          giveaway.value.recent_giveaway_entries[i].formatted_registered_giveaway_at = getCorrectTimeDisplay(getDistance(giveaway.value.recent_giveaway_entries[i].registered_giveaway_at));
        }
      }

      if (giveaway.value.recent_giveaway_winners) {
        const max = giveaway.value.recent_giveaway_winners.length <= 10 ? giveaway.value.recent_giveaway_winners.length : 10;

        for (let i = 0; i < max; i++) {
          giveaway.value.recent_giveaway_winners[i].won_at = getCorrectTimeDisplay(getDistance(giveaway.value.recent_giveaway_winners[i].updated_at));
        }
      }
    }

    showRemaining();

    onBeforeUnmount(() => {
      clearTimeout(timer);

      pusher.unsubscribe('giveaways');
    });

    store.dispatch('getLoggedUser');
    store.dispatch('getGiveaway').then((response) => {
      giveaway.value = response.data;

      formatGiveawayTimes();

      pusher.subscribe('giveaways')
          .bind('giveaway.registration', ({ user }) => {
            giveaway.value.recent_giveaway_entries.unshift(user);

            formatGiveawayTimes();
          })
          .bind('giveaway.created', ({ current_giveaway, recent_giveaway_winners }) => {
            store.dispatch('getLoggedUser').then(() => {
              giveaway.value.recent_giveaway_entries.length = 0;
              giveaway.value.current_giveaway = current_giveaway;
              giveaway.value.recent_giveaway_winners = recent_giveaway_winners;

              formatGiveawayTimes();
            })
          });
    });

    const enterGiveaway = () => {
      store.dispatch('enterGiveaway').then(() => {
        store.dispatch('addNotification', {
          type: 'success',
          message: "You've entered the giveaway!",
        });
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data.message) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          });

          store.dispatch('getLoggedUser');
        }
      });
    };

    return {
      sitekey,
      giveaway,
      countdown,
      enterGiveaway,
    }
  }
}
</script>

<style scoped>
.giveaway-arrow {
  max-width: 100px;
  fill: var(--primary-color);

  @apply flex justify-center items-center;

  svg {
    max-width: 100%;
    height: auto;
  }
}

@media (min-width: 1024px) {
  .giveaway-description-card {
    max-width: 300px;
  }

  .giveaway-description-card {
    flex: 3;
  }

  .giveaway-arrow {
    flex: 1;
  }
}

@media (max-width: 1023px) {
  .giveaway-arrow {
    transform: rotate(90deg);
    max-width: 40px;
    margin: 15px 0;
  }
}
</style>
