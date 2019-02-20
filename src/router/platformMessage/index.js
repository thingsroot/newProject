import React, { PureComponent } from 'react';
import { Table } from 'antd'
import './style.scss'
import http from '../../utils/Server';

const columns = [{
    title: '标题',
    dataIndex: 'subject',
    width: '40%',
    render: text => <a href="javascript: ;">{text}</a>
}, {
    title: '网关序列号',
    dataIndex: 'device',
    width: '30%'
}, {
    title: '发生时间',
    dataIndex: 'creation',
    width: '20%'
}, {
    title: '消息类型',
    dataIndex: 'operation',
    width: '15%',
    filters: [{
        text: '设备操作',
        value: 'Action'
    }, {
        text: '设备状态',
        value: 'Status'
    }, {
        text: '全部',
        value: ''
    }],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend']
}, {
    title: '是否已读',
    dataIndex: 'disposed',
    className: 'hidden'
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
    })
};

class PlatformMessage extends PureComponent {
    state = {
        platformData: [],
        searchText: ''
    };

    componentDidMount (){
        http.get('api/method/iot.user_api.device_activity').then(res=>{
            console.log(res.message);
            this.setState({
                platformData: res.message
            })
        });

    }
    onChange = (pagination, filters, sorter)=>{
        console.log('params', pagination, filters, sorter)
    }
    render () {
        let platformData = this.state.platformData;

        return (
            <div className="platformMessage">
                <div className="searchBox">

                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={platformData}
                    onChange={{onChange}}
                    rowKey="name"
                />
            </div>
        );
    }
}

export default PlatformMessage;