<template>
  <form @submit.prevent="saveAccountDetails" class="tw-flex tw-flex-col">
    <div>
      <div class="tw-flex tw-items-center tw-duration-300" :class="{ 'tw-mb-3' : errors.profile_image }">
        <img v-if="user.profile_image"
             class="tw-object-cover tw-mr-4 tw-rounded-full tw-w-10 tw-h-10"
             :src="user.profile_image === auth.profile_image || auth.profile_image === null ? user.profile_image : URL.createObjectURL(auth.profile_image)"
             :alt="user.username"
        >
        <template v-if="! user.not_authenticated">
          <input class="tw-hidden" type="file" accept="image/*" ref="profilePicture" @change="handleProfilePicture">
          <button @click="$refs.profilePicture.click()"
                  type="button"
                  class="tw-flex tw-justify-center tw-items-center tw-text-xs md:tw-text-sm tw-border-2 tw-tracking-wider tw-duration-300 tw-rounded-full tw-px-4 tw-py-2"
                  :class="! errors.profile_image ? 'tw-border-primary tw-text-primary hover:tw-text-white hover:tw-bg-primary' : 'tw-border-red-500 tw-text-red-500 hover:tw-text-white hover:tw-bg-red-500'"
          >
            <fa-icon class="tw-h-4 fa-w-20 tw-mr-1" icon="file-upload" />
            Upload a photo
          </button>
        </template>
      </div>
      <p v-if="errors.profile_image" class="tw-text-red-500 tw-text-xs tw-italic">
        {{ errors.profile_image[0] }}
      </p>
    </div>
    <div class="tw-flex tw-flex-wrap tw-mt-5">
      <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
          Username
        </label>
        <input id="username" type="text" placeholder="Username"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               :value="user.username"
               disabled
        >
      </div>
      <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pl-2">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="email">
          Email
        </label>
        <input id="email" type="text" placeholder="Email" autocomplete="off"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.email"
               :class="{ 'input-invalid tw-mb-3' : v$.email.$invalid || errors.email }"
               @keydown="resetErrors('email')"
               :disabled="user.not_authenticated"
        >
        <p v-if="v$.email.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.email.$errors[0].$message }}
        </p>
        <p v-else-if="errors.email" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.email[0] }}
        </p>
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap">
      <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
        <label class="tw-flex tw-justify-between tw-flex-wrap tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="password">
          Password
          <button v-if="auth.confirmPassword === null && ! user.not_authenticated" @click="editPassword" type="button" class="tw-rounded-full tw-px-4 tw-mr-2 tw-bg-primary tw-text-white p-2 tw-leading-none tw-flex tw-items-center">
            Edit
          </button>
        </label>
        <input id="password" type="password" placeholder="Password"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               :class="{ 'input-invalid tw-mb-3' : v$.password.$invalid || errors.password }"
               v-model="auth.password"
               :disabled="auth.confirmPassword === null"
               @keydown="resetErrors('password')"
        >
        <p v-if="v$.password.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.password.$errors[0].$message }}
        </p>
        <p v-else-if="errors.password" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.password[0] }}
        </p>
      </div>
      <div v-if="auth.confirmPassword !== null" class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pl-2">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="confirm_password">
          Confirm Password
        </label>
        <input id="confirm_password" type="password" placeholder="Confirm Password"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.confirmPassword"
               :class="{ 'input-invalid tw-mb-3' : v$.confirmPassword.$invalid }"
               @keydown="resetErrors('confirmPassword')"
        >
        <p v-if="v$.confirmPassword.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          <template v-if="v$.confirmPassword.sameAsPassword.$invalid">
            Passwords must be identical
          </template>
          <template v-else>
            {{ v$.confirmPassword.$errors[0].$message }}
          </template>
        </p>
      </div>
    </div>
    <span v-if="user.two_factor_enabled_at" class="tw-text-xs tw-text-red-500">
      * Changing your email will disable 2FA security.
    </span>
    <button v-if="! user.not_authenticated" class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1 tw-mt-4" type="submit">
      Save
    </button>
  </form>
</template>

<script>
import Compressor from "compressorjs";
import { email, maxLength, minLength, required, requiredIf, sameAs } from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Profile.Details',
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();

    const auth = reactive({
      profile_image: props.user && props.user.profile_image ? props.user.profile_image : null,
      email: props.user && props.user.email ? props.user.email : '',
      password: '',
      confirmPassword: null,
    });

    const errors = ref({});

    const rules = {
      email: {
        required: required,
        email,
      },
      password: {
        required: requiredIf(() => auth.confirmPassword !== null),
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      confirmPassword: {
        required: requiredIf(() => auth.confirmPassword !== null),
        sameAsPassword: sameAs('', 'password'),
      },
    };

    const v$ = useVuelidate(rules, {
      email: toRef(auth, 'email'),
      password: toRef(auth, 'password'),
      confirmPassword: toRef(auth, 'confirmPassword'),
    });

    if (! props.user.not_authenticated) {
      store.dispatch('getLoggedUser').then(() => {
        auth.profile_image = store.state.user.profile_image;
        auth.email = store.state.user.email;
      });
    }

    return {
      auth,
      v$,
      errors,
      resetErrors,
      editPassword,
      handleProfilePicture,
      saveAccountDetails,
      URL,
    }

    async function handleProfilePicture(event) {
      resetErrors('profile_image')

      await new Promise((resolve, reject) => {
        new Compressor(event.target.files[0], {
          quality: 0.6,
          width: 255,
          height: 255,
          success(file) {
            auth.profile_image = file;
            resolve();
          },
          error: reject,
        });
      });

      if (auth.profile_image.size / 1024 > 5120) {
        errors.value.profile_image = ['The profile image must be smaller than 5MB.'];
      }
    }

    function saveAccountDetails() {
      v$.value.$touch();

      if (! auth.password && auth.confirmPassword === null || v$.value.confirmPassword.sameAsPassword.$invalid && auth.password === auth.confirmPassword) {
        v$.value.confirmPassword.$reset();
      }

      if (v$.value.$invalid && ! props.user.not_authenticated || errors.value.profile_image) {
        return;
      }

      const data = new FormData();
      data.append('_method', 'PUT');
      data.append('email', auth.email);
      data.append('profile_image', auth.profile_image);

      if (auth.confirmPassword !== null) {
        data.append('password', auth.password);
      }

      store.dispatch('updateUser', data).then(() => {
        props.user.profile_image = store.state.user.profile_image;
        props.user.two_factor_enabled_at = store.state.user.two_factor_enabled_at;
        auth.profile_image = store.state.user.profile_image;
        auth.email = store.state.user.email;
        auth.password = '';
        auth.confirmPassword = null;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Details updated successfully!'
        });
      }).catch((err) => {
        store.dispatch('addNotification', {
          type: 'error',
          message: "You've got errors!"
        });

        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            errors.value = {
              'password': [err.response.data.message],
            }
          }
        } else if (err.response.status === 413) {
          errors.value.profile_image = ['The profile image must be smaller than 5MB.'];
        }
      });
    }

    function editPassword() {
      auth.confirmPassword = '';
      resetErrors('password');
      resetErrors('confirmPassword');
    }

    function resetErrors(key) {
      if (v$.value[key]) {
        v$.value[key].$reset();
      }
      delete errors.value[key];
    }
  },
}
</script>
