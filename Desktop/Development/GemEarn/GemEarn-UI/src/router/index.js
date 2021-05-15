import { createRouter, createWebHistory } from 'vue-router';
import { trackRouter } from "vue-gtag-next";
import store from "@/store";
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    window.scrollTo(0, 0);
  }

  const { authorize } = to.meta;
  const authenticatedUser = store.state.user;

  if (authorize) {
    if (authorize.length && authenticatedUser === null) {
      return next({ name: 'Home' });
    }

    if (authorize.length && authorize.includes(authenticatedUser.role)) {
      return next();
    }

    if (store.getters.isLoggedIn) {
      return next({ name: 'Home' });
    }
  }

  next();
});

trackRouter(router);

export default router;
