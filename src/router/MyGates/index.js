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
                v.disabled = false;
                v.device_status = <span className="online"><b></b>&nbsp;&nbsp;在线</span>;
            } else if (v.device_status === 'OFFLINE') {
                v.device_status = <span className="offline"><b></b>&nbsp;&nbsp;离线</span>;
                v.disabled = true;
            } else {
                v.device_status = <span className="notline"><b></b>&nbsp;&nbsp;未连接</span>;
                v.disabled = true;
            }
        })
        if (status === 'online'){
            this.props.store.appStore.setGatelist(res.message);
        }
        this.setState({
            status,
            data: res.message,
            loading: false
        })
    })
}
function callback (key){
    switch (key) {
        case '1':
                this.setState({loading: true})
                this.getDevicesList('online')
            break;
        case '2':
                this.setState({loading: true})
                this.getDevicesList('offline')
            break;
        case '3':
                this.setState({loading: true})
                this.getDevicesList('all')
            break;
        default:
            break;
    }
}
  function confirm (record) {
  http.postToken('/api/method/iot_ui.iot_api.remove_gate', {
      sn: [record.device_sn]
  }).then(res=>{
        if (res.message){
            message.success('移除网关成功')
        }
        this.getDevicesList(this.state.status)
  })
  this.getDevicesList(this.state.status)
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
            loading: true,
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
                key: 'last_updated',
                width: '180px'
              }, {
                title: '状态',
                key: 'device_status',
                dataIndex: 'device_status',
                width: '80px'
              }, {
                title: '应用数',
                key: 'device_apps_num',
                dataIndex: 'device_apps_num',
                width: '70px'
                }, {
                title: '设备数',
                key: 'device_devs_num',
                dataIndex: 'device_devs_num',
                width: '70px'
                }, {
                title: 'Action',
                key: 'action',
                width: '23%',
                render: (text, record, props) => {
                    props
                  return (
                      <span>
                        <Link to={`/MyGatesDevices/${record.device_sn}`}
                            disabled={record.disabled}
                        >
                            <Button key="1"
                                disabled={record.disabled}
                            >设备</Button>
                        </Link>
                        <Divider type="vertical" />
                        <Link to={`/MyGatesDevices/${record.device_sn}/AppsList`}
                            disabled={record.disabled}
                        >
                            <Button key="2"
                                disabled={record.disabled}
                            >应用</Button>
                        </Link>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="你确定要删除这个网关吗?"
                            onConfirm={()=>{
                              this.confirm(record)
                            }}
                            okText="确认"
                            cancelText="取消"
                        >
                        <Button key="3"
                            disabled={record.disabled}
                        >删除网关</Button>
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
                                                                data && data.length > 0 && data
                                                            }
                                                            bordered
                                                            loading={this.state.loading}
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
                                                            data && data.length > 0 && data
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
                                                        loading={this.state.loading}
                                                        size="small "
                                                     /></TabPane>
                                                    <TabPane tab="全部"
                                                        key="3"
                                                    ><Table columns={this.state.columns}
                                                        dataSource={
                                                            data && data.length > 0 && data
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
                                                        loading={this.state.loading}
                                                        size="small "
                                                     /></TabPane>
                                                </Tabs>
                }
            </div>
        );
    }
}
export default MyGates;