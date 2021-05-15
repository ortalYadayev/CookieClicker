<template>
  <div v-if="$store.getters.isLoggedIn">
    <SignedHome />
  </div>

  <div v-else>
    <UnsignedHome />
  </div>
</template>

<script>
import UnsignedHome from '@/components/UnsignedHome';
import SignedHome from '@/components/SignedHome';
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: 'Home',
  components: {
    UnsignedHome,
    SignedHome,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    if (route.query.token) {
      store.dispatch('verifyEmail', route.query.token).then(() => {
        store.dispatch('addNotification', {
          type: 'success',
          message: "Account successfully verified!"
        });

        router.push({ name: 'Home' });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('getLoggedUser').then(() => {
            if (store.state.user.email_verified_at) {
              store.dispatch('addNotification', {
                type: 'error',
                message: "Your account is already verified!"
              });
            }
          });
        }

        router.push({ name: 'Home' });
      });
    }

    if (route.name === 'NotFound') {
      router.push({ name: 'Home' });
    }
  }
}
</script>