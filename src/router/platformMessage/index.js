import React, { PureComponent } from 'react';
import { Table, Input, Select  } from 'antd'
import './style.scss'
import http from '../../utils/Server';
const InputGroup = Input.Group;
const Option = Select.Option;

const columns = [{
    title: '标题',
    dataIndex: 'subject',
    width: '25%',
    render: text => <a href="javascript: ;">{text}</a>
}, {
    title: '网关序列号',
    dataIndex: 'device',
    width: '35%'
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
    onFilter: (value, record) => record.operation.indexOf(value) === 0,
    sorter: (a, b) => a.creation.length - b.creation.length,
    sortDirections: ['descend', 'ascend']
}, {
    title: '是否已读',
    dataIndex: 'disposed',
    className: 'hidden'
}, {
    title: 'id',
    dataIndex: 'name',
    className: 'hidden'
}];

const onChange = (pagination, filters, sorter)=>{
    console.log('params', pagination, filters, sorter)
};
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
        dataSource: [],
        selectValue: 'subject'
    };
    componentDidMount (){
        http.get('api/method/iot.user_api.device_activity').then(res=>{
            console.log(res.message);
            let data = [];
            let source = [];
            res.message.map((v)=>{
                let obj = JSON.parse(v.message);
                let sub = '';
                //设备状态
                if (obj.hasOwnProperty('device_status')) {
                    if (obj.device_status === 'ONLINE'){
                        sub = '设备上线'
                    } else if (obj.device_status === 'OFFLINE'){
                        sub = '设备离线'
                    }
                    //设备操作
                } else if (obj.hasOwnProperty('action')){
                    if (obj.channel === 'app') {
                        if (obj.action === 'option') {   //开机自启动
                            if (obj.data.value === 1) {
                                sub = '开启应用' + obj.data.inst + '开机自启动'
                            } else if (obj.data.value === 0) {
                                sub = '关闭应用' + obj.data.inst + '开机自启动'
                            }
                        } else if (obj.action === 'restart') {
                            sub = '重启应用' + obj.data.inst
                        } else if (obj.action === 'start') {
                            sub = '启动应用' + obj.data.inst
                        } else if (obj.action === 'stop') {
                            sub = '停止应用' + obj.data.inst
                        } else if (obj.action === 'conf') {
                            sub = '更改应用' + obj.data.inst + '应用配置'
                        } else if (obj.action === 'upload_comm') {
                            if (obj.data.sec === 0) {
                                sub = '停止上传应用' + obj.data.inst + '报文'
                            } else if (obj.data.sec === 120) {
                                sub = '上传应用' + obj.data.inst + '报文'
                            }
                        } else if (obj.action === 'install') {
                            sub = '安装应用' + obj.data.name + '实例名' + obj.data.inst
                        } else if (obj.action === 'uninstall') {
                            sub = '卸载应用' + obj.data.inst
                        } else if (obj.action === 'query_comm') {
                            sub = '应用' + obj.data.inst + '查询报文'
                        } else if (obj.action === 'query_log') {
                            sub = '应用' + obj.data.inst + '查询日志'
                        } else if (obj.action === 'list') {
                            sub = '刷新应用列表'
                        } else if (obj.action === 'upgrade') {
                            sub = '应用' + obj.data.inst + '升级到最新版本'
                        } else if (obj.action === 'rename') {
                            sub = '应用' + obj.data.inst + '重命名为' + obj.data.new_name
                        }
                    } else if (obj.channel === 'sys') {
                        if (obj.action === 'enable/beta') {
                            if (obj.data === 0) {
                                sub = '网关关闭beta模式'
                            } else if (obj.data === 1) {
                                sub = '网关开启beta模式'
                            }
                        } else if (obj.action === 'enable/data') {
                            if (obj.data === 0) {
                                sub = '网关关闭数据上传'
                            } else if (obj.data === 1) {
                                sub = '网关开启数据上传'
                            }
                        } else if (obj.action === 'enable/log') {
                            if (obj.data === '') {
                                sub = '网关关闭日志上送'
                            } else if (obj.data === 120) {
                                sub = '网关开启日志上送'
                            }
                        } else if (obj.action === 'enable/comm') {
                            if (obj.data.sec === 0) {
                                sub = '网关停止报文上送'
                            } else if (obj.data.sec === 120) {
                                sub = '网关开启报文上送'
                            }
                        } else if (obj.action === 'restart') {
                            sub = '网关IOT程序重启'
                        } else if (obj.action === 'reboot') {
                            sub = '网关设备重启'
                        } else if (obj.action === 'cloud_conf') {
                            sub = '网关云中心配置选项更新'
                        } else if (obj.action === 'enable/data_one_short') {
                            if (obj.data.sec === '') {
                                sub = '网关关闭临时上传数据'
                            } else if (obj.data.sec === 120) {
                                sub = '网关开启临时上传数据'
                            }
                        } else if (obj.action === 'ext/upgrade') {
                            sub = '网关更新扩展库' + obj.data.name
                        } else if (obj.action === 'ext/list') {
                            sub = '网关上传扩展库列表'
                        } else if (obj.action === 'cfg/download') {
                            sub = '网关IOT固件配置下载'
                        } else if (obj.action === 'cfg/upload') {
                            sub = '网关IOT固件配置上传'
                        } else if (obj.action === 'upgrade') {
                            sub = '网关升级到最新版本'
                        } else if (obj.action === 'enable/event') {
                            sub = '网关更改事件上传等级'
                        } else if (obj.action === 'enable/stat') {
                            sub = '网关开启统计数据上传'
                        } else if (obj.action === 'batch_script') {
                            sub = '网关执行批量操作'
                        } else if (obj.action === 'upgrade/ack') {
                            sub = '网关IOT固件升级确认'
                        } else if (obj.action === 'data/query') {
                            sub = '网关请求立刻上传数据'
                        }
                    } else if (obj.channel === 'command') {
                        sub = '网关应用设备执行' + obj.data.cmd + '指令'
                    } else if (obj.channel === 'putput') {
                        sub = '网关设备应用' + obj.data.output + '数据输出'
                    }  //output
                }
                data.push({
                    subject: sub,
                    device: v.device,
                    creation: v.creation.split('.')[0],
                    operation: v.operation,
                    disposed: v.disposed
                });
                source.push(sub);
            });
            this.setState({
                platformData: data,
                dataSource: source
            })
        });
    }
    getSelect = (text)=>{
        console.log(text);
        this.setState({
            selectValue: text
        })
    };
    searchContent = (value)=>{
        console.log(value);
        let input = this.input.value;
        console.log(input)
    };

    render () {
        let platformData = this.state.platformData;
        let selectValue = this.state.selectValue;
        return (
            <div className="platformMessage">
                <div className="searchBox">
                    <InputGroup compact>
                        <Select defaultValue="标题"
                            onChange={this.getSelect}
                            style={{width: '100px'}}
                        >
                            <Option value="subject">标题</Option>
                            <Option value="device">序列号</Option>
                        </Select>
                        <Input
                            style={{ width: '20%' }}
                            placeholder="请输入关键字"
                            onChange={this.searchContent.bind(this, selectValue)}
                        />
                    </InputGroup>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={platformData}
                    onChange={onChange}
                    rowKey="name"
                />
            </div>
        );
    }
}
export default PlatformMessage;