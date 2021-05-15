<template>
  <div v-if="! isMaintenance" :class="{ 'lg:tw-flex ' : $store.getters.isLoggedIn }">
    <Navigation v-if="$store.getters.isLoggedIn" />

    <div :class="{ 'page-container' : $store.getters.isLoggedIn}">
      <div :class="{ 'container tw-relative' : $store.getters.isLoggedIn }">
        <Announcement v-if="$store.getters.isLoggedIn" />
        <LiveActivity v-if="$store.getters.isLoggedIn" />
        <Freeze v-if="$store.getters.isLoggedIn && $store.state.user && $store.state.user.froze_at" />
        <EmailVerification v-if="$store.getters.isLoggedIn && $store.state.user && $store.state.user.email_verified_at === null" />
        <AdBlock v-if="$store.getters.isLoggedIn && isAdBlock" />

        <router-view :key="$route.name !== 'Profile' && $route.name !== 'Admin' && $route.name !== 'Supplier' ? $route.fullPath : $route.name"
                     :class="{ 'tw-p-4 md:tw-p-8 lg:tw-p-10' : $store.getters.isLoggedIn }"
        />
      </div>

      <Footer v-if="$store.getters.isLoggedIn || $route.name === 'Terms' || $route.name === 'Privacy'" />
    </div>
  </div>

  <Maintenance v-else />

  <NotificationsList />
</template>

<script>
import Navigation from "@/components/Navigation";
import LiveActivity from "@/components/LiveActivity";
import Announcement from "@/components/AnnouncementBanner";
import EmailVerification from "@/components/EmailVerification";
import Freeze from "@/components/Freeze";
import AdBlock from "@/components/AdBlock";
import Footer from "@/components/Footer";
import Maintenance from "@/views/Maintenance";
import NotificationsList from "@/components/Notifications/NotificationsList";
import { detectAnyAdblocker } from 'just-detect-adblock'
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Announcement,
    LiveActivity,
    EmailVerification,
    Freeze,
    AdBlock,
    Footer,
    Maintenance,
    NotificationsList,
  },
  setup() {
    const isMaintenance = ref(process.env.VUE_APP_MAINTENANCE_MODE);
    const isAdBlock = ref(false);

    if (! process.env.VUE_APP_MAINTENANCE_MODE) {
      detectAnyAdblocker().then((detected) => {
        isAdBlock.value = process.env.NODE_ENV === 'production' && detected;
      });
    }

    return {
      isMaintenance,
      isAdBlock,
    }
  }
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />