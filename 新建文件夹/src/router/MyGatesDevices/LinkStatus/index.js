import React, { PureComponent } from 'react';
import { Card, Button, Switch, Input, message } from 'antd';
import { inject, observer} from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './style.scss';
//import { deviceAppOption } from '../../../utils/Session';
import http from '../../../utils/Server';
@inject('store')
@observer
@withRouter
class LinkList extends PureComponent {
    state = {
        data: [],
        loading: true,
        sn: this.props.match.params.sn,
        flag: true
    }
    componentDidMount (){
      this.getData(this.state.sn);
    }
    UNSAFE_componentWillReceiveProps (nextProps){
      if (nextProps.location.pathname !== this.props.location.pathname){
        const sn = nextProps.match.params.sn;
        this.setState({
            loading: true
        }, ()=>{
            this.getData(sn);
        });
      }
    }
    getData (sn){
      http.get('/api/method/iot_ui.iot_api.gate_info?sn=' + this.props.match.params.sn).then(res=>{
        this.props.store.appStore.setStatus(res.message)
        console.log(res)
      })
      http.get('/api/method/iot_ui.iot_api.gate_devs_list?sn=' + sn ).then(res=>{
        let data = [];
        data = res.message;
        data.map((item)=>{
            item.ioc = '' + (item.inputs ? item.inputs : '0') + '/' + (item.outputs ? item.outputs : '0') + '/' + (item.commands ? item.commands : '0');
        })
        this.setState({
            data,
            loading: false
        })
    })
    }
    setConfig (record, config){
        console.log(record, config)
    }
    setAutoDisabled (record, config){
        // const { sn } = this.props.match.params;
        // let type = record.info.auto ? 'disabled' : 'enable'
        // let value = record.info.auto ? 0 : 1
        // console.log(record, this)
        // const message = deviceAppOption(record.info.inst, 'auto', value, this.props.store.appStore.status.sn, type, record.sn);
        // if (message !== null){
        //   this.fetch(sn)
        // }
        const type = config === 1 ? 'disable' : 'enable';
        const success = type === 'disable' ? '开启' : '关闭';
        console.log(success)
        const data = {
            data: config === 0 ? 1 : 0,
            device: this.props.match.params.sn,
            id: `${type}/${this.props.match.params.sn}/${record}/${new Date() * 1}`
        }
        http.postToken('/api/method/iot.device_api.sys_enable_' + record, data).then(res=>{
            http.get('/api/method/iot.device_api.get_action_result?id=' + res.message).then(res=>{
                if (res.message && res.message.result === true){
                    message.success( '操作成功')
                } else {
                    message.error('操作失败')
                }
            })
        })
        console.log(data)
        console.log(config)
      }
    render () {
        const { status, config } = this.props.store.appStore;
        const { loading, flag } = this.state;
        console.log(status, config)
        return (
            flag ? <div className="linkstatuswrap">
            <div style={{ background: '#ECECEC', padding: '30px' }}
                className="linkstatus"
            >
                <div className="setbutton">
                    <Button onClick={()=>{
                        this.setState({flag: false})
                    }}>高级设置</Button>
                </div>
                <div className="border">
                    <Card title="| 基本信息"
                        bordered={false}
                        style={{ width: '100%' }}
                        loading={loading}
                    >
                    <p><b>序列号：</b>{status.sn}</p>
                    <p><b>位置：</b> -- </p>
                    <p><b>名称：</b>{status.name}</p>
                    <p><b>描述：</b>{status.desc}</p>
                    <p><b>型号：</b>{status.model ? status.model : 'unknown'}</p>
                    </Card>
                    <Card title="| 配置信息"
                        bordered={false}
                        style={{ width: '100%' }}
                        loading={loading}
                    >
                    <p><b>CPU:</b>{config.cpu}</p>
                    <p><b>内存:</b>{config.ram}</p>
                    <p><b>存储:</b>{config.rom}</p>
                    <p><b>操作系统:</b>{config.os}</p>
                    <p><b>核心软件:</b>{config.skynet_version}</p>
                    <p><b>业务软件:</b>{config.iot_version}</p>
                    <p><b>公网IP:</b>{config.public_ip}</p>
                    <p><b>调试模式:</b>{status.iot_beta  === 1 ? '开启' : '关闭'}</p>
                    <p><b>数据上传:</b>{config.data_upload === 1 ? '开启' : '关闭'}</p>
                    <p><b>统计上传:</b>{config.stat_upload === 1 ? '开启' : '关闭'}</p>
                    <p><b>日志上传:</b>{config.event_upload}</p>
                    </Card>
                </div>
            </div>
            <div className="rightecharts">
                <Card className="border">
                    <p>CPU负载</p>
                    <div style={{height: 200}}></div>
                </Card>
                <Card className="border">
                    <p>内存负载</p>
                    <div style={{height: 200}}></div>
                </Card>
            </div>
        </div>
        : <div className="linkstatuswrap">
                    <Card
                        title="高级设置"
                        extra={<Button
                            onClick={()=>{
                                this.setState({flag: true})
                            }}
                        >X</Button>}
                        loading={loading}
                        style={{ width: '100%' }}
                    >
                        <div className="list">
                            <span>
                                调试模式 [*开启后可安装测试版本软件]
                            </span>
                            <Switch
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                                defaultChecked={status.iot_beta === 1 ? true : false}
                                onChange={()=>{
                                    this.setAutoDisabled('beta', status.iot_beta)
                                }}
                            />
                        </div>
                        <div className="list">
                            <span>
                                数据上传 [*开启后设备数据会传到当前平台]
                            </span>
                            <Switch
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                                defaultChecked={config.data_upload === 1 ? true : false}
                                onChange={()=>{
                                    this.setAutoDisabled('data', config.data_upload)
                                }}
                            />
                        </div>
                        <div className="list">
                            <span>
                                变化数据上送间隔（ms） [*程序会重启]
                            </span>
                            <Input
                                defaultValue={config.data_upload_period}
                                style={{width: 100}}
                            />
                        </div>
                        <div className="list">
                            <span>
                                全量数据上送间隔（s） [*程序会重启]
                            </span>
                            <Input
                                style={{width: 100}}
                                defaultValue={config.data_upload_cov_ttl}
                            />
                        </div>
                        <div className="list">
                            <span>
                                统计上传 [*开启后统计数据传到当前平台]
                            </span>
                            <Switch
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                                defaultChecked={config.stat_upload === 1 ? false : true}
                                onChange={()=>{
                                    this.setAutoDisabled('stat', config.data_upload)
                                }}
                            />
                        </div>
                        <div className="list">
                            <span>
                                网络配置
                            </span>
                            <Switch
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                                defaultChecked={config.Net_Manager}
                                onChange={()=>{
                                    this.setConfig('Net_Manager', config.Net_Manager)
                                }}
                            />
                        </div>
                        <div className="list">
                            <span>
                                虚拟网络 [*开启后可建立点对点VPN]
                            </span>
                            <Switch
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                                defaultChecked={config.ioe_frpc}
                                onChange={()=>{
                                    this.setConfig('ioe_frpc', config.Net_Manager)
                                }}
                            />{console.log(config)}
                        </div>
                        <div className="list">
                            <span>
                                日志上传等级 [*事件上传的最低等级]
                            </span>
                            <Input
                                defaultValue={config.event_upload}
                                style={{width: 100}}
                            />
                        </div>
                        <div className="list">
                            <span>
                                重启FreeIOE [*FreeIOE重启会导致5秒左右的离线]
                            </span>
                            <Button>重启</Button>
                        </div>
                        <div className="list">
                            <span>
                                重启网关 [*网关重启会导致60秒左右的离线]
                            </span>
                            <Button>重启</Button>
                        </div>
                    </Card>
        </div>
        );
    }
}

export default LinkList;