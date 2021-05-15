import { Offerwalls } from "@/_helpers/offerwalls";
import { Rewards } from "@/_helpers/rewards";
import { createStore } from 'vuex'
import { axiosInstance } from '@/_helpers/axios';
import { Roles } from '@/_helpers/roles';
import router from "@/router";
import * as Sentry from "@sentry/vue";

export default createStore({
  state: {
    notifications: [],
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    daily_tasks: localStorage.getItem("daily_tasks")
        ? JSON.parse(localStorage.getItem("daily_tasks"))
        : null,
    stats: localStorage.getItem("stats")
        ? JSON.parse(localStorage.getItem("stats"))
        : {
      total_points_earned: 0,
      total_offers_completed: 0,
    },
    offerwalls: Offerwalls,
    rewards: Rewards,
    announcement_banner: {
      text: '',
      is_enabled: false,
    },
  },
  getters: {
    isLoggedIn: (state) => typeof state.token === "string",
    isUser: (state, getters) => getters.isLoggedIn && state.user,
    isRoleSupplier: (state, getters) => getters.isUser && state.user.role === Roles.Supplier,
    isRoleAdmin: (state, getters) => getters.isUser && state.user.role === Roles.Admin,
    isRoleSuperAdmin: (state, getters) => getters.isUser && state.user.role === Roles.SuperAdmin,
  },
  mutations: {
    pushNotification(state, notification) {
      state.notifications.unshift({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
      });
    },

    removeNotification(state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => notification.id !== notificationToRemove.id);
    },

    setToken(state, { token }) {
      state.token = token;
      localStorage.setItem('token', token);
    },

    removeToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },

    setUser(state, { user }) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },

    removeUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },

    setStats(state, stats) {
      state.stats = stats;
      localStorage.setItem('stats', JSON.stringify(stats));
    },

    setDailyTasks(state, dailyTasks) {
      state.daily_tasks = dailyTasks;
      localStorage.setItem('daily_tasks', JSON.stringify(dailyTasks));
    },

    updateDailyTasks(state, offers_count) {
      state.daily_tasks.completed_daily_tasks.push(offers_count);
      localStorage.setItem('daily_tasks', JSON.stringify(state.daily_tasks));
    },

    removeDailyTasks(state) {
      state.daily_tasks = null;
      localStorage.removeItem('daily_tasks');
    },

    setAnnouncementBanner(state, announcementBanner) {
      state.announcement_banner = announcementBanner;
    },

    tempEmailVerification(state) {
      state.user.email_verified_at = 1;
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    setUserHeaders(state, userHeaders) {
      localStorage.setItem('user_headers', JSON.stringify(userHeaders));
    },
  },
  actions: {
    addNotification({ commit }, notification) {
      commit('pushNotification', notification);
    },
    removeNotification({ commit }, notification) {
      commit('removeNotification', notification);
    },
    stats({ commit, getters }) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('stats').then((response) => {
        commit('setStats', response.data);
      });
    },
    login({ commit, getters, state }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/auth/login', payload).then(response => {
        commit('setUser', response.data);
        commit('setToken', response.data);

        Sentry.setUser(state.user);
      });
    },
    register({ commit, getters, state }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/auth/register', payload).then(response => {
        commit('setUser', response.data);
        commit('setToken', response.data);

        Sentry.setUser(state.user);
      });
    },
    forgotPassword({ commit, getters }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/forgot-password', payload);
    },
    checkForgotPasswordToken({ commit, getters }, token) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/forgot-password/check-token', { token });
    },
    resetPassword({ commit, getters }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/forgot-password/reset', payload);
    },
    getPostbackValue({ getters }) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get('postback/values');
    },
    updatePostbackValue({ getters }, postbackValue) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put('postback/values', { 'postback': postbackValue });
    },
    getBitcoinValue({ getters }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('bitcoin/values');
    },
    updateBitcoinValue({ getters }, bitcoin) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put('bitcoin/values', { 'bitcoin': bitcoin });
    },
    logout({ commit }) {
      commit('removeUser');
      commit('removeToken');
      commit('removeDailyTasks');

      Sentry.configureScope(scope => scope.setUser(null));
    },
    getLoggedUser({ commit, getters, state }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/auth/user', state.token).then((response) => {
        commit('setUser', response.data);
      }).catch(() => {
        commit('removeUser');
        commit('removeToken');

        router.push({ name: 'Home' });
      });
    },
    updateUser({ commit, getters, state }, payload) {
      if (! getters.isLoggedIn && (! payload.user_id || ! state.user && ! state.user.id)) {
        return;
      }

      if (payload.user_id) {
        return axiosInstance.put(`/users/${payload.user_id}`, payload);
      }

      return axiosInstance.post(`/users/${state.user.id}`, payload).then((response) => {
          commit('setUser', response.data);
        });
    },
    verifyEmail({ dispatch, commit, getters, state }, token) {
      return axiosInstance.post('/verify', {
        token: token,
      }).then((response) => {
        if (getters.isLoggedIn && state.user && state.user.id === response.data.user.id) {
          commit('setUser', response.data)
        } else {
          dispatch('getLoggedUser');
        }
      });
    },
    resendEmailVerification({ getters, state }, email = null) {
      if (! email && (! getters.isLoggedIn || ! state.user || state.user && (! state.user.email || state.user.email_verified_at))) {
        return;
      }

      return axiosInstance.post('/resend-verification', {
        email: email ? email : state.user.email,
      });
    },
    getPromoCodes({ getters }, page) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get(`/coupons?page=${page}`);
    },
    storePromoCode({ getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.post('/coupons', payload);
    },
    updatePromoCode({ getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put(`/coupons/${payload.promo_code_id}`, payload);
    },
    deletePromoCode({ getters }, code) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.delete(`/coupons/${code}`);
    },
    redeemPromoCode({ getters, commit }, promoCode) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post(`/coupons/${promoCode}/redeems`).then((response) => {
        commit('setUser', response.data);
      });
    },
    getRewards({ getters }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('rewards');
    },
    redeemReward({ getters }, payload) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('rewards', payload);
    },
    resendGiftCardTransactionMail({ getters }, gift_card_id) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post(`rewards/${gift_card_id}/mails`);
    },
    getGiftCards({ getters }, { page, provider }) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get(`/gift-cards?page=${page}&provider=${provider}`);
    },
    storeGiftCard({ getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.post('/gift-cards', payload);
    },
    updateGiftCard({ getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put(`/gift-cards/${payload.gift_card_id}`, payload);
    },
    deleteGiftCard({ getters }, reward_id) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.delete(`/gift-cards/${reward_id}`);
    },
    getBitcoinCredentials({ getters }) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get('bitcoin');
    },
    updateBitcoinCredentials({ getters }, payload) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.post('bitcoin', payload);
    },
    getDailyTasks({ getters, commit }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('/daily-tasks').then((response) => {
          commit('setDailyTasks', response.data);
      });
    },
    storeDailyTasks({ getters, commit }, offers_count) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/daily-tasks', { offers_count }).then((response) => {
        commit('setUser', response.data);
        commit('updateDailyTasks', offers_count);
      });
    },
    getGiveaway({ getters }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('/giveaway');
    },
    enterGiveaway({ getters, commit }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/giveaway').then((response) => {
        commit('setUser', response.data);
      });
    },
    getAnnouncementBanner({ getters, commit }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('/announcement-banner').then((response) => {
        if (response.data.announcement_banner) {
          commit('setAnnouncementBanner', response.data.announcement_banner)
        }
      });
    },
    updateAnnouncementBanner({ getters, commit }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.post('/announcement-banner', payload).then((response) => {
        if (response.data.announcement_banner) {
          commit('setAnnouncementBanner', response.data.announcement_banner)
        }
      });
    },
    getLoginLogs({ getters, state }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get(`/users/${payload.user_id}/login-logs?page=${payload.page}`);
    },
    getTransactions({ getters, state }, payload) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get(`/users/${payload.user_id}/transactions?page=${payload.page}`);
    },
    getRecentActivities({ getters }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('/activities');
    },
    getActivities({ getters, state }, payload) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get(`/users/${payload.user_id}/activities?page=${payload.page}`);
    },
    getReferrals({ getters, state }, payload) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get(`/users/${payload.user_id}/referrals?page=${payload.page}`);
    },
    getReferralsStats({ getters, state }) {
      if (! getters.isLoggedIn && ! state.user && ! state.user.id) {
        return;
      }

      return axiosInstance.get(`/users/${state.user.id}/referrals/stats`);
    },
    getUser({ getters }, user_id) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get(`/users/${user_id}`);
    },
    getUsers({ getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get(`/users?page=${payload.page}` + (payload.username ? `&username=${payload.username}` : '') + (payload.filter ? `&filter=${payload.filter}` : '') + (payload.filter_direction ? `&filter_direction=${payload.filter_direction}` : ''));
    },
    banUser({ getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.post(`/users/${payload.user_id}/bans`, { ban_reason: payload.ban_reason });
    },
    unbanUser({ getters }, user_id) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.delete(`/users/${user_id}/bans`);
    },
    getSupplierRate({ getters }) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get('supplier-rate');
    },
    updateSupplierRate({ getters }, rate) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put('supplier-rate', { 'rate': rate });
    },
    getSupplier({ getters }, supplier_id) {
      if (! getters.isRoleSuperAdmin && ! getters.isRoleSupplier) {
        return;
      }

      return axiosInstance.get(`/suppliers/${supplier_id}`);
    },
    getSuppliers({ getters }, page) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get(`/suppliers?page=${page}`);
    },
    updateSupplier({ getters }, payload) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put(`/suppliers/${payload.supplier_id}`, payload);
    },
    getRobuxAccounts({ getters }, payload) {
      if (! getters.isRoleSuperAdmin && ! getters.isRoleSupplier) {
        return;
      }

      return axiosInstance.get(`suppliers/accounts?page=${payload.page}` + (payload.user_id ? `&user_id=${payload.user_id}` : ''));
    },
    disableRobuxAccount({ getters }, group_id) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.post(`suppliers/accounts/${group_id}/disability`);
    },
    enableRobuxAccount({ getters }, group_id) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.delete(`suppliers/accounts/${group_id}/disability`);
    },
    storeRobuxAccount({ getters }, payload) {
      if (! getters.isRoleSuperAdmin && ! getters.isRoleSupplier) {
        return;
      }

      return axiosInstance.post('suppliers/accounts', payload);
    },
    deleteRobuxAccount({ getters }, group_id) {
      if (! getters.isRoleSuperAdmin && ! getters.isRoleSupplier) {
        return;
      }

      return axiosInstance.delete(`suppliers/accounts/${group_id}`);
    },
    refreshRobuxAccount({ getters }, group_id) {
      if (! getters.isRoleSuperAdmin && ! getters.isRoleSupplier) {
        return;
      }

      return axiosInstance.post(`suppliers/accounts/${group_id}/refresh`);
    },
    getSupplierPayments({ getters }, payload) {
      if (! getters.isRoleSuperAdmin && ! getters.isRoleSupplier) {
        return;
      }

      return axiosInstance.get(`suppliers/payments?page=${payload.page}` + (payload.user_id ? `&user_id=${payload.user_id}` : ''));
    },
    storeSupplierPayment({ getters }, payload) {
      if (! getters.isRoleSupplier) {
        return;
      }

      return axiosInstance.post('/suppliers/payments', payload);
    },
    updateSupplierPaymentStatus({ getters }, payload) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put(`/suppliers/payments/${payload.supplier_payment_id}`, payload);
    },
    getSocialMediaTasks({ getters }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('/social-media-tasks');
    },
    storeSocialMediaTasks({ getters, commit }, social_media) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/social-media-tasks', { social_media }).then((response) => {
        commit('setUser', response.data);
      });
    },
    storeTwoFactor({ getters, commit }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/2fa').then((response) => {
        commit('setUser', response.data);
      });
    },
    deleteTwoFactor({ getters, commit }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.delete('/2fa').then((response) => {
        commit('setUser', response.data);
      });
    },
    getRobuxGames({ getters }, payload) {
      if (! getters.isLoggedIn || ! payload.destination || ! payload.value) {
        return;
      }

      return axiosInstance.get(`/robux-games?username=${payload.destination}&value=${payload.value}`, payload);
    },
    saveUserHeaders({ commit, getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      commit('setUserHeaders', payload);
    },
    getUserHeaders({ getters, dispatch }) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      const headers = {
        id: '#',
        username: 'Username' ,
        email: 'Email',
        confirmed_at: 'Confirmed At',
        ip: 'IP',
        balance: 'Balance',
        total: 'Total',
        transactions: 'Transactions',
        referrals: 'Referrals',
        referred_by: 'Referred By',
        banned_at: 'Banned At',
        reason: 'Reason',
        froze_at: 'Froze At',
        role: 'Role',
        actions: 'Actions',
      };

      let userHeaders = localStorage.getItem("user_headers") ? JSON.parse(localStorage.getItem("user_headers")) : {};
      const userHeadersArr = Object.entries(userHeaders);
      const headersArr = Object.entries(headers);

      if (userHeadersArr.length !== headersArr.length) {
        userHeaders = {};
      } else {
        for (const [header, value] of userHeadersArr) {
          if (! headers[header] || ! ('visibility' in value) || ! ('name' in value)) {
            userHeaders = {};
            break;
          }
        }
      }

      if (Object.keys(userHeaders).length === 0) {
        for (const [header, name] of headersArr) {
          userHeaders[header] = {
            visibility: true,
            name,
          }
        }

        dispatch('saveUserHeaders', userHeaders);
      }

      return userHeaders;
    },
    getAllCurrencies({ getters }) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get('/currencies?no_pagination=1');
    },
    getCurrencies({ getters }, page) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.get(`/currencies?page=${page}`);
    },
    storeCurrency({ getters }, payload) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.post('/currencies', payload);
    },
    updateCurrency({ getters }, payload) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put(`/currencies/${payload.currency_id}`, payload);
    },
    deleteCurrency({ getters }, currency_id) {
      if (! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.delete(`/currencies/${currency_id}`);
    },
    getCurrencyValues({ getters }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('/currencies/values');
    },
    updateCurrencyValue({ getters }, payload) {
      if (! getters.isRoleAdmin && ! getters.isRoleSuperAdmin) {
        return;
      }

      return axiosInstance.put(`/currencies/${payload.currency_id}/values`, payload);
    },
  },
  modules: {
  },
});
