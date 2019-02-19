import React, { PureComponent } from 'react';
import http from '../../utils/Server';
import { Table, Divider, Tabs, Button, Popconfirm, message } from 'antd';
import './style.scss';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;

function callback (key) {
  console.log(key);
}
// function handleMenuClick (e) {
//     // if(e.key==="4"){
//     //     console.log('remove')
//     // }
//   }
  function confirm (e) {
  console.log(e.target.parentNode.parentNode.parentNode);
  message.success('Click on Yes');
}

function cancel (e) {
  console.log(e);
  message.error('Click on No');
}
// const menu = (
//     <Menu onClick={handleMenuClick}>
//       <Menu.Item key="1">实时数据</Menu.Item>
//       <Menu.Item key="2">网关信息</Menu.Item>
//       <Menu.Item key="3">更改名称</Menu.Item>
//       <Menu.Item key="4">
//         <Popconfirm title="你确定要删除这个网关吗?" onConfirm={confirm} onCancel={cancel} okText="确认" cancelText="取消">
//             <a href="#">删除网关</a>
//         </Popconfirm>
//       </Menu.Item>
//       <Menu.Item key="5">在线记录</Menu.Item>
//     </Menu>
//   );
const columns = [{
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
          <Button key="2">应用</Button>
          <Divider type="vertical" />
          <Popconfirm
              title="你确定要删除这个网关吗?"
              onConfirm={confirm}
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
}];
@inject('store')
class MyGates extends PureComponent {
    state = {
        data: []
    }
    componentDidMount (){
        this.props.store.appStore.conso('333')
        http.get('/api/method/iot_ui.iot_api.devices_list?filter=online').then(res=>{
           res.message.map((v)=>{
               if (v.device_status === 'ONLINE'){
                    v.device_status = <span className="online"><b></b>&nbsp;&nbsp;在线</span>
               }
           })
            this.setState({
                data: res.message
            })
        })
    }
    render (){
        let { data } = this.state;
        console.log(this.props)
        return (
            <div>
                {
                    data.length > 0 &&
                    <Tabs onChange={callback}
                        type="card"
                    >
                                                    <TabPane tab="在线"
                                                        key="1"
                                                    >
                                                        <Table columns={
                                                                    columns
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
                                                    ><Table columns={columns}
                                                        dataSource={
                                                            data
                                                        }
                                                        rowKey="device_sn"
                                                        bordered
                                                        size="small "
                                                     /></TabPane>
                                                    <TabPane tab="全部"
                                                        key="3"
                                                    ><Table columns={columns}
                                                        dataSource={
                                                            data
                                                        }
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