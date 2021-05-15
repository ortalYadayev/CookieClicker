<template>
  <span :id="id" />
</template>

<script>
import { CountUp } from 'countup.js';
import { ref, reactive, watch, nextTick } from 'vue';

export default {
  name: 'AnimatedNumber',
  props: {
    number: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
      default: 2,
    },
    decimals: {
      type: Number,
      required: false,
      default: 2,
    },
  },
  setup(props) {
    const id = ref((Math.random().toString(36) + Date.now().toString(36)).substr(2));
    const counter = ref(null);
    const options = reactive({
      useEasing: false,
      useGrouping: true,
      decimalPlaces: props.decimals > 0 ? countDecimals(props.number) : 0,
      duration: props.duration,
      startVal: 0,
    });

    nextTick(() => {
      counter.value = new CountUp(id.value, props.number, options).start();
    });

    watch(() => props.number, (newNumber, previousNumber) => {
      options.startVal = previousNumber;
      options.decimalPlaces = props.decimals > 0 ? countDecimals(props.number) : 0;
      counter.value = new CountUp(id.value, props.number, options).start();
    });

    return {
      id,
    }

    function countDecimals(value) {
      if (Math.floor(value) === value) {
        return 0
      }

      return value.toString().split(".")[1].length || 0;
    }
  }
}
</script>