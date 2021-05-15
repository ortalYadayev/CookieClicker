import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosPlugin from '@/_helpers/axios';
import titleMixin from './mixins/title'
import VueGtag from "vue-gtag-next";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import { Vue as VueIntegration } from '@sentry/integrations';

// Font Awesome
import './font-awesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

if (store.state.token !== null) {
    store.dispatch('getLoggedUser');
} else if (store.state.user) {
    store.commit('removeUser');
    store.commit('removeToken');
}

const app = createApp(App);

if (! process.env.VUE_APP_MAINTENANCE_MODE && process.env.VUE_APP_SENTRY_AUTH_TOKEN && process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: process.env.VUE_APP_SENTRY_AUTH_TOKEN,
        integrations: [
            new Integrations.BrowserTracing(),
            new VueIntegration({
                Vue: app,
                attachProps: true,
                logErrors: true,
            }),
        ],
        tracingOptions: {
            trackComponents: true,
        },
        tracesSampleRate: 0.1,
    });

    Sentry.setUser(store.getters.isLoggedIn ? store.state.user : null);
}

app.component('fa-icon', FontAwesomeIcon)
    .use(VueGtag, {
        property: {
            id: process.env.VUE_APP_MIX_GOOGLE_ANALYTICS_ID,
        },
    })
    .use(AxiosPlugin)
    .use(store)
    .use(router)
    .mixin(titleMixin)
    .mount('#app');