<template>
  <div v-if="$store.getters.isRoleSuperAdmin" class="tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-mb-2 tw--m-1">
    <button class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-primary tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-8 tw-py-2 tw-m-1"
            @click="openEditCurrencyValueModal"
    >
      Change Currency Values
    </button>
    <button class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-primary tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-8 tw-py-2 tw-m-1"
            @click="openEditPostbackValueModal"
    >
      Change Postback Value
    </button>
    <button class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-primary tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-8 tw-py-2 tw-m-1"
            @click="openEditBitcoinValueModal"
    >
      Change Bitcoin Value
    </button>
  </div>
  <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap" :class="{ 'tw-mb-4' : provider }">
    <template v-for="(reward, index) in $store.state.rewards" :key="index">
      <button
              v-if="reward.provider !== 'robux' && ($store.getters.isRoleSuperAdmin || $store.getters.isRoleAdmin && reward.provider !== 'bitcoin')"
              class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-4 tw-py-1 tw-m-2"
              :class="reward.provider === provider ? 'tw-bg-primary tw-text-white' : 'tw-text-primary'"
              @click="provider = reward.provider"
      >
        {{ reward.name }}
      </button>
    </template>
  </div>

  <Bitcoin v-if="provider === 'bitcoin' && $store.getters.isRoleSuperAdmin" />
  <GiftCard v-else-if="provider" :provider="provider" :currencies="currencies" />

  <VModal v-model:visible="modal.visible">
    <form v-if="modal.type === 'currencies'" @submit.prevent="updateCurrencyValue" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_currency">
            Currency
          </label>
          <select v-model="modal.currencies.currency" id="edit_currency"
                  class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none"
                  style="height: 38px"
                  @change="changeCurrency"
          >
            <option v-for="(currency, index) in currencies" :key="index" :value="currency">
              {{ currency.currency }}
            </option>
          </select>
        </div>
      </div>
      <div class="tw-flex tw-flex-wrap tw--mx-1">
        <template v-for="(reward, index) in $store.state.rewards" :key="index">
          <div v-if="reward.provider !== 'robux' && reward.provider !== 'bitcoin'" class="tw-w-1/2 sm:tw-w-1/3 lg:tw-w-1/4 tw-mb-4 tw-px-1">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" :for="`edit_${reward.provider}`">
              {{ reward.name }}
            </label>
            <input :id="`edit_${reward.provider}`" type="number" min="1" max="255" placeholder="Value"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="modal.currencies.currency_value[reward.provider]"
            >
          </div>
        </template>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
    <form v-else-if="modal.type === 'postback'" @submit.prevent="updatePostbackValue" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_postback">
            Postback Value
          </label>
          <input id="edit_postback" type="number" min="1" max="10000" placeholder="Value"
                 onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.postback"
          >
        </div>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
    <form v-else-if="modal.type === 'bitcoin'" @submit.prevent="updateBitcoinValue" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_bitcoin">
            Bitcoin Value
          </label>
          <input id="edit_bitcoin" type="number" min="1" max="10000" placeholder="Value"
                 onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.bitcoin"
          >
        </div>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
  </VModal>
</template>

<script>
import Pagination from 'v-pagination-3';
import GiftCard from '@/components/Admin/Rewards/GiftCard';
import Bitcoin from '@/components/Admin/Rewards/Bitcoin';
import VModal from '@/components/VModal';
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';

export default {
  name: 'Admin.RewardStock',
  components: {
    Pagination,
    GiftCard,
    Bitcoin,
    VModal,
  },
  setup() {
    const store = useStore();

    const provider = ref(null);

    const currencies = ref([]);
    const postbackValue = ref(40);
    const bitcoinValue = ref(100);
    const modal = reactive({
      visible: false,
      currencies: {
        currency: null,
        currency_value: {},
      },
      postback: null,
      bitcoin: null,
      type: '',
    });

    store.dispatch('getAllCurrencies').then((response) => {
      currencies.value = response.data;
    });

    if (store.getters.isRoleSuperAdmin) {
      store.dispatch('getPostbackValue').then((response) => {
        postbackValue.value = response.data;
        modal.postback = response.data;
      });

      store.dispatch('getBitcoinValue').then((response) => {
        bitcoinValue.value = response.data;
        modal.bitcoin = response.data;
      });
    }

    return {
      provider,
      currencies,
      postbackValue,
      bitcoinValue,
      modal,
      openEditCurrencyValueModal,
      openEditPostbackValueModal,
      openEditBitcoinValueModal,
      updateCurrencyValue,
      updatePostbackValue,
      updateBitcoinValue,
      changeCurrency,
    };

    function openEditCurrencyValueModal() {
      if (! currencies.value) {
        return;
      }

      modal.currencies = {
        currency: currencies.value[0],
        currency_value: {},
      }

      changeCurrency();
      modal.type = 'currencies';
      modal.visible = true;
    }

    function openEditPostbackValueModal() {
      modal.visible = true;
      modal.postback = postbackValue.value;
      modal.type = 'postback';
    }

    function openEditBitcoinValueModal() {
      modal.visible = true;
      modal.bitcoin = bitcoinValue.value;
      modal.type = 'bitcoin';
    }

    function updateCurrencyValue() {
      const payload = {
        currency_id: modal.currencies.currency.id,
        ...modal.currencies.currency_value
      }

      store.dispatch('updateCurrencyValue', payload).then((response) => {
        modal.visible = false;
        currencies.value.find((currency) => currency.id === response.data.currency_id).currency_value = response.data;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Currency value saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          });
        }
      });
    }

    function updatePostbackValue() {
      store.dispatch('updatePostbackValue', modal.postback).then((response) => {
        modal.visible = false;
        postbackValue.value = response.data;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Postback value saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors && err.response.data.errors.postback)
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.errors.postback[0],
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
      });
    }

    function updateBitcoinValue() {
      store.dispatch('updateBitcoinValue', modal.bitcoin).then((response) => {
        modal.visible = false;
        bitcoinValue.value = response.data;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Bitcoin value saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors && err.response.data.errors.bitcoin)
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.errors.bitcoin[0],
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
      });
    }

    function changeCurrency() {
      store.state.rewards.forEach((reward) => {
        if (reward.provider !== 'robux' && reward.provider !== 'bitcoin') {
          modal.currencies.currency_value[reward.provider] = modal.currencies.currency.currency_value ? modal.currencies.currency.currency_value[reward.provider] : 0;
        }
      });
    }
  },
}
</script>