import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import { inject, observer} from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './style.scss';
import http from '../../../utils/Server';
@inject('store')
@observer
@withRouter
class LinkList extends PureComponent {
    state = {
        data: [],
        loading: true,
        sn: this.props.match.params.sn
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
    render () {
        const { status, config } = this.props.store.appStore;
        const { loading } = this.state;
        return (
            <div className="linkstatuswrap">
                <div style={{ background: '#ECECEC', padding: '30px' }}
                    className="linkstatus"
                >
                    <div className="setbutton">
                        <Button>高级设置</Button>
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
        );
    }
}

export default LinkList;