<template>
  <div>
    <div id="rewards" class="tw-pb-8 tw-bg-secondary">
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Rewards
      </div>

      <div v-if="rewards" class="rewards-list tw-grid">
        <div v-for="(reward, index) in $store.state.rewards" :key="index" @click="reward.stock && expandedReward !== reward ? expandRow(reward) : ''" class="reward-item"
             :class="{ 'extend-row' : expandedReward === reward, 'tw-cursor-pointer' : expandedReward !== reward && reward.stock && rewards, 'tw-cursor-not-allowed' : ! reward.stock }">
          <div class="reward tw-relative tw-flex tw-justify-center tw-items-center" :class="`reward-${reward.provider}`">
            <button v-if="expandedReward === reward" @click="expandRow(reward)" class="tw-absolute badge badge-failed">
              Close
            </button>
            <div v-else-if="! reward.stock" class="tw-absolute badge badge-out-of-stock tw-z-10">
              Out of stock
            </div>
            <img :src="reward.image" :alt="reward.name">
          </div>
          <div class="reward-details tw-flex tw-justify-between tw-items-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            {{ reward.name }}

            <button v-if="expandedReward === reward" @click="openModal(reward)" class="tw-border-2 tw-border-primary tw-rounded-full tw-h-8 tw-w-8 tw-text-sm tw-text-primary">
              <fa-icon icon="exclamation" />
            </button>
          </div>
          <div v-if="expandedReward === reward" class="tw-flex tw-flex-col tw-justify-end tw-px-3 tw-pb-3" style="height: 220px;">
            <span v-if="expandedReward.provider !== 'bitcoin' && currencies.find((currency) => currency.id === payload.currency_id) || expandedReward.provider === 'bitcoin' && bitcoinValue || expandedReward.provider === 'robux'" class="tw-flex tw-mb-1 tw-text-xs">
              Cost
              <span class="tw-truncate tw-inline-block tw-mx-1" style="max-width: 90px">
                <template v-if="expandedReward.provider === 'robux'">
                  {{ payload.value || 0 }}
                </template>
                <template v-else-if="expandedReward.provider === 'bitcoin'">
                  {{ payload.value * bitcoinValue }}
                </template>
                <template v-else>
                  {{ payload.value * currencies.find((currency) => currency.id === payload.currency_id).currency_value[payload.provider] }}
                </template>
              </span>
              points
            </span>
            <div v-if="expandedReward.provider === 'bitcoin' || expandedReward.provider === 'robux'" class="tw-w-full tw-mb-4">
              <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="destination">
                {{ expandedReward.provider === 'robux' ? 'Roblox Username' : 'Wallet Address' }}
              </label>
              <input v-model="payload.destination" id="destination" type="text" autocomplete="off" :placeholder="expandedReward.provider === 'robux' ? 'Roblox Username' : 'Wallet Address'"
                     class="input tw-duration-300 tw-shadow tw-border tw-rounded-md tw-w-full tw-py-1 tw-px-4 focus:tw-outline-none">
            </div>
            <div class="tw-w-full tw-mb-4">
              <template v-if="! expandedReward.options">
                <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="amount">
                  Robux Amount
                </label>
                <input v-model="payload.value" id="amount" type="number" min="1" :max="5000" placeholder="Amount" autocomplete="off"
                       onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                       class="input tw-duration-300 tw-shadow tw-border tw-rounded-md tw-w-full tw-py-1 tw-px-4 focus:tw-outline-none">
              </template>
              <template v-else-if="payload.country !== ''">
                <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="value">
                  Select Amount
                </label>
                <select v-model="payload.option" id="value" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none" style="height: 34px">
                  <template v-for="(option, index) in expandedReward.options" :key="option.country + index">
                    <option v-if="option.country === payload.country" :value="option">
                      {{ option.currency_id ? currencies.find((currency) => currency.id === option.currency_id).symbol : '$' }}{{ option.value }}
                    </option>
                  </template>
                </select>
              </template>

            </div>
            <div v-if="expandedReward.countries && (expandedReward.countries.length > 1 || expandedReward.countries.length === 1 && expandedReward.countries[0] !== null)" class="tw-w-full tw-mb-4">
              <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="region">
                Select Region
              </label>
              <select v-model="payload.country" @change="changedCountry" id="region" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none" style="height: 34px">
                <option value="" disabled>
                  Select Region
                </option>
                <option v-for="(region, index) in expandedReward.countries" :key="index" :value="region">
                  {{ region === null ? 'International' : region }}
                </option>
              </select>
            </div>
            <button v-if="! confirmation" @click="confirmation = true" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full tw-py-1" type="button">
              Redeem Reward
            </button>
            <div v-else class="tw-flex">
              <div class="tw-w-1/2 tw-pr-1">
                <button v-if="! isRedeeming" @click="expandedReward.provider !== 'robux' ? redeem() : openGamesModal()" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full tw-py-1" type="button">
                  Confirm
                </button>

                <div v-else class="tw-flex tw-justify-center tw-items-center tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full" style="padding: 11px 0">
                  <LoopingRhombusesSpinner
                      :animation-duration="2500"
                      :rhombus-size="10"
                      color="white"
                  />
                </div>
              </div>
              <div class="tw-w-1/2 tw-pl-1">
                <button @click="confirmation = false" class="tw-text-white tw-uppercase tw-border tw-border-red-500 tw-bg-red-500 tw-rounded-full tw-w-full tw-py-1" type="button">
                  Cancel
                </button>
              </div>
            </div>
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
    </div>

    <VModal v-model:visible="modal.visible" :max-width="modal.games ? '1000px' : '600px'" :overlay-close="! modal.games">
      <template v-if="modal.type && modal.type === 'robux'">
        <div class="tw-flex tw-flex-row-reverse tw-justify-end" style="width: 200%">
          <transition name="slide-fade-left">
            <div v-if="modal.transaction" class="tw-w-1/2 tw-flex tw-justify-center tw-flex-col">
              <h1 class="tw-text-center">
                Your Robux will be in your Roblox account within 5-7 days!
              </h1>

              <img src="@/assets/robux/ShowTransactions.png" alt="show-transactions" class="tw-mx-auto tw-mt-2">

              <a href="https://www.roblox.com/transactions" target="_blank"
                 class="tw-block tw-text-center tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary tw-text-primary hover:tw-text-white hover:tw-bg-primary tw-rounded-full tw-py-1 tw-px-4 tw-mt-2"
              >
                Check my pending Robux!
              </a>
            </div>
          </transition>
          <transition :name="! modal.transaction ? 'slide-fade-left' : 'slide-fade-right'">
            <div v-if="modal.chosenGame && ! modal.transaction" class="tw-w-1/2 tw-flex tw-justify-center tw-flex-col">
              <div>
                <h1 class="tw-text-center">
                  Sell VIP Server Access for R${{ Math.ceil(payload.value / 0.7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                </h1>

                <div class="md:tw-w-4/5 lg:tw-w-3/5 tw-mx-auto">
                  <div class="tw-flex tw-items-center tw-mt-2">
                    <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl tw-mr-2">
                      1
                    </div>
                    <div style="width: calc(100% - 48px)">
                      Configure Game:
                      <a :href="`https://www.roblox.com/places/${modal.chosenGame.rootPlace.id}/update`" target="_blank"
                         class="tw-duration-300 tw-text-primary tw-border-b tw-border-transparent hover:tw-border-primary tw-p-b-2"
                      >click here</a>.
                    </div>
                  </div>

                  <div class="tw-flex tw-flex-wrap sm:tw-flex-nowrap tw-mt-2">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl tw-mr-2">
                        2
                      </div>
                      <div style="width: calc(100% - 48px)">
                        Click "Access" Tab On Left Menu.
                      </div>
                    </div>
                    <div class="tw-flex-1 tw-ml-2" style="min-width: 250px;">
                      <img src="@/assets/robux/ClickAccess.png" alt="click-access" class="tw-w-3/4 tw-mx-auto sm:tw-ml-auto tw-mt-1 sm:tw-mt-0">
                    </div>
                  </div>

                  <div class="tw-flex tw-flex-wrap sm:tw-flex-nowrap tw-mt-2">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl tw-mr-2">
                        3
                      </div>
                      <div style="width: calc(100% - 48px)">
                        Check "Allow Private Servers"
                      </div>
                    </div>
                    <div class=" tw-flex-1 tw-ml-2" style="min-width: 250px;">
                      <img src="@/assets/robux/AllowPrivateServers.png" alt="click-access" class="tw-w-3/4 tw-mx-auto sm:tw-ml-auto tw-mt-1 sm:tw-mt-0">
                    </div>
                  </div>

                  <div class="tw-flex tw-justify-between tw-flex-wrap sm:tw-flex-nowrap tw-mt-2">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl tw-mr-2">
                        4
                      </div>
                      <div style="width: calc(100% - 48px)">
                        Set Price To:
                      </div>
                    </div>
                    <div class="tw-shadow tw-px-4 tw-py-2 tw-mx-auto sm:tw-mx-0 tw-mt-1 sm:tw-mt-0">
                      <div class="pricinglabel">
                        Price:
                      </div>
                      <div class="toppricingfield">
                        <span class="icon-robux-16x16" />
                        <input class="priceinput" type="text" disabled :value="Math.ceil(payload.value / 0.7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')">
                      </div>
                    </div>
                  </div>

                  <div class="tw-flex tw-flex-wrap sm:tw-flex-nowrap tw-mt-2">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl tw-mr-2">
                        5
                      </div>
                      <div style="width: calc(100% - 48px)">
                        Click Save Button.
                      </div>
                    </div>
                    <div class="tw-flex-1 tw-ml-2" style="min-width: 250px;">
                      <img src="@/assets/robux/ClickSaveButton.png" alt="click-access" class="tw-w-3/4 sm:tw-ml-auto tw-mt-1 sm:tw-mt-0">
                    </div>
                  </div>
                </div>

                <div class="tw-flex tw-mt-2">
                  <div class="tw-w-1/2 tw-pr-1">
                    <button @click="modal.chosenGame = null" class="tw-text-white tw-uppercase tw-border tw-border-red-500 tw-bg-red-500 tw-rounded-full tw-w-full tw-py-1" type="button">
                      Back
                    </button>
                  </div>
                  <div class="tw-w-1/2 tw-pl-1">
                    <button v-if="! isRedeeming" @click="redeem(modal.chosenGame.id)" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full tw-py-1" type="button">
                      Done
                    </button>

                    <div v-else class="tw-flex tw-justify-center tw-items-center tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full" style="padding: 11px 0">
                      <LoopingRhombusesSpinner
                          :animation-duration="2500"
                          :rhombus-size="10"
                          color="white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <transition name="slide-fade-right">
            <div v-if="modal.games && ! modal.chosenGame && ! modal.transaction" class="tw-w-1/2 tw-flex tw-justify-center tw-flex-col">
              <h1 class="tw-text-center">
                Select one of your game(s)
              </h1>

              <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap">
                <button v-for="(game, index) in modal.games" :key="index"
                        class="games tw-duration-300 tw-w-1/3 md:tw-w-1/5 lg:tw-w-1/6 xl:tw-w-1/8 tw-m-2"
                        :title="game.name"
                        @click="modal.chosenGame = game"
                >
                  <div class="tw-text-xs tw-border-t-2 tw-border-l-2 tw-border-r-2 tw-border-secondary tw-truncate tw-px-2">
                    {{ game.name }}
                  </div>
                  <div class="tw-flex tw-justify-center tw-items-center">
                    <img :src="game.rootPlace.imageUrl" :alt="game.name" class="tw-h-full tw-w-full">
                  </div>
                </button>
              </div>
            </div>
          </transition>
        </div>
        <template v-if="! modal.games">
          <h1 class="tw-text-center">
            Make a game public
          </h1>

          <video loop autoplay>
            <source src="@/assets/robux/SetGamePublicTutorial.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>

          <a href="https://www.roblox.com/develop?close=true" target="_blank"
             class="tw-block tw-text-center tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary tw-text-primary hover:tw-text-white hover:tw-bg-primary tw-rounded-full tw-py-1 tw-px-4 tw-mt-2"
          >
            Click to make a game public
          </a>

          <button @click="modal.visible = false; openGamesModal()"
                  class="tw-w-full tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1 tw-px-4 tw-mt-2"
          >
            Done
          </button>
        </template>
      </template>
      <template v-else-if="modal.code">
        <h1>
          {{ modal.formatted_provider }}
        </h1>

        <p>
          Thank you for claiming a {{ modal.currency_id ? currencies.find((currency) => currency.id === modal.currency_id).symbol : '$' }}{{ modal.value }} {{ modal.formatted_provider }} Gift Card. Please click on the button below to unleash your code.
        </p>

        <p v-if="modal.codeVisibility" class="tw-text-primary tw-font-bold tw-text-center tw-break-all tw-text-xl md:tw-text-2xl">
          {{ modal.code }}
        </p>
        <p v-else @click="modal.codeVisibility = true" class="tw-text-primary tw-font-bold tw-text-center tw-text-xl md:tw-text-2xl tw-cursor-pointer">
          Click to show
        </p>

        <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-text-center">
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${link}`" target="_blank" class="social-button bg-facebook tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
            <fa-icon class="social-icon" :icon="['fab', 'facebook-f']" />
            Share on facebook
          </a>
          <a :href="`https://twitter.com/intent/tweet?text=I just redeemed a ${modal.formatted_provider} gift card at GemEarn!&url=${link}`" target="_blank" class="social-button bg-twitter tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
            <fa-icon class="social-icon" :icon="['fab', 'twitter']" />
            Share on Twitter
          </a>
          <a :href="`https://reddit.com/submit?title=I just redeemed a ${modal.formatted_provider} gift card at GemEarn.gg!`" target="_blank" class="social-button bg-reddit tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
            <fa-icon class="social-icon" :icon="['fab', 'reddit-alien']" />
            Share on Reddit
          </a>
        </div>
      </template>
      <template v-else>
        <h1>
          {{ modal.provider === 'robux' || modal.provider === 'bitcoin' ? modal.name : modal.name + ' Gift Cards' }}
        </h1>

        <div>
          {{ modal.modal.name }} is <strong>NOT</strong> affiliated with GemEarn.
          <template v-if="modal.modal.redeemAlert">
            <br>
            <div v-html="modal.modal.redeemAlert" />
          </template>
        </div>

        <template v-if="modal.modal.ul">
          <strong>
            <template v-if="modal.provider === 'robux' || modal.provider === 'bitcoin'">
              How to claim {{ modal.name }}:
            </template>
            <template v-else>
              How to redeem {{ modal.name }} Gift Cards:
            </template>
          </strong>
          <ul class="tw-list-disc tw-pl-8 tw-mb-4">
            <li v-for="(li, index) in modal.modal.ul" :key="index" v-html="li" />
          </ul>
        </template>
        <template v-else-if="modal.modal.text">
          <div v-html="modal.modal.text" class="tw-mb-4" />
        </template>

        <p v-if="modal.provider === 'apple'">
          <a class="tw-text-primary" href="https://support.apple.com/en-us/HT211163" target="_blank">Click Here</a> to learn more about how to redeem your Apple Gift Card code.
        </p>

        <div class="tw-text-xs md:tw-text-sm">
          <template v-if="modal.provider === 'robux'">
            * There are no refunds once robux is claimed so please make sure you entered the
            correct username!
          </template>
          <template v-else>
            * There are no refunds once a code is claimed so please make sure you claim the
            correct code!
          </template>
        </div>
      </template>
    </VModal>
  </div>
</template>

<script>
import VModal from "@/components/VModal";
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from "vuex";
import { ref, watch } from 'vue';

export default {
  name: 'Rewards',
  title: 'Rewards',
  components: {
    VModal,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const link = ref(window.location.origin);
    const confirmation = ref(false);
    const isRedeeming = ref(false);
    const currencies = ref([]);
    const bitcoinValue = ref(null);
    const rewards = ref(null);
    const expandedReward = ref({});
    const modal = ref({
      visible: false
    });

    const payload = ref({
      option: null,
      country: null,
      currency_id: null,
      provider: null,
      value: null,
      destination: null,
    });

    store.dispatch('getCurrencyValues').then((response) => {
      currencies.value = response.data;
    });

    store.dispatch('getBitcoinValue').then((response) => {
      bitcoinValue.value = response.data;
    });

    getRewards();

    watch(() => payload.value.option, () => {
      payload.value.value = payload.value.option ? payload.value.option.value : null;
      payload.value.currency_id = payload.value.option ?  payload.value.option.currency_id : null;
    });

    return {
      link,
      confirmation,
      isRedeeming,
      currencies,
      bitcoinValue,
      rewards,
      expandedReward,
      modal,
      payload,
      redeem,
      expandRow,
      changedCountry,
      openModal,
      openGamesModal,
    }

    function removeDuplicates(array, prop) {
      return array.filter((item, index, self) => self.findIndex((value) => value[prop] === item[prop]) === index);
    }

    function getRewards() {
      store.dispatch('getRewards').then((response) => {
        rewards.value = response.data;

        store.state.rewards.forEach((reward) => {
          if (reward.provider === 'robux') {
            reward.stock = rewards.value.robux;
            return;
          } else if (reward.provider === 'bitcoin') {
            reward.options = reward.options.filter((option) => option.value <= rewards.value.bitcoin);
            reward.stock = reward.options.length ? rewards.value.bitcoin : 0;
            return;
          }

          reward.stock = rewards.value.gift_cards[reward.provider];

          if (reward.stock) {
            reward.countries = removeDuplicates(reward.stock, 'country').map((stock) => stock.country);
            reward.options = reward.stock.sort((item, value) => item.value - value.value);
          }
        });
      });
    }

    function expandRow(reward) {
      if (! rewards.value) {
        store.dispatch('addNotification', {
          type: 'info',
          message: 'Try again in a few moments',
        });

        return;
      }

      if (isRedeeming.value) {
        return;
      }

      if (expandedReward.value === reward) {
        setTimeout(() => {
          expandedReward.value = {};
        }, 0);
        return;
      }

      const el = document.getElementById('rewards');

      if (window.innerWidth < 1024) {
        el.style.marginTop = 'calc(var(--navigation-height)*-1 + 2px)';
        el.style.paddingTop = 'var(--navigation-height)';
      }

      el.scrollIntoView({behavior: "smooth"});

      el.style.marginTop = '';
      el.style.paddingTop = '';

      expandedReward.value = reward;
      confirmation.value = false;

      payload.value.destination = null;
      payload.value.provider = expandedReward.value.provider;
      if (expandedReward.value.countries) {
        payload.value.country = expandedReward.value.countries.length === 1 && expandedReward.value.countries[0] === null ? null : '';
      } else {
        payload.value.country = null;
        payload.value.value = null;
      }

      if (expandedReward.value.options && expandedReward.value.provider !== 'bitcoin') {
        changedCountry();
      }
    }

    function redeem(game_id = null) {
      if (isRedeeming.value) {
        return;
      }

      let errorMessage = getErrors();

      if (errorMessage) {
        store.dispatch('addNotification', {
          type: 'error',
          message: errorMessage,
        });

        return;
      }

      isRedeeming.value = true;

      if (game_id) {
        payload.value.game_id = game_id;
      }

      store.dispatch('redeemReward', payload.value).then((response) => {
        confirmation.value = false;
        isRedeeming.value = false;

        getRewards();

        store.commit('setUser', response.data);

        if (response.data.gift_card) {
          response.data.gift_card.visible = true;
          response.data.gift_card.formatted_provider = expandedReward.value.name.toString();
          modal.value = response.data.gift_card;
        } else if (payload.value.game_id) {
          delete payload.value.game_id;
          modal.value.visible = true;
          modal.value.transaction = true;
          modal.value.type = 'robux';
        } else {
          store.dispatch('addNotification', {
            type: 'success',
            message: "You've successfully claimed your reward!",
          });
        }

        expandedReward.value = {};
      }).catch((err) => {
        confirmation.value = false;
        isRedeeming.value = false;

        if (err.response.status === 422) {
          if (err.response.data.errors && err.response.data.errors.destination) {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.errors.destination[0],
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        } else if (err.response.status === 404) {
          err.response.data.visible = true;
          modal.value = err.response.data;
        }

        if (payload.value.game_id) {
          delete payload.value.game_id;
        }
      });
    }

    function changedCountry() {
      payload.value.option = expandedReward.value.stock.find((item) => item.country === payload.value.country);
    }

    function openModal(reward) {
      reward.visible = true;
      modal.value = reward;
    }

    function openGamesModal() {
      if (isRedeeming.value) {
        return;
      }

      let errorMessage = getErrors();

      if (errorMessage) {
        store.dispatch('addNotification', {
          type: 'error',
          message: errorMessage,
        });

        return;
      }

      isRedeeming.value = true;

      store.dispatch('getRobuxGames', payload.value).then((response) => {
        confirmation.value = false;
        isRedeeming.value = false;

        modal.value = {
          visible: true,
          type: 'robux',
          games: response.data,
          chosenGame: null,
        };
      }).catch((err) => {
        confirmation.value = false;
        isRedeeming.value = false;

        if (err.response.status === 422) {
          if (err.response.data.errors && err.response.data.errors.destination) {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.errors.destination[0],
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        } else if (err.response.status === 404) {
          modal.value = {
            visible: true,
            type: 'robux',
            games: null,
          };
        }
      });
    }

    function getErrors() {
      if (payload.value.country === '') {
        return 'You must select a region!';
      } else if (! payload.value.value) {
        return 'You must enter an amount!';
      } else if (payload.value.value < 1) {
        return 'The amount has to be greater than 0.';
      } else if (payload.value.provider === 'robux' && payload.value.value < 7) {
        return 'The amount has to be greater than 6.';
      } else if (payload.value.value > 5000) {
        return 'The amount may not be greater than 5000.';
      } else if (payload.value.provider === 'robux') {
        if (! payload.value.destination) {
          return 'You must enter a username!';
        } else if (payload.value.destination.length < 2) {
          return 'The username must be at least 2 characters.';
        } else if (payload.value.destination.length > 255) {
          return 'The username may not be greater than 255 characters.';
        }
      } else if (payload.value.provider === 'bitcoin') {
        if (! payload.value.destination) {
          return 'You must enter a wallet!';
        } else if (payload.value.destination.length < 2) {
          return 'The wallet must be at least 2 characters.';
        } else if (payload.value.destination.length > 255) {
          return 'The wallet may not be greater than 255 characters.';
        }
      }
    }
  }
}
</script>

<style scoped>
.extend-row {
  grid-row: 1 / 3;
}

.games:hover {
  transform: scale(1.05);
}

.slide-fade-left-enter-active, .slide-fade-right-enter-active {
  transition: all 1s ease;
}

.slide-fade-left-enter-from {
  transform: translateX(0%);
}

.slide-fade-left-enter-to {
  transform: translateX(-100%);
}

.slide-fade-right-enter-from {
  transform: translateX(-100%);
}

.slide-fade-left-leave-active, .slide-fade-right-leave-active {
  transition: all 1s ease;
}

.slide-fade-left-leave-active {
  transform: translateX(-100%);
}

.slide-fade-left-enter, .slide-fade-left-leave-to {
  transform: translateX(0%);
  opacity: 0;
}

.slide-fade-right-enter, .slide-fade-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.pricinglabel {
  float: left;
  line-height: 24px;
  text-align: right;
  width: 40px;
}

.toppricingfield {
  float: left;
  height: 24px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: left;
}

.priceinput {
  width: 75px;
  border: 1px solid #ccc;
}

.icon-robux-16x16 {
  background-position: -20px -20px;
  background-image: url(../assets/robux/RobuxIcons.svg);
  background-repeat: no-repeat;
  background-size: auto auto;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>