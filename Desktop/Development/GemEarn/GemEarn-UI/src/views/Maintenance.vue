<template>
  <div class="maintenance tw-h-screen tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-bg-secondary tw-text-center">
    <div class="tw-flex-1 tw-relative tw-flex tw-flex-col tw-justify-center tw-items-center tw-py-10 tw-px-10 sm:tw-px-20 md:tw-px-6 md:tw--mr-10 tw-z-10">
      <div class="logo tw-duration-300 tw-absolute" />
      <div class="coming-soon tw-font-bold tw-uppercase tw-tracking-wider tw-text-3xl md:tw-text-4xl lg:tw-text-5xl xl:tw-text-6xl tw-mt-4 md:tw-mt-0">
        We're Offline!
      </div>

      <div class="tw-uppercase tw-tracking-wider tw-text-sm">
        We are currently under maintenance. We'll be back shortly, thank you for your patience.
      </div>
    </div>
    <div class="maintenance-triangle tw-bg-secondary md:tw--ml-10"></div>
    <div class="tw-w-full md:tw-w-2/3 maintenance-social tw-bg-primary tw-flex tw-justify-center">
      <div class="md:tw-h-screen tw-bg-primary tw-flex tw-flex-col tw-justify-center tw-items-center">
        <div class="tw-font-bold tw-text-white tw-uppercase tw-tracking-wider tw-text-3xl md:tw-text-4xl lg:tw-text-5xl xl:tw-text-6xl tw-pb-20 tw--mb-6 md:tw-px-10">
          Stay tuned!
        </div>
        <div class="tw-grid tw--mt-12">
          <a v-for="(socialMedia, index) in SocialMedia" :key="index" :href="socialMedia.link" target="_blank"
             class="maintenance-social-button tw-text-secondary tw-uppercase tw-tracking-wider tw-font-light hover:tw-font-bold"
             v-html="socialMedia.icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SocialMedia } from '@/_helpers/social-media';
import { useRoute, useRouter } from "vue-router";

export default {
  name: 'Maintenance',
  setup() {
    const route = useRoute();
    const router = useRouter();

    if (route.name !== 'Home') {
      router.push({ name: 'Home' });
    }

    return {
      SocialMedia,
    }
  }
}
</script>

<style>
.maintenance {
  .logo {
    top: 10px;
    left: 10px;
  }

  .maintenance-triangle {
    width: 0;
    height: 0;
    border-bottom: 100px solid var(--primary-color);
    border-right: none;
    border-left: 100vw solid transparent;
  }

  @media (min-width: 768px) {
    .maintenance-triangle {
      border-bottom: 100vh solid var(--primary-color);
      border-left: 25vh solid transparent;
      border-right: none;
    }

    .coming-soon {
      white-space: nowrap;
      overflow: overlay;
    }
  }

  > .maintenance-social {
    > .tw-flex > .tw-grid {
      grid-gap: 20px;
      grid-template-columns: repeat(2, 75px);
      grid-template-rows: repeat(2, 75px);

      .maintenance-social-button {
        > svg {
          width: 75px;
          height: 75px;
        }

        &:hover {
          path {
            fill: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    > .tw-flex-1 {
      margin-bottom: -50px;
    }

    > .maintenance-social {
      height: 50vh;
      min-height: 270px;
      max-height: 400px;

      > .tw-flex {
        height: calc(50vh + 50px);
        max-height: 270px;
        margin-bottom: -50px;

        > .tw-grid {
          grid-template-columns: repeat(2, 50px);
          grid-template-rows: repeat(2, 50px);

          .maintenance-social-button {
            > svg {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
  }
}
</style>