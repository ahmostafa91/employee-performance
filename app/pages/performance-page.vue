<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      [Place filter component here]
      <label>Start date:</label>
      <input type="date" v-model="startD"/>
      <label>End date:</label>
      <input type="date" v-model="endD"/>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component />
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
  },
  data() {
    return {
      startD: '',
      endD: ''
    }
  },
  watch: {
    startD(val) {
      this.$store.dispatch('getStartDate', val)
    },
    endD(val) {
      this.$store.dispatch('getEndDate', val)
    }, 
  },
  computed: {

  },
};
</script>
