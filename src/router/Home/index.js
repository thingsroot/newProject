import React, { PureComponent } from 'react';
import './index.scss'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import { Tabs, Table } from 'antd';
import http from '../../utils/Server';

const TabPane = Tabs.TabPane;
const columns = [{
    title: '序号',
    key: 'index',
    render: (text, record, index)=>`${index + 1}`
}, {
    title: '名称',
    dataIndex: 'name',
    className: 'longWidth',
    key: 'longWidth'
}, {
    title: '位置',
    dataIndex: 'position',
    className: 'thWidth',
    key: 'position'
}, {
    title: '最后上线时间',
    dataIndex: 'last_updated',
    className: 'longWidth',
    key: 'last_updated'
}, {
    title: '次数',
    dataIndex: 'today',
    className: 'thWidth',
    key: 'today'
}, {
    title: '序列号',
    dataIndex: 'sn',
    className: 'hidden',
    key: 'sn'
}];

class Home extends PureComponent {
    state = {
        todayData: [],
        weekData: [],
        pieData: [],
        barData: [],
        timeData: []
    };

    componentDidMount () {
        //饼状图数据
        http.get('api/method/iot_ui.iot_api.device_type_statistics').then(res=>{
            // console.log(res);
            this.setState({
                pieData: res.message
            })
            let myGatesChart = echarts.init(document.getElementById('gatesMain'));
            myGatesChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    data: ['Q102', '其他']
                },
                series: [{
                    name: '设备类型',
                    type: 'pie',
                    radius: '55%',
                    color: ['#3CB2EF', '#FFD85C'],
                    data: [
                        {value: this.state.pieData['Q102'], name: 'Q102'},
                        {value: this.state.pieData['VBOX'], name: '其他'}
                    ]
                }]
            });

        });
        // 在线数据
        http.get('api/method/iot_ui.iot_api.device_status_statistics').then(res=>{
            // console.log(res);
            this.setState({
                timeData: res.message
            });
            let online = [];
            let offline = [];
            this.state.timeData.map((v)=>{
                online.push(v.online);
                offline.push(v.offline);
            });
            // console.log(online);
            // console.log(offline);
            let myOnlineChart = echarts.init(document.getElementById('onlineMain'));
            myOnlineChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'time',
                    axisLabel: {
                        rotate: 50,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    boundaryGap: ['20%', '20%']
                },
                toolbox: {
                    left: 'center',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [{
                    name: 'Online',
                    type: 'line',
                    smooth: true,
                    data: online,
                    lineStyle: {
                        color: '#50a3ba'
                    }
                },
                    {
                        name: 'Offline',
                        type: 'line',
                        smooth: true,
                        data: offline,
                        lineStyle: {
                            color: '#eac736'
                        }
                    }]
            });
        });
        //柱状图数据
        http.get('api/method/iot_ui.iot_api.device_event_type_statistics').then(res=>{
            // console.log(res);
            this.setState({
                barData: res.message
            });
            let data1 = [];
            let data2 = [];
            let data3 = [];
            let data4 = [];
            this.state.barData.map((v) =>{
                data1.push(v['系统']);
                data2.push(v['设备']);
                data3.push(v['通讯']);
                data4.push(v['数据']);
            });
            let myFaultTypeChart = echarts.init(document.getElementById('faultTypeMain'));
            myFaultTypeChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
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
                    color: '#37A2DA',
                    data: data1
                }, {
                    name: '设备',
                    type: 'bar',
                    color: '#67E0E3',
                    data: data2
                }, {
                    name: '通讯',
                    type: 'bar',
                    color: '#FFDB5C',
                    data: data3
                }, {
                    name: '数据',
                    type: 'bar',
                    color: '#FF9F7F',
                    data: data4
                }]
            });
        });

        function getBeforeDate (n){//n为你要传入的参数，当前为0，前一天为-1，后一天为1
            let date = new Date() ;
            let year, month, day ;
            date.setDate(date.getDate() + n);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate() ;
            let s = year + '-' + ( month < 10 ? ( '0' + month ) : month ) + '-' + ( day < 10 ? ( '0' + day ) : day) ;
            return s ;
        }
        // 前10网关
        http.get('api/method/iot_ui.iot_api.device_event_count_statistics').then(res=>{
            // console.log(res.message)
            let data = [];
            let t = getBeforeDate(0);
            res.message.map((v)=>{
                if (v.today !== '0' && v.last_updated.indexOf(t) !== -1){
                    data.push(v)
                }
            });
            data = data.splice(0, 10);
            this.setState({
                todayData: data
            })
        });
        //一周内故障最多的网关
        http.get('/api/method/iot_ui.iot_api.device_event_count_statistics').then(res=>{
            // console.log(res.message)
            let data = [];
            let t = getBeforeDate(0);
            let t1 = getBeforeDate(-1);
            let t2 = getBeforeDate(-2);
            let t3 = getBeforeDate(-3);
            let t4 = getBeforeDate(-4);
            let t5 = getBeforeDate(-5);
            let t6 = getBeforeDate(-6);
            // console.log(res);
            res.message.map((v)=>{
                if (v.last_updated.indexOf(t) !== -1 ||
                    v.last_updated.indexOf(t1) !== -1 ||
                    v.last_updated.indexOf(t2) !== -1 ||
                    v.last_updated.indexOf(t3) !== -1 ||
                    v.last_updated.indexOf(t4) !== -1 ||
                    v.last_updated.indexOf(t5) !== -1 ||
                    v.last_updated.indexOf(t6) !== -1 ){
                    if (v.today !== '0'){
                        data.push(v)
                    }
                }
            });
            data = data.splice(0, 10);
            this.setState({
                weekData: data
            })
        });
    }
    render () {
        let todayData = this.state.todayData;
        let weekData = this.state.weekData;
        function callback (key) {
            console.log(key);
        }
        return (
            <div className="home">
                <div className="main">
                    <div className="echarts"
                        style={{width: '49%'}}
                    >
                        <p>在线统计</p>
                        <div id="onlineMain"
                            style={{width: '92%',
                            height: 400}}
                        >  </div>
                    </div>
                    <div className="echarts"
                        style={{width: '49%'}}
                    >
                        <p>故障统计</p>
                        <div id="">
                            <Tabs onChange={callback}
                                type="card"
                            >
                                <TabPane tab="前10的网关"
                                    key="1"
                                >
                                    <Table
                                        columns={columns}
                                        dataSource={todayData}
                                        size="small"
                                        style={{width: '100%'}}
                                        pagination={false}
                                        scroll={{ y: 280 }}
                                        locale={{emptyText: '暂无数据'}}
                                    />
                                </TabPane>
                                <TabPane tab="一周内故障最多"
                                    key="2"
                                >
                                    <Table
                                        columns={columns}
                                        dataSource={weekData}
                                        size="small"
                                        style={{width: '100%'}}
                                        pagination={false}
                                        scroll={{ y: 280 }}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="echarts"
                        style={{width: '49%'}}
                    >
                        <p>网关型号统计</p>
                        <div id="gatesMain"
                            style={{width: '92%', height: 400}}
                        >  </div>
                    </div>
                    <div className="echarts"
                        style={{width: '49%'}}
                    >
                        <p>故障类型统计</p>
                        <div id="faultTypeMain"
                            style={{width: '92%', height: 400}}
                        >  </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;