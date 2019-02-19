import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import http from '../../utils/Server';
import { Button, Divider, Table } from 'antd';
import Status from '../../common/status';
import ExpandedRowRender from './table'
const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  }, {
    title: '描述',
    dataIndex: 'inst',
    key: 'inst',
    sorter: true
  }, {
    title: 'I/O/C',
    dataIndex: 'ioc',
    key: 'ioc',
    sorter: true
  }, {
    title: '设备SN',
    key: 'sn',
    dataIndex: 'sn',
    width: '30%',
    sorter: true
  }, {
    title: '所属实例',
    key: 'app_inst',
    dataIndex: 'app_inst',
    sorter: true
    }, {
    title: 'Action',
    key: 'action',
    render: () => {
      return (<span>
        <Button key="1">浏览</Button>
        <Divider type="vertical" />
      </span>)
    }
  }];

@withRouter
class MyGatesDevices extends PureComponent {
    state = {
        data: []
    }
    componentDidMount (){
        let { sn } = this.props.match.params;
        http.get('/api/method/iot_ui.iot_api.gate_devs_list?sn=' + sn).then(res=>{
            let data = [];
            data = res.message;
            data.map((item)=>{
                item.ioc = '' + (item.inputs ? item.inputs : '0') + '/' + (item.outputs ? item.outputs : '0') + '/' + (item.commands ? item.commands : '0');
            })
            this.setState({
                data
            })
        })
    }
    render () {
        let { data } = this.state;
        return (
            <div>
                <Status />
                {
                    data &&
                    data.length > 0 &&
                    <Table columns={columns}
                        dataSource={
                            data
                        }
                        rowKey="sn"
                        size="small"
                        expandedRowRender={ExpandedRowRender}
                    />
                }
            </div>
        );
    }
}
export default MyGatesDevices;