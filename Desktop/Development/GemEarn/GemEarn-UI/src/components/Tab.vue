<template>
   <div v-if="isActive">
     <slot />
   </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Tab',
  props: {
    query: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    return {
      isActive: ref(props.selected),
    }
  },
  created() {
    this.$parent.tabs.push(this);
  },
}
</script>