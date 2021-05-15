<template>
  <div class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="create">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="code">
              Code
            </label>
            <input id="code" type="text" placeholder="Code" autocomplete="off"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.code"
                   :class="{ 'input-invalid tw-mb-3' : v$.code.$invalid || ! modal.visible && errors.code }"
                   @keydown="resetErrors('code')"
            >
            <p v-if="v$.code.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.code.$errors[0].$message }}
            </p>
            <p v-else-if="! modal.visible && errors.code" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.code[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-mb-4 sm:tw-px-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="points">
              Points
            </label>
            <input id="points" type="number" min="1" placeholder="Points"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.points"
                   :class="{ 'input-invalid tw-mb-3' : v$.points.$invalid || ! modal.visible && errors.points }"
                   @keydown="resetErrors('points')"
            >
            <p v-if="v$.points.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.points.$errors[0].$message }}
            </p>
            <p v-else-if="! modal.visible && errors.points" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.points[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-mb-4 sm:tw-px-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="expiration">
              Expiration Date
            </label>
            <input id="expiration" type="date" placeholder="Expiration Date"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   style="height: 38px"
                   v-model="payload.expires_at"
                   :class="{ 'input-invalid tw-mb-3' : v$.expires_at.$invalid || ! modal.visible && errors.expires_at }"
                   @keydown="resetErrors('expires_at')"
            >
            <p v-if="v$.expires_at.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.expires_at.$errors[0].$message }}
            </p>
            <p v-else-if="! modal.visible && errors.expires_at" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.expires_at[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-1/4 tw-mb-4 sm:tw-pl-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="uses">
              Max Usages
            </label>
            <input id="uses" type="number" min="0" placeholder="Max Usages"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.max_usages"
                   :class="{ 'input-invalid tw-mb-3' : v$.max_usages.$invalid || ! modal.visible && errors.max_usages }"
                   @keydown="resetErrors('max_usages')"
            >
            <p v-if="v$.max_usages.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.max_usages.$errors[0].$message }}
            </p>
            <p v-else-if="! modal.visible && errors.max_usages" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.max_usages[0] }}
            </p>
          </div>
        </div>
        <div class="tw-w-full tw-text-center">
          <button class="tw-h-full tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="full-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Code</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Points</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40 ">Expiration</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Uses</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Status</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="promoCodesObj.promo_codes" v-for="(promoCode, index) in promoCodesObj.promo_codes" :key="index"  class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="promoCode.code" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="promoCode.formatted_points" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="promoCode.formatted_expires_at" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3">
            {{ promoCode.uses }}/<template v-if="promoCode.max_usages > 0">
              {{ promoCode.max_usages }}
            </template>
            <template v-else>
              <fa-icon icon="infinity" />
            </template>
          </td>
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3">
            <div class="tw-text-xs tw-rounded-xl tw-text-white tw-font-bold tw-text-center tw-inline-block tw-w-20 tw-px-4 tw-py-1"
                 :class="promoCode.is_active ? 'tw-bg-green-500' : 'tw-bg-red-500'"
            >
              {{ promoCode.is_active ? 'Active' : 'Inactive' }}
            </div>
          </td>
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="openEditModal(promoCode)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2">
                <fa-icon icon="cog" />
              </button>
              <button @click="destroy(promoCode)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500">
                <fa-icon :icon="['far', 'trash-alt']" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! promoCodesObj.promo_codes" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="promoCodesObj.pagination" v-model="page" :records="promoCodesObj.pagination.total" :per-page="promoCodesObj.pagination.per_page" @paginate="getPromoCodes" :options="{ chunk: 5, edgeNavigation: true }" />
  <VModal v-model:visible="modal.visible">
    <form @submit.prevent="edit" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_code">
            Code
          </label>
          <input id="edit_code" type="text" placeholder="Code"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.code"
                 :class="{ 'input-invalid tw-mb-3' : v2$.code.$invalid || errors.code }"
                 @keydown="resetErrors('code')"
          >
          <p v-if="v2$.code.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v2$.code.$errors[0].$message }}
          </p>
          <p v-else-if="errors.code" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.code[0] }}
          </p>
        </div>
        <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pl-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_points">
            Points
          </label>
          <input id="edit_points" type="number" min="1" max="999999" placeholder="Points"
                 onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.points"
                 :class="{ 'input-invalid tw-mb-3' : v2$.points.$invalid || errors.points }"
                 @keydown="resetErrors('points')"
          >
          <p v-if="v2$.points.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v2$.points.$errors[0].$message }}
          </p>
          <p v-else-if="errors.points" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.points[0] }}
          </p>
        </div>
      </div>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_expiration">
            Expiration Date
          </label>
          <input id="edit_expiration" type="date" placeholder="Expiration Date"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 style="height: 38px"
                 v-model="modal.expires_at"
                 :class="{ 'input-invalid tw-mb-3' : v2$.expires_at.$invalid || errors.expires_at }"
                 @keydown="resetErrors('expires_at')"
          >
          <p v-if="v2$.expires_at.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v2$.expires_at.$errors[0].$message }}
          </p>
          <p v-else-if="errors.expires_at" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.expires_at[0] }}
          </p>
        </div>
        <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pl-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_uses">
            Max Usages
          </label>
          <input id="edit_uses" type="number" min="0" max="999999" placeholder="Max Usages"
                 onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.max_usages"
                 :class="{ 'input-invalid tw-mb-3' : v2$.max_usages.$invalid || errors.max_usages }"
                 @keydown="resetErrors('max_usages')"
          >
          <p v-if="v2$.max_usages.$error" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ v2$.max_usages.$errors[0].$message }}
          </p>
          <p v-else-if="errors.max_usages" class="tw-text-red-500 tw-text-xs tw-italic">
            {{ errors.max_usages[0] }}
          </p>
        </div>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
  </VModal>
</template>

<script>
import dayjs from "dayjs";
import Pagination from 'v-pagination-3';
import VModal from '@/components/VModal';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { Roles } from '@/_helpers/roles';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef, watch } from 'vue';

export default {
  name: 'Admin.PromoCodes',
  components: {
    Pagination,
    VModal,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const promoCodesObj = ref({});
    const page = ref(1);
    const payload = reactive({
      code: '',
      points: null,
      expires_at: null,
      max_usages: null,
    });
    const modal = reactive({
      promo_code: null,
      visible: false,
      code: '',
      points: null,
      expires_at: null,
      max_usages: null,
    });

    const errors = ref({});

    const rules = {
      code: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
      points: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(999999),
      },
      expires_at: {
        required,
      },
      max_usages: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(999999),
      },
    };

    const v$ = useVuelidate(rules, {
      code: toRef(payload, 'code'),
      points: toRef(payload, 'points'),
      expires_at: toRef(payload, 'expires_at'),
      max_usages: toRef(payload, 'max_usages'),
    });

    const v2$ = useVuelidate(rules, {
      code: toRef(modal, 'code'),
      points: toRef(modal, 'points'),
      expires_at: toRef(modal, 'expires_at'),
      max_usages: toRef(modal, 'max_usages'),
    });

    watch(() => modal.visible, () => {
      errors.value = {};
      v$.value.$reset();
      v2$.value.$reset();
    });

    getPromoCodes();

    return {
      Roles,
      promoCodesObj,
      page,
      payload,
      modal,
      errors,
      v$,
      v2$,
      getPromoCodes,
      openEditModal,
      destroy,
      create,
      edit,
      resetErrors,
    };

    function getPromoCodes() {
      delete promoCodesObj.value.promo_codes;

      store.dispatch('getPromoCodes', page.value).then((response) => {
        promoCodesObj.value = response.data;
      });
    }

    function openEditModal(promoCode) {
      const date = dayjs(promoCode.expires_at);

      modal.promo_code = promoCode;
      modal.visible = true;
      modal.code = promoCode.code;
      modal.points = promoCode.points;
      modal.max_usages = promoCode.max_usages;
      modal.expires_at = `${date.year()}-${date.month() + 1}-${date.date()}`;
    }

    function destroy(promoCode) {
      store.dispatch('deletePromoCode', promoCode.code).then(() => {
        promoCodesObj.value.promo_codes.splice(promoCodesObj.value.promo_codes.indexOf(promoCode), 1);
        promoCodesObj.value.pagination.total--;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Promo code removed successfully!',
        });

        if (page.value > 1 && promoCodesObj.value.pagination.total <= 10) {
          page.value = 1;

          getPromoCodes();
        }
      });
    }

    function create() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      store.dispatch('storePromoCode', payload).then((response) => {
        v$.value.$reset();

        payload.code = '';
        payload.points = null;
        payload.expires_at = null;
        payload.max_usages = null;
        response.data.promo_code.uses = 0;
        promoCodesObj.value.promo_codes.unshift(response.data.promo_code);
        promoCodesObj.value.pagination.total++;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Promo code created successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data.errors) {
          errors.value = err.response.data.errors;
        }
      });
    }

    function edit() {
      v2$.value.$touch();

      if (v2$.value.$invalid) {
        return;
      }

      errors.value = {};

      const payload = {
        promo_code_id: modal.promo_code.id,
        code: modal.code,
        points: modal.points,
        expires_at: modal.expires_at,
        max_usages: modal.max_usages,
      };

      store.dispatch('updatePromoCode', payload).then((response) => {
        modal.visible = false;
        modal.promo_code.code = response.data.promo_code.code;
        modal.promo_code.points = response.data.promo_code.points;
        modal.promo_code.expires_at = response.data.promo_code.expires_at;
        modal.promo_code.formatted_expires_at = response.data.promo_code.formatted_expires_at;
        modal.promo_code.uses = response.data.promo_code.uses;
        modal.promo_code.max_usages = response.data.promo_code.max_usages;
        modal.promo_code.is_active = response.data.promo_code.is_active;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Promo code saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            errors.value = {
              'max_usages': [err.response.data.message],
            }
          }
        }
      });
    }

    function resetErrors(key) {
      (modal.visible ? v2$ : v$).value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>
