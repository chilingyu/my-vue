import { onBeforeUnmount, onMounted, Ref, ref, markRaw } from 'vue';
import * as echarts from 'echarts';

// 组合式echarts图表
export function useCharts(chartRef: Ref<HTMLElement | null>, setChartData: any) {
    // 基于准备好的dom，初始化echarts实例
    const chartInstance = ref<echarts.ECharts|null>(null);

    const initChart= async ()=>{
        if(chartRef.value){
            const options = await setChartData();
            // 取消vue的响应式（因为和echarts的响应式冲突了）
            chartInstance.value = markRaw(echarts.init(chartRef.value));
            chartInstance.value.setOption(options)
        }
    }

    const resizeChart = ()=>{
        chartInstance.value?.resize();
    }

    onMounted(()=>{
        initChart();
        window.addEventListener("resize",resizeChart);
    })

    onBeforeUnmount(()=>{
        // 清除窗口响应
        window.removeEventListener("resize",resizeChart);
        if(chartInstance.value){
            // 释放图表占用资源
            chartInstance.value.dispose();
        }
    })
}