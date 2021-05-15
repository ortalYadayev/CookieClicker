<template>
  <teleport to="#modal">
    <transition name="fade">
      <div class="modal-overlay" @click="overlayClose ? $emit('update:visible', false) : ''" v-if="visible" />
    </transition>
    <transition name="fade">
      <div class="modal" :style="'--max-width:' + maxWidth" v-if="visible">
        <button @click="$emit('update:visible', false)" class="tw-absolute tw-text-sm" style="top: 12px; right: 12px">
          <fa-icon icon="times" />
        </button>
        <div class="inner-modal tw-relative tw-overflow-y-scroll-auto tw-overflow-x-hidden" style="max-height: 90vh">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import {  watch } from 'vue';

export default {
  name: 'VModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    maxWidth: {
      type: String,
      required: false,
      default: '600px',
    },
    overlayClose: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  setup(props) {
    watch(() => props.visible, () => {
      document.documentElement.style.overflow = props.visible ? 'hidden' : 'auto';
    });
  }
}
</script>

<style>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 998;

  @apply fixed top-0 left-0 right-0 bottom-0 overflow-auto;
}

.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  max-width: var(--max-width);
  border-radius: 16px;
  padding: 25px;

  @apply fixed w-full bg-white;

  h1 {
    font-size: 22px;

    @apply text-primary font-bold;
  }

  p {
    margin-bottom: 15px;
  }
}

@media (max-width: 499px) {
  .modal {
    max-width: 90vw;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.inner-modal::-webkit-scrollbar {
  display: block;
  width: 14px;
  height: 18px;
}

.inner-modal::-webkit-scrollbar-thumb {
  height: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 7px;
  background-color: rgba(19, 160, 101, 0.95);
  -webkit-box-shadow: inset -1px -1px 0 rgba(19, 160, 101, 0.95), inset 1px 1px 0 rgba(19, 160, 101, 0.95);
}

.inner-modal::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.inner-modal::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>