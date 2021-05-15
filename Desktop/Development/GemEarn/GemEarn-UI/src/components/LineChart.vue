<template>
  <div class="full-size-table" style="position: relative; height: 400px;">
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import { onMounted } from 'vue'

export default {
  name: 'LineChart',
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    onMounted(() => {
      const ctx = document.querySelector('#line-chart').getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: props.data,
        options: props.options,
      });
    });
  },
}
</script>