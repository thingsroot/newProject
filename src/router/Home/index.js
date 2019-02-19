import React, { PureComponent } from 'react';
import './index.scss'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import { Tabs, Table  } from 'antd';

const TabPane = Tabs.TabPane;

const columns = [{
    title: '序号',
    dataIndex: 'num',
    width: 150
}, {
    title: '名称',
    dataIndex: 'name',
    width: 150
}, {
    title: '位置',
    dataIndex: 'address'
}, {
    title: '最后上线时间',
    dataIndex: 'lastTime'
}, {
    title: '次数',
    dataIndex: 'count'
}];
const data = [
    {num: 1, name: 'gates', address: 'qwe', lastTime: '2019-2-18 17:56:00', count: 3}
]


class Home extends PureComponent {
    componentDidMount () {
        var myFaultTypeChart = echarts.init(document.getElementById('faultTypeMain'));
        myFaultTypeChart.setOption({
            legend: {
                data: ['系统', '设备', '通讯', '数据']
            },
            xAxis: {
                data: ['Mon Fed 11', 'Mon Fed 13', 'Mon Fed 15', 'Mon Fed 17']
            },
            yAxis: {},
            series: [{
                name: '系统',
                type: 'bar',
                color: 'red',
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

        var myOnlineChart = echarts.init(document.getElementById('onlineMain'));
        myOnlineChart.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '张三',
                type: 'line',
                data: [10, 27.6, 14.5, 1.7, 6.9, 9.7, 7.8]
            }, {
                name: '李四',
                type: 'line',
                data: [30, 14.38, 4.79, 13.01, 15.07, 13.7, 6.85]
            }, {
                name: '张三',
                type: 'line',
                data: [20, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8]
            }, {
                name: '李四',
                type: 'line',
                data: [20, 10.38, 6.79, 7.01, 15.07, 13.7, 9.85]
            }]
        });

        var myGatesChart = echarts.init(document.getElementById('gatesMain'));
        myGatesChart.setOption({
            legend: {
                data: ['Q102', '其他']
            },
            series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        {value: 30, name: 'Q102'},
                        {value: 70, name: '其他'}
                    ]
                }]
        });

    }

    render () {
        function callback (key) {
            console.log(key);
        }
        return (
            <div className="home">
                <div className="main">
                    <div className="echarts">
                        <p>在线统计</p>
                        <div id="onlineMain" style={{width: '45%', height: 400}}>  </div>
                    </div>
                    <div className="echarts">
                        <p>故障统计</p>
                        <div id="">
                            <Tabs onChange={callback} type="card">
                                <TabPane tab="前10的网关" key="1">
                                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                                </TabPane>
                                <TabPane tab="一周内故障最多" key="2">一周内故障最多</TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="echarts">
                        <p>网关型号统计</p>
                        <div id="gatesMain" style={{width: '45%', height: 400}}>  </div>
                    </div>
                    <div className="echarts">
                        <p>故障类型统计</p>
                        <div id="faultTypeMain" style={{width: '45%', height: 400}}>  </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;