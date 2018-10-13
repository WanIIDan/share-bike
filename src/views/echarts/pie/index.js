import React, { Component } from 'react';
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts' // 引入echarts核心包
import lightTheme from '../themeLight' // 引入主题
import 'echarts/lib/chart/pie' // 引入饼图组件
import 'echarts/lib/component/legend' // 引入legend组件
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import ReactEcharts from 'echarts-for-react' // 引入第三方封装好的针对于react的库

export default class Pie extends Component {

    componentWillMount() {
        echarts.registerTheme('小苹果', lightTheme)
    }

    pie1 = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: '20',
                right: '20',
                data: ['周一','周二','周三','周四','周五', '周六', '周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:2000, name:'周一'},
                        {value:4000, name:'周二'},
                        {value:6000, name:'周三'},
                        {value:3800, name:'周四'},
                        {value:12000, name:'周五'},
                        {value:5000, name:'周六'},
                        {value:8000, name:'周日'},
                    ],
                }
            ]
        }
    }

    pie2 = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: '20',
                right: '20',
                data: ['周一','周二','周三','周四','周五', '周六', '周日']
            },
            series: [
                {
                    name: '骑行订单',
                    type:'pie',
                    radius: ['50%', '70%'],
                    data:[
                        {value:3500, name:'周一'},
                        {value:5800, name:'周二'},
                        {value:6600, name:'周三'},
                        {value:7500, name:'周四'},
                        {value:11000, name:'周五'},
                        {value:8000, name:'周六'},
                        {value:5000, name:'周日'},
                    ],
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Card title="饼状图一">
                    <ReactEcharts option={this.pie1()} theme="小苹果"></ReactEcharts>
                </Card>
                <Card title="饼状图二">
                    <ReactEcharts option={this.pie2()} theme="小苹果"></ReactEcharts>
                </Card>
            </div>
        )
    }
}


