<template>
  <div v-if="! isLoading">
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-bg-white tw-rounded-sm tw-shadow tw-w-full lg:tw-w-1/3">
        <div class="tw-bg-primary tw-py-6 tw-mb-2">
          <div class="tw-flex tw-justify-center">
            <img v-if="user && user.profile_image" class="tw-bg-secondary tw-shadow-lg tw-rounded-full tw-w-20 tw-h-20" :src="user.profile_image" :alt="user.username">
          </div>
          <div class="tw-text-secondary tw-font-medium tw-text-lg tw-pt-4 tw-text-center" v-if="user && user.username">
            {{ user.username }}
          </div>
        </div>
        <div class="tw-p-2">
          <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-border-b-2 tw-border-primary tw-rounded-md tw-px-3 tw-mb-3" style="min-height: 2.5rem">
            <div class="lg:tw-w-full xl:tw-flex-1 tw-text-left lg:tw-text-center xl:tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Lifetime points
            </div>
            <div v-if="user && user.total_points !== null" class="tw-truncate tw-w-1/2 md:tw-w-1/3 lg:tw-w-full xl:tw-w-1/3 tw-text-right lg:tw-text-center xl:tw-text-right">
              <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
              {{ user.total_points }}
            </div>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-border-b-2 tw-border-primary tw-rounded-md tw-px-3 tw-mb-3" style="min-height: 2.5rem">
            <div class="lg:tw-w-full xl:tw-flex-1 tw-text-left lg:tw-text-center xl:tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Join date
            </div>
            <div v-if="user && user.created_at !== null" class="tw-truncate tw-w-1/2 md:tw-w-1/3 lg:tw-w-full xl:tw-w-1/3 tw-text-right lg:tw-text-center xl:tw-text-right">
              {{ user.created_at }}
            </div>
          </div>

          <template v-if="! user.not_authenticated">
            <button v-if="! user.two_factor_enabled_at" @click="enable2FA" class="tw-w-full tw-flex tw-justify-center tw-items-center hover:tw-text-white hover:tw-bg-primary tw-duration-300 tw-text-primary tw-border-2 tw-border-primary tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-py-2 tw-mb-1 tw-mt-12">
              <fa-icon class="tw-h-6 fa-w-40" icon="lock" />
              Enable 2FA Security
            </button>
            <button v-else @click="disable2FA" class="tw-w-full tw-flex tw-justify-center tw-items-center tw-text-white tw-bg-primary hover:tw-bg-white tw-duration-300 hover:tw-text-primary tw-border-2 tw-border-primary tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-py-2 tw-mb-1 tw-mt-12">
              <fa-icon class="tw-h-6 fa-w-40" icon="unlock-alt" />
              Disable 2FA Security
            </button>
            <button v-if="! user.not_authenticated" @click="logout" class="tw-w-full tw-flex tw-justify-center tw-items-center hover:tw-text-white hover:tw-bg-primary tw-duration-300 tw-text-primary tw-border-2 tw-border-primary lg:tw-hidden tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-py-2 tw-mb-1 tw-mt-3">
              <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
              Logout
            </button>
          </template>

          <template v-else>
            <div v-if="! user.two_factor_enabled_at" class="tw-w-full tw-flex tw-justify-center tw-items-center tw-duration-300 tw-text-primary tw-border-2 tw-border-primary tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-py-2 tw-mb-1 tw-mt-12">
              <fa-icon class="tw-h-6 fa-w-40" icon="unlock-alt" />
              2FA Security Disabled
            </div>
            <div v-else class="tw-w-full tw-flex tw-justify-center tw-items-center tw-text-white tw-bg-primary tw-duration-300 tw-border-2 tw-border-primary tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-py-2 tw-mb-1 tw-mt-12">
              <fa-icon class="tw-h-6 fa-w-40" icon="lock" />
              2FA Security Enabled
            </div>
            <router-link :to="{ name: 'Admin', query: { tab: 'users', page: backPage } }" class="tw-w-full tw-flex tw-justify-center tw-items-center hover:tw-text-white hover:tw-bg-primary tw-duration-300 tw-text-primary tw-border-2 tw-border-primary tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-py-2 tw-mb-1 tw-mt-3">
              <fa-icon class="tw-h-6 fa-w-40" icon="undo-alt" />
              Back
            </router-link>
          </template>
        </div>
      </div>

      <div class="tw-flex lg:tw-w-2/3 tw-bg-white tw-shadow-md tw-mt-8 lg:tw-mt-0 lg:tw-ml-3 xl:tw-ml-6">
        <Tabs @changedRoute="getUser" class="tw-min-h-12 tw-w-full">
          <Tab name="Account Details" query="details">
            <Details :user="user" />
          </Tab>
          <Tab name="Transactions" query="transactions">
            <Transactions :user="user" />
          </Tab>
          <Tab name="Activity" query="activity">
            <Activity :user="user" />
          </Tab>
          <Tab name="Referrals" query="referrals">
            <Referrals :user="user" />
          </Tab>
          <Tab v-if="$store.getters.isRoleAdmin || $store.getters.isRoleSuperAdmin" name="Logins" query="logins">
            <Logins :user="user" />
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>

  <div v-else class="tw-absolute tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-h-screen tw-w-full">
    <LoopingRhombusesSpinner
        class="tw-z-10"
        :animation-duration="2500"
        :rhombus-size="40"
        color="var(--primary-color)"
    />
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import Details from '@/components/Profile/Details';
import Transactions from '@/components/Profile/Transactions';
import Activity from '@/components/Profile/Activity';
import Referrals from '@/components/Profile/Referrals';
import Logins from '@/components/Profile/Logins';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import router from "@/router";
import { ref } from 'vue';

export default {
  name: 'Profile',
  title: 'Profile',
  components: {
    Tab,
    Tabs,
    Details,
    Transactions,
    Activity,
    Referrals,
    Logins,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const user = ref(store.state.user);
    const backPage = ref(route.query.back && parseInt(route.query.back) ? parseInt(route.query.back) : 1);
    const isLoading = ref(false);

    getUser();

    return {
      user,
      backPage,
      isLoading,
      getUser,
      logout,
      enable2FA,
      disable2FA,
    }

    function getUser() {
      if (! store.getters.isRoleSuperAdmin && ! store.getters.isRoleAdmin || user.value.id === parseInt(route.query.user)) {
        return;
      }

      if (! (route.query.user && parseInt(route.query.user) && parseInt(route.query.user) !== store.state.user.id)) {
        isLoading.value = true;

        setTimeout(() => {
          user.value = store.state.user;
          isLoading.value = false;
        }, 0);

        return;
      }

      isLoading.value = true;

      store.dispatch('getUser', parseInt(route.query.user)).then((response) => {
        response.data.not_authenticated = true;
        user.value = response.data;

        isLoading.value = false;
      }).catch(() => {
        router.push({ name: 'Admin', query: { tab: 'users', page: backPage.value } })
      });
    }

    function logout() {
      store.dispatch('logout').then(() => {
        router.push({ name: 'Home' });
      });
    }

    function enable2FA() {
      store.dispatch('storeTwoFactor').then(() => {
        user.value = store.state.user;
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          });
        }
      });
    }

    function disable2FA() {
      store.dispatch('deleteTwoFactor').then(() => {
        user.value = store.state.user;
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          });
        }
      });
    }
  },
}
</script>
