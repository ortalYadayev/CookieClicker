<template>
  <div class="tw-block lg:tw-hidden">
    <div class="navigation-top navigation tw-z-50 tw-fixed tw-left-0 tw-right-0 tw-top-0 tw-bg-white tw-flex tw-justify-between tw-items-center tw-px-6 sm:tw-px-12">
      <router-link :to="{ name: 'Home' }">
        <div class="logo" />
      </router-link>
      <div class="tw-border-2 tw-border-primary tw-rounded-full tw-px-2 sm:tw-px-4 tw tw-text-primary tw-font-medium tw-flex tw-justify-center tw-items-center">
        <fa-icon class="tw-h-4 fa-w-20 tw-mr-2" icon="coins" />
        <span class="tw-text-xl" v-if="$store.state.user && $store.state.user.points !== null">
          <AnimatedNumber :number="$store.state.user.points" :duration="3" />
        </span>
      </div>
      <div class="tw-flex tw-items-center">
        <router-link v-if="$store.getters.isRoleSupplier || $store.getters.isRoleSuperAdmin" :to="{ name: 'Supplier', query: { tab: 'accounts' } }" class="tw-flex tw-justify-center tw-items-center tw-bg-secondary tw-rounded-full tw-h-10 tw-w-10 tw-mr-2">
          <fa-icon class="tw-h-5 fa-w-40" icon="box" />
        </router-link>
        <router-link v-if="$store.getters.isRoleAdmin || $store.getters.isRoleSuperAdmin" :to="{ name: 'Admin', query: { tab: 'stock' } }" class="tw-flex tw-justify-center tw-items-center tw-bg-secondary tw-rounded-full tw-h-10 tw-w-10 tw-mr-2">
          <fa-icon class="tw-h-5 fa-w-40" icon="users-cog" />
        </router-link>
        <router-link :to="{ name: 'Profile', query: { tab: 'details' } }" class="tw-rounded-full tw-h-10 tw-w-10">
          <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-object-cover tw-bg-secondary tw-rounded-full tw-h-10 tw-w-10" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
        </router-link>
      </div>
    </div>
    <div class="navigation-bottom navigation tw-z-50 tw-fixed tw-right-0 tw-left-0 tw-bottom-0 tw-bg-primary tw-flex tw-justify-around sm:tw-justify-center tw-items-center tw-px-2 sm:tw-px-6 sm:tw-px-12">
      <BottomNavigationRoute to="Rewards">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" icon="money-check-alt" />
        <div class="tw-font-light">
          Rewards
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute to="Invite">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" :icon="['far', 'handshake']" />
        <div class="tw-font-light">
          Invite
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute class="earn" to="Home">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" :icon="['fab', 'buffer']" />
        <div class="tw-font-light">
          Earn
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute to="Giveaways">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" icon="gift" />
        <div class="tw-font-light">
          Giveaways
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute to="Tasks">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" icon="tasks" />
        <div class="tw-font-light">
          Tasks
        </div>
      </BottomNavigationRoute>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber';
import BottomNavigationRoute from './BottomNavigationRoute';

export default {
  name: 'MobileNavigation',
  components: {
    AnimatedNumber,
    BottomNavigationRoute,
  },
}
</script>
