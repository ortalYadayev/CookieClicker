<template>
  <UnsignedNavigation class="lg:tw-px-4">
    <main class="tw-flex tw-items-center tw-py-5 lg:tw-py-10">
      <div class="tw-w-full xl:tw-w-8/12 tw-text-center xl:tw-text-left">
        <h1 class="tw-font-bold tw-text-2xl md:tw-text-4xl tw-text-white tw-uppercase tw-tracking-wider">
          Earn Points & Redeem Rewards
        </h1>
        <p class="tw-text-sm sm:tw-text-lg lg:tw-text-xl tw-text-white tw-mt-4 tw-mb-6 md:tw-mb-8">
          Earn digital rewards by completing simple tasks, watching videos and testing apps on the appstore. It's that easy!
        </p>
        <router-link :to="{ name: 'Register' }" class="home-unsigned tw-duration-300 tw-text-primary tw-uppercase tw-tracking-wider tw-font-bold tw-border-2 tw-border-white tw-bg-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
          <fa-icon icon="sign-in-alt" />
          Get Started
        </router-link>
      </div>
      <div class="tw-z-0 tw-pt-4 tw-w-full lg:tw-w-4/12 tw-text-center xl:tw-text-right tw-hidden xl:tw-block">
        <img alt="survey" class="md:tw-w-1/2 lg:tw-w-full tw-inline-block" src="@/assets/images/survey.png">
      </div>
    </main>
  </UnsignedNavigation>

  <div class="tw-bg-white tw-text-primary">
    <svg class="tw-block xl:tw--mt-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240">
      <path fill="var(--primary-color)" d="M0,224L48,202.7C96,181,192,139,288,112C384,85,480,75,576,85.3C672,96,768,128,864,154.7C960,181,1056,203,1152,186.7C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
  </div>

  <div class="landing-section tw-py-8 tw-bg-white tw--mt-8 sm:tw--mt-12 md:tw--mt-16 lg:tw--mt-20 xl:tw--mt-24">
    <div class="tw-flex tw-justify-around tw-items-center tw-text-center tw-py-4">
      <div class="tw-mr-2 lg:tw-mr-0 tw-w-1/2 lg:tw-w-1/4">
        <div class="tw-text-primary tw-text-2xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold">
          <AnimatedNumber :number="parseFloat($store.state.stats.total_points_earned)" :duration="4" />
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-text-xs md:tw-text-sm tw-font-light tw-uppercase sm:tw-tracking-wider">
          <fa-icon class="tw-h-6 fa-w-20" icon="coins" />
          <span class="tw-ml-2">
              Points Earned
            </span>
        </div>
      </div>
      <div class="tw-w-1/2 lg:tw-w-1/4">
        <div class="tw-text-primary tw-text-2xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold">
          <AnimatedNumber :number="parseInt($store.state.stats.total_offers_completed)" :duration="4" />
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-text-xs md:tw-text-sm tw-font-light tw-uppercase sm:tw-tracking-wider">
          <fa-icon class="tw-h-6 fa-w-20" :icon="['fab', 'buffer']" />
          <span class="tw-ml-2">
              Offers Completed
            </span>
        </div>
      </div>
    </div>
    <div class="tw-text-primary tw-mb-4 md:tw-mb-2 tw-text-3xl md:tw-text-5xl tw-font-bold tw-text-center tw-uppercase tw-tracking-wider">
      <fa-icon icon="medal" />
      Our Rewards
    </div>

    <Splide :options="{ type: 'loop', rewind : true, gap: '20px', autoWidth: true, focus: 'center', autoplay: true }" class="rewards-list">
      <SplideSlide v-for="(reward, index) in $store.state.rewards" :key="index">
        <div class="reward-gap">
          <div class="reward tw-flex tw-justify-center tw-items-center" :class="`reward-${reward.provider}`">
            <img :src="reward.image" :alt="reward.name">
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>

  <div class="tw-bg-white tw-text-secondary">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path>
    </svg>
  </div>

  <div class="landing-section tw-text-center tw-bg-secondary tw-flex tw-flex-wrap tw-justify-center sm:tw-flex-no-wrap tw-pt-4 tw-pb-8">
    <div class="tw-text-center tw-w-full">
      <div class="tw-text-primary tw-mb-4 md:tw-mb-2 tw-text-3xl md:tw-text-5xl tw-font-bold tw-text-center tw-uppercase tw-tracking-wider">
        <fa-icon icon="star" />
        Our Features
      </div>

      <div class="tw-flex tw-justify-center tw-flex-wrap lg:tw-flex-no-wrap tw--mb-4 lg:tw-pl-4">
        <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
          <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="wallet" />
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            Offer Walls
          </div>
          <div class="tw-mb-6">
            Check out our offerwalls to start earning points!
          </div>
        </div>
        <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
          <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="gift" />
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            Giveaways
          </div>
          <div class="tw-mb-6">
            Enter our hourly giveaways on the website or keep an eye on our social medias for special promo codes!
          </div>
        </div>
        <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
          <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="people-arrows" />
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            Referrals
          </div>
          <div class="tw-mb-6">
            Invite your friends and earn 10% of their total earnings!
          </div>
        </div>
        <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
          <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="question" />
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            support
          </div>
          <div class="tw-mb-6">
            Check out our help center located on the bottom right of the page!
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="tw-bg-secondary tw-text-white">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path>
    </svg>
  </div>

  <div class="landing-section tw-bg-white tw-py-8 tw-flex tw-flex-col tw-justify-around tw-items-center">
    <div class="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-text-primary tw-font-bold tw-text-center lg:tw-text-left tw-mb-6">
      Start Earning Today!
    </div>
    <nav class="tw-flex">
      <router-link :to="{ name: 'Login' }" class="tw-text-primary hover:tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-4 lg:tw-mr-8">
        <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
        Login
      </router-link>
      <router-link :to="{ name: 'Register' }" class="tw-text-primary hover:tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
        <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
        Register
      </router-link>
    </nav>
  </div>

  <div class="tw-bg-white tw-text-primary">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path>
    </svg>
  </div>

  <Footer />
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber';
import UnsignedNavigation from '@/components/UnsignedNavigation';
import Footer from '@/components/Footer.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: 'UnsignedHome',
  title: 'GemEarn',
  components: {
    Footer,
    UnsignedNavigation,
    AnimatedNumber,
    Splide,
    SplideSlide,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    store.dispatch('stats')

    if (route.query.ref_id) {
      localStorage.setItem('ref_id', route.query.ref_id);
    }
  }
}
</script>

<style>
.splide {
  margin-top: -3em;
}

.splide__track {
  cursor: grabbing;
}

.splide__arrow--prev {
  left: 0.75em
}

.splide__arrow--next {
  right: 0.75em
}

.splide__arrow > svg {
  fill: rgba(var(--primary-color-rgb), 0.75);
}

.splide__arrow:hover > svg {
  fill: var(--primary-color);
}

.splide__pagination__page.is-active {
  background: rgba(var(--primary-color-rgb), 0.75);
}

.splide__pagination__page:hover {
  background: var(--primary-color);
}
</style>