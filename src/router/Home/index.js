import React, { PureComponent } from 'react';
import './index.scss'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';

class Home extends PureComponent {
    componentDidMount () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('faultTypeMain'));
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            xAxis: {
                data: ['Mon Fed 11', 'Mon Fed 13', 'Mon Fed 15', 'Mon Fed 17']
            },
            yAxis: {},
            series: [{
                name: '系统',
                type: 'bar',
                color: 'yellow',
                data: [5, 20, 36, 10]
            }, {
                name: '设备',
                type: 'bar',
                data: [5, 20, 36, 10]
            }, {
                name: '通讯',
                type: 'bar',
                data: [5, 20, 36, 10]
            }, {
                name: '数据',
                type: 'bar',
                data: [5, 20, 36, 10]
            }]
        });
    }

    render () {
        return (
            <div className="home">
                <div className="main">
                    <div>
                        <p>在线统计</p>
                        <div id="onlineMain" style={{ width: 400, height: 400 }}></div>
                    </div>
                    <div>
                        <p>故障统计</p>
                    </div>
                    <div>
                        <p>网关型号统计</p>
                    </div>
                    <div>
                        <p>故障类型统计</p>
                        <div id="faultTypeMain" style={{ width: 600, height: 450 }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;