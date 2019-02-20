import React, { PureComponent } from 'react';
import http from '../../utils/Server';
import { Table, Divider, Tabs, Button, Popconfirm, message } from 'antd';
import './style.scss';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;
function getDevicesList (status){
    http.get('/api/method/iot_ui.iot_api.devices_list?filter=' + status).then(res=>{
        res.message.map((v)=>{
            if (v.device_status === 'ONLINE'){
                v.device_status = <span className="online"><b></b>&nbsp;&nbsp;在线</span>
            } else if (v.device_status === 'OFFLINE') {
                v.device_status = <span className="offline"><b></b>&nbsp;&nbsp;离线</span>
            } else {
                v.device_status = <span className="notline"><b></b>&nbsp;&nbsp;未连接</span>
            }
        })
        if (status === 'online'){
            this.props.store.appStore.setGatelist(res.message);
        }
        this.setState({
            status,
            data: res.message
        })
        console.log(res.message)
    })
}
function callback (key){
    switch (key) {
        case '1':
                this.getDevicesList('online')
            break;
        case '2':
                this.getDevicesList('offline')
            break;
        case '3':
                this.getDevicesList('all')
            break;
        default:
            break;
    }
}
  function confirm (record) {
      console.log()
  http.post('/api/method/iot_ui.iot_api.remove_gate', `{sn=${record.device_sn}}`).then(res=>{
      console.log(res);
        this.getDevicesList(this.state.status)
  })
  this.getDevicesList(this.state.status)
  message.success('Click on Yes');
}

function cancel (e) {
  console.log(e);
  message.error('Click on No');
}
@inject('store')
class MyGates extends PureComponent {
    constructor (props){
        super(props)
        this.callback = callback.bind(this);
        this.getDevicesList = getDevicesList.bind(this);
        this.confirm = confirm.bind(this);
        this.state = {
            data: [],
            status: 'online',
            columns: [{
                title: '名称',
                dataIndex: 'device_name',
                key: 'name'
              }, {
                title: '描述',
                dataIndex: 'device_desc',
                key: 'device_desc'
              }, {
                title: '上线时间',
                dataIndex: 'last_updated',
                key: 'last_updated'
              }, {
                title: '状态',
                key: 'device_status',
                dataIndex: 'device_status'
              }, {
                title: '应用数',
                key: 'device_apps_num',
                dataIndex: 'device_apps_num'
                }, {
                title: '设备数',
                key: 'device_devs_num',
                dataIndex: 'device_devs_num'
                }, {
                title: 'Action',
                key: 'action',
                width: '20%',
                render: (text, record, props) => {
                    props
                  return (
                      <span>
                        <Link to={`/MyGatesDevices/${record.device_sn}`}>
                          <Button key="1">设备</Button>
                        </Link>
                        <Divider type="vertical" />
                        <Link to={`/MyGatesDevices/${record.device_sn}/AppsList`}>
                          <Button key="2">应用</Button>
                        </Link>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="你确定要删除这个网关吗?"
                            onConfirm={()=>{
                              this.confirm(record)
                            }}
                            onCancel={cancel}
                            okText="确认"
                            cancelText="取消"
                        >
                          <Button key="3">删除网关</Button>
                          <Divider type="vertical" />
                        </Popconfirm>
                      </span>
                    )
                }
              }]
        }
    }
    componentDidMount (){
        this.getDevicesList('online')
    }
    render (){
        let { data } = this.state;
        return (
            <div>
                {
                    <Tabs onChange={this.callback}
                        type="card"
                    >
                                                    <TabPane tab="在线"
                                                        key="1"
                                                    >
                                                        <Table columns={
                                                                    this.state.columns
                                                                }
                                                            dataSource={
                                                                data
                                                            }
                                                            bordered
                                                            rowKey="device_sn"
                                                            size="small"
                                                            rowClassName={(record, index) => {
                                                                let className = 'light-row';
                                                                if (index % 2 === 1) {
                                                                    className = 'dark-row';
                                                                }
                                                                return className;
                                                            }}
                                                        /></TabPane>
                                                    <TabPane tab="离线"
                                                        key="2"
                                                    ><Table columns={this.state.columns}
                                                        dataSource={
                                                            data
                                                        }
                                                        rowKey="device_sn"
                                                        rowClassName={(record, index) => {
                                                            let className = 'light-row';
                                                            if (index % 2 === 1) {
                                                                className = 'dark-row';
                                                            }
                                                            return className;
                                                        }}
                                                        bordered
                                                        size="small "
                                                     /></TabPane>
                                                    <TabPane tab="全部"
                                                        key="3"
                                                    ><Table columns={this.state.columns}
                                                        dataSource={
                                                            data
                                                        }
                                                        rowClassName={(record, index) => {
                                                            let className = 'light-row';
                                                            if (index % 2 === 1) {
                                                                className = 'dark-row';
                                                            }
                                                            return className;
                                                        }}
                                                        rowKey="device_sn"
                                                        bordered
                                                        size="small "
                                                     /></TabPane>
                                                </Tabs>
                }
            </div>
        );
    }
}
export default MyGates;