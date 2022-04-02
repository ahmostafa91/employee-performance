import { shallowMount } from '@vue/test-utils';
import PerformanceChartComponent from '../../components/vue-components/performance-chart.vue';

describe('Performance Chart Test', () => {
  it('check the name of the component', () => {
    // render the component
    const wrapper = shallowMount(PerformanceChartComponent, {
      propsData: {
        chartData: [],
      },
    });
    expect(wrapper.vm.$options.name).toMatch('PerformanceChartComponent');
  });
});
