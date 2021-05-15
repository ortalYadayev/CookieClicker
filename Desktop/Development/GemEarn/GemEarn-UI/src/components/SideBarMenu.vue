<template>
  <aside class="sidebar-menu tw-sticky tw-shadow-lg tw-top-0 tw-hidden lg:tw-flex tw-flex-col tw-h-screen tw-min-h-screen tw-bg-primary tw-overflow-scroll">
    <section>
      <router-link :to="{ name: 'Home' }" class="logo-link tw-flex tw-justify-center tw-items-center">
        <div class="logo" />
      </router-link>
    </section>
    <nav class="tw-flex-1 tw-flex tw-flex-col">
      <router-link :to="{ name: 'Profile', query: { tab: 'details' } }" class="tw-border-t tw-border-b border-secondary-3 tw-flex tw-items-center tw-px-10 tw-py-4">
        <div>
          <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-object-cover tw-bg-secondary tw-rounded-full tw-h-10 tw-w-10" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
        </div>
        <div class="tw-flex-1 tw-text-white tw-font-medium tw-ml-6 tw-truncate">
          <div class="tw-truncate" v-if="$store.state.user && $store.state.user.username">
            {{ $store.state.user.username }}
          </div>
          <div class="tw-truncate" v-if="$store.state.user && $store.state.user.points !== null">
            <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
            <AnimatedNumber :number="$store.state.user.points" :duration="3" />
          </div>
        </div>
      </router-link>
      <ul class="tw-mt-6 tw-flex-1">
        <li>
          <router-link :to="{ name: 'Home' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" :icon="['fab', 'buffer']" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Earn
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Rewards' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" icon="money-check-alt" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Rewards
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Invite' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" :icon="['far', 'handshake']" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Invite
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Giveaways' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" icon="gift" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Giveaways
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Tasks' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" icon="tasks" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Tasks
            </div>
          </router-link>
        </li>
        <li>
          <router-link v-if="$store.getters.isRoleSupplier || $store.getters.isRoleSuperAdmin" :to="{ name: 'Supplier', query: { tab: 'accounts' } }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" icon="box" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Supplier
            </div>
          </router-link>
        </li>
        <li>
          <router-link v-if="$store.getters.isRoleAdmin || $store.getters.isRoleSuperAdmin" :to="{ name: 'Admin', query: { tab: 'stock' } }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" icon="users-cog" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Admin
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
    <section>
      <button @click="logout" class="router tw-w-full tw-h-12 tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary tw-border-t border-secondary-3">
        <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
        <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
          Logout
        </div>
      </button>
    </section>
  </aside>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber';
import { useStore } from 'vuex';
import router from '@/router';

export default {
  name: 'SidebarMenu',
  components: {
    AnimatedNumber,
  },
  setup() {
    const store = useStore();

    const logout = () => {
      store.dispatch('logout').then(() => {
        router.push({ name: 'Home' });
      });
    }

    return {
      logout,
    }
  },
}
</script>