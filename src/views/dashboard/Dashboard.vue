<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    <h3>今日设备更新状态</h3>
                    <p class="ml">更新时间:{{ formattedDate }}</p>
                    <el-icon color="#86909c" style="margin-left: 5px;">
                        <component is="Refresh"></component>
                    </el-icon>
                </div>
                <div class="equipment">
                    <div class="item">
                        <h4 class="mt mb">充电桩使用率</h4>
                        <img :src="flash" alt="" class="mt mb" />
                        <h1 class="mb">2263/3398</h1>
                        <div class="statistic-card">
                            <el-statistic :value="9">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="green">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">充电柜使用率</h4>
                        <img :src="flash2" alt="" class="mt mb" />
                        <h1 class="mb">655/1233</h1>
                        <div class="statistic-card">
                            <el-statistic :value="22">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="red">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">充电站使用率</h4>
                        <img :src="flash3" alt="" class="mt mb" />
                        <h1 class="mb">72/95</h1>
                        <div class="statistic-card">
                            <el-statistic :value="47">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        14%
                                        <el-icon color="green">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>常用功能</h1>
                    </div>
                </template>
                <div class="quick mt mb">
                    <el-row>
                        <el-col :span="4">
                            <img :src="repair">
                            <p>设备维修</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="daily">
                            <p>每日日报</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="progress">
                            <p>任务进度</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="total">
                            <p>营收占比</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="money">
                            <p>营收统计</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="remain">
                            <p>代办事项</p>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>能源统计</h1>
                    </div>
                </template>
                <el-row>
                    <el-col :span="9">
                        <div ref="chartRef2" style="width: 100%;height: 400px;"></div>
                    </el-col>
                    <el-col :span="15">
                        <div ref="chartRef" style="width: 100%;height: 400px;"></div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h1>设备总览</h1>
                    </div>
                </template>
                <div ref="chartRef3" style="width:100%;height: 195px;"></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-heder">
                        <h1>营收统计表</h1>
                    </div>
                </template>
                <ul class="ranking-list">
                    <li class="ranking-item">
                        <span class="rank" style="background-color: rgb(103, 194, 58);color: #fff;">1</span>
                        <span class="store-name">广州</span>
                        <span class="sales">52,457</span>
                        <span style="margin-left:50px">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color:rgb(64, 158, 255) ;color: #fff ;">2</span>
                        <span class="store-name">上海</span>
                        <span class="sales">323,234</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color:rgb(230, 162, 60) ;color: #fff ;">3</span>
                        <span class="store-name">佛山</span>
                        <span class="sales">192,255</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">4</span>
                        <span class="store-name">珠海</span>
                        <span class="sales">17,540</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">5</span>
                        <span class="store-name">深圳</span>
                        <span class="sales">662,337</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">6</span>
                        <span class="store-name">厦门</span>
                        <span class="sales">22,941</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">7</span>
                        <span class="store-name">长沙</span>
                        <span class="sales">565,221</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                </ul>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-heder">
                        <h1>故障报警</h1>
                    </div>
                </template>
                <el-timeline style="max-width: 600px">
                    <el-timeline-item timestamp="2024/4/12" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>矿业北路通讯中断</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2024/2/3" placement="top" :hollow="true" type="warning">
                        <el-card>
                            <h4>黄河南路超出服务区域</h4>

                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2024/5/17" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>6号机组异常断电</h4>

                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import flash from "@/assets/flash.png"
import flash2 from "@/assets/flash2.png"
import flash3 from "@/assets/flash3.png"
import repair from "@/assets/repair.png"
import progress from "@/assets/progress.png"
import remain from "@/assets/remain.png"
import total from "@/assets/total.png"
import money from "@/assets/money.png"
import daily from "@/assets/daily.png"
import { useCharts } from '@/hooks/useCharts'
import * as echarts from 'echarts';
import { chartDataApi, chartDataApi2, chartDataApi3 } from '@/api/dashboard'

const chartRef = ref(null)
const chartRef2 = ref(null)
const chartRef3 = ref(null)

let bgColor = "#fff";
let color = [
    "#0090FF",
    "#36CE9E",
    "#FFC005",
    "#FF515A",
    "#8B5CFF",
    "#00CA69"
];

const hexToRgba = (hex: string, opacity: number) => {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
            "0x" + hex.slice(3, 5)
        )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
}

const setChartData = async () => {
    const chartOptions: any = reactive({
        backgroundColor: bgColor,
        color: color,
        legend: {
            top: 10,
            data: []
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params: any[]) {
                let html = '';
                params.forEach(v => {
                    html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                ${v.seriesName}
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                kw`;
                })
                return html
            },
            extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: '#ffffff',
                    shadowColor: 'rgba(225,225,225,1)',
                    shadowBlur: 5
                }
            }
        },
        grid: {
            top: 80,
            left: 10,
            containLabel: true
        },
        xAxis: [{
            type: "category",
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "#333"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#D9D9D9"
                }
            },
            data: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '16:00',]
        }],
        yAxis: [{
            type: "value",
            name: '电量统计',
            axisLabel: {
                formatter: '{value}kw',
                textStyle: {
                    color: "#666"
                }
            },
            nameTextStyle: {
                color: "#666",
                fontSize: 12,
                lineHeight: 40
            },
            splitLine: {
                lineStyle: {
                    type: "dashed",
                    color: "#E9E9E9"
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            name: "",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
                normal: {
                    color: color[0],
                    shadowBlur: 3,
                    shadowColor: hexToRgba(color[0], 0.5),
                    shadowOffsetY: 8
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                            offset: 0,
                            color: hexToRgba(color[0], 0.3)
                        },
                        {
                            offset: 1,
                            color: hexToRgba(color[0], 0.1)
                        }
                        ],
                        false
                    ),
                    shadowColor: hexToRgba(color[0], 0.1),
                    shadowBlur: 10
                }
            },
            data: []
        },
        {
            name: "",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
                normal: {
                    color: color[1],
                    shadowBlur: 3,
                    shadowColor: hexToRgba(color[1], 0.5),
                    shadowOffsetY: 8
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                            offset: 0,
                            color: hexToRgba(color[1], 0.3)
                        },
                        {
                            offset: 1,
                            color: hexToRgba(color[1], 0.1)
                        }
                        ],
                        false
                    ),
                    shadowColor: hexToRgba(color[1], 0.1),
                    shadowBlur: 10
                }
            },
            data: []
        },
        {
            name: "",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
                normal: {
                    color: color[2],
                    shadowBlur: 3,
                    shadowColor: hexToRgba(color[2], 0.5),
                    shadowOffsetY: 8
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                            offset: 0,
                            color: hexToRgba(color[2], 0.3)
                        },
                        {
                            offset: 1,
                            color: hexToRgba(color[2], 0.1)
                        }
                        ],
                        false
                    ),
                    shadowColor: hexToRgba(color[2], 0.1),
                    shadowBlur: 10
                }
            },
            data: []
        }]
    })
    const res = await chartDataApi();
    chartOptions.legend.data = res.data.list.map((item: any) => item.name)
    for (let i = 0; i < res.data.list.length; i++) {
        chartOptions.series[i].name = res.data.list[i].name
        chartOptions.series[i].data = res.data.list[i].data
    }
    return chartOptions
}
useCharts(chartRef, setChartData);

const setChartData2 = async () => {
    const chartOptions: any = reactive({
        legend: {
            top: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c}'
        },
        graphic: {
            type: 'text',
            top: 'center',
            left: 'center',
            style: {
                text: '营收占比',
                fontSize: 20,
                fill: '#333'
            }
        },
        series: [
            {
                name: '营收占比',
                type: 'pie',
                color: ['#62bfd9', '#4d6fbe', '#4fb894'],
                radius: ['30%', '50%'],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 4
                },
                emphasis: {
                    show: false
                },
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                data: []
            }
        ]
    })
    const res = await chartDataApi2();
    chartOptions.series[0].data = res.data.list
    return chartOptions
}

useCharts(chartRef2, setChartData2);

const setChartData3 = async () => {
    const chartOptions: any = reactive({
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '闲置数', max: 65 },
                { name: '使用数', max: 160 },
                { name: '故障数', max: 300 },
                { name: '维修数', max: 380 },
                { name: '更换数', max: 520 },
                { name: '报废数', max: 250 }
            ]
        },
        series: [
            {
                name: '设备总览',
                type: 'radar',
                data: [
                    {
                        value: [],
                        name: '设备总览'
                    },
                ]
            }
        ]
    });

    const res = await chartDataApi3();
    chartOptions.series[0].data[0].value = res.data.list
    return chartOptions
}

useCharts(chartRef3, setChartData3)

const today = new Date();
const formattedDate = ref(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
);

console.log(555,import.meta.env.VITE_API_URL)
</script>

<style scoped lang="less">
.title {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    align-items: flex-end;

    p {
        color: #86909c;
    }
}

.equipment {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .item {
        h1 {
            font-size: 36px;
        }

        :deep(.el-statistic_content) {
            margin-top: 10px !important;
            margin-bottom: 10px;
        }
    }
}

.quick {
    margin-top: 30px;
    text-align: center;

    p {
        margin-top: 10px;
        color: #333;
    }
}

.ranking-list {
    .ranking-item {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .rank {
            display: inline-block;
            font-weight: bold;
            color: #666;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
        }

        .store-name {
            flex-grow: 1;
            padding: 0 10px;
        }

        .sales {
            color: #666;
        }
    }

    .ranking-item:nth-child(even) {
        background-color: rgb(253, 246, 236);
    }
}
</style>