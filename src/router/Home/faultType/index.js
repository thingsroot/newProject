import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';

class FaultType extends PureComponent {
    componentDidMount () {
        var myChart = echarts.init(document.getElementById('faultTypeMain'));
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
            <div id="faultTypeMain" style={{ width: 600, height: 450 }}></div>
        );
    }
}

export default FaultType;