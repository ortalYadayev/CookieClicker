<template>
  <div class="tw-text-center">
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      Daily Tasks
    </div>

    <div class="tw-text-primary tw-bg-white tw-rounded-sm tw-shadow tw-text-center tw-p-6 tw-mb-8">
      <div class="similar-integers tw-text-3xl sm:tw-text-4xl md:tw-text-5xl tw-font-bold tw-mb-2">
          {{ countdown.displayHours }}h {{ countdown.displayMinutes }}m {{ countdown.displaySeconds }}s
      </div>
      <div class="tw-text-black md:tw-text-lg tw-tracking-wider">
          Complete daily tasks for extra points, these tasks reset every 24 hours.
      </div>
    </div>
    <div v-if="$store.state.daily_tasks && $store.state.daily_tasks.daily_tasks_options" class="tw-flex tw-justify-center tw-flex-wrap xl:tw-flex-no-wrap tw-mt-8 tw--mb-4 lg:tw-pl-4">
      <div v-for="(taskOption, offers_count) in $store.state.daily_tasks.daily_tasks_options"
           :key="offers_count"
           class="daily-task-card tw-flex tw-flex-col tw-justify-around tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4"
      >
        <div>
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            Complete {{ offers_count }} offer{{ offers_count > 1 ? 's' : '' }}
          </div>
          <div v-if="$store.state.daily_tasks.completed_offers_count >= 0" class="tw-mb-6">
            <template v-if="offers_count > $store.state.daily_tasks.completed_offers_count">
              Complete {{ offers_count - $store.state.daily_tasks.completed_offers_count }} more offer{{ offers_count - $store.state.daily_tasks.completed_offers_count > 1 ? 's' : '' }}.
            </template>
            <template v-else class="tw-mb-1">
              Already reached.
            </template>
          </div>
        </div>

        <div>
          <KProgress class="tw-w-full"
                     :percent="($store.state.daily_tasks.completed_offers_count / offers_count) * 100 <= 100 ? ($store.state.daily_tasks.completed_offers_count / offers_count) * 100 : 100"
                     color="var(--primary-color)"
                     :show-text="false"
                     :active="$store.state.daily_tasks.completed_daily_tasks &&
                    ! $store.state.daily_tasks.completed_daily_tasks.some(dailyTask => parseInt(dailyTask) === parseInt(offers_count))"
                     bg-color="white"
          />
          <button v-if="$store.state.daily_tasks.completed_daily_tasks &&
                      ! $store.state.daily_tasks.completed_daily_tasks.some(dailyTask => parseInt(dailyTask) === parseInt(offers_count))"
                  @click="completeTask(offers_count)"
                  class="tw-w-full tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary tw-text-primary hover:tw-text-white hover:tw-bg-primary tw-rounded-full tw-py-1">
            Redeem
            <fa-icon icon="coins" />
            {{ taskOption }}
          </button>
          <div v-else class="tw-w-full tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary tw-text-white tw-bg-primary tw-rounded-full tw-py-1">
            Already redeemed!
          </div>
        </div>
      </div>
    </div>

    <div v-else class="tw-flex tw-justify-center tw-items-center tw-w-full tw-mt-12">
      <LoopingRhombusesSpinner
          :animation-duration="2500"
          :rhombus-size="25"
          color="var(--primary-color)"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from "vuex";
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import KProgress from 'k-progress-v3';

export default {
  name: 'Tasks',
  title: 'Tasks',
  components: {
    LoopingRhombusesSpinner,
    KProgress,
  },
  setup() {
    const store = useStore();

    const timer = ref(null);

    dayjs.extend(utc)
    dayjs.extend(timezone)

    let now = dayjs().tz(process.env.VUE_APP_TIMEZONE);

    const getDistance = () => {
      now = dayjs().tz(process.env.VUE_APP_TIMEZONE);

      return now.endOf('day') - now;
    };

    const countdown = reactive({
      displayHours: 23 - now.get('hour'),
      displayMinutes: 59 - now.get('minute'),
      displaySeconds: 59 - now.get('second'),
    });

    const _seconds = computed(() => 1000);
    const _minutes = computed(() => _seconds.value * 60);
    const _hours = computed(() => _minutes.value * 60);
    const _days = computed(() => _hours.value * 24);

    const showRemaining = () => {
      timer.value = setInterval(() => {
        const distance = getDistance();

        countdown.displayHours = Math.floor((distance % _days.value) / _hours.value);
        countdown.displayMinutes = Math.floor((distance % _hours.value) / _minutes.value);
        countdown.displaySeconds = Math.floor((distance % _minutes.value) / _seconds.value);

        if (distance <= 1000) {
          store.dispatch('getDailyTasks');
        }
      }, 1000);
    };

    showRemaining();

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    store.dispatch('getDailyTasks');

    const completeTask = (offers_count) => {
      if (offers_count > store.state.daily_tasks.completed_offers_count) {
        store.dispatch('addNotification', {
          type: 'error',
          message: `You need to complete ${offers_count - store.state.daily_tasks.completed_offers_count} more offer${offers_count - store.state.daily_tasks.completed_offers_count > 1 ? 's' : '' }!`
        });

        return;
      }

      store.dispatch('storeDailyTasks', offers_count).then(() => {
        store.dispatch('addNotification', {
          type: 'success',
          message: "Task completed!"
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.errors ? err.response.data.errors.offers_count[0] : err.response.data.message,
          });
        }

        store.dispatch('getDailyTasks');
      });
    };

    return {
      countdown,
      completeTask,
    }
  }
}
</script>

<style>
.k-progress-outer {
  padding: 0 !important;
}
</style>