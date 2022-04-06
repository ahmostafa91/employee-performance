<template>
    <div class="c-chart__container">
      <v-chart ref="chart" :option="chartOptions" />
    </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { mapGetters } from 'vuex'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },

  data() {
    return {
      chartData: [],
    };
  },
  watch: {
    performanceData(val) {
      this.chartData = val
    },
    dateOptions(val) {
      if(val.startDate && val.endDate) {
        const start = new Date(val.startDate);
        const end = new Date(val.endDate);

        /// check if end after start
        if(start - end < 0) {
          let selectedData = [];
          this.chartData.forEach(obj => {
            if(obj.date_ms >= new Date(start).getTime() && obj.date_ms <= new Date(end).getTime()) {
              selectedData.push(obj);
            }
          })

          this.chartData = selectedData
        }

      }
    }
  },

  computed: {
    ...mapGetters({
    dateOptions: 'getterDateOptions',
    performanceData: 'getterPerformance'
    }),
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        visualMap: {
          top: 50,
          right: 0,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: 'red'
            },
            {
              gt: 50,
              lte: 80,
              color: 'yellow'
            },
            {
              gt: 80,
              lte: 100,
              color: 'green'
            }
          ]
        },
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            name: 'team preformance',
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
    },

    xAxisData() {
      return this.chartData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.chartData.map((item) => +item.performance * 100);
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
  },

  mounted() {
    this.chartData =  this.$store.state.preformance.performance
  },
  created() {
    this.$store.dispatch('getPerformance')
  }
};
</script>
