import React, { PureComponent } from 'react';
import { Input, Select, Button, Icon } from 'antd';
import http from '../../../utils/Server';
import './style.scss';
const Option = Select.Option;
class VPN extends PureComponent {
    state = {
        flag: true
    }
    componentDidMount (){
        this.timer = setInterval(() => {
            http.get('/apis/check_env').then(res=>{
                console.log(res)
            })
            fetch('/apis/check_env', {
                method: 'GET',
                mode: 'cors'
            }).then(res => {
                return res.json();
            }).then(json => {
                console.log('获取的结果', json.data);
                this.setState({flag: false})
                return json;
            }).catch(err => {
                this.setState({flag: true})
                console.log('请求错误', err);
            })

            // fetch('/apis/status', {
            //     method: 'GET',
            //     mode: 'cors'
            // }).then(res => {
            //     return res.json();
            // }).then(json => {
            //     console.log('获取的结果', json.data);
            //     this.setState({flag: false})
            //     return json;
            // }).catch(err => {
            //     this.setState({flag: true})
            //     console.log('请求错误', err);
            // })

            // fetch('/apis/tunnel_mode', {
            //     method: 'GET',
            //     mode: 'cors'
            // }).then(res => {
            //     return res.json();
            // }).then(json => {
            //     console.log('获取的结果', json.data);
            //     this.setState({flag: false})
            //     return json;
            // }).catch(err => {
            //     this.setState({flag: true})
            //     console.log('请求错误', err);
            // })
            
            // fetch('/apis/cloudstatus', {
            //     method: 'POST',
            //     mode: 'cors',
            //     headers: {
            //         Authorization: 'Bearer 123123123'
            //     }
            // }).then(res => {
            //     return res.json();
            // }).then(json => {
            //     console.log('获取的结果', json.data);
            //     this.setState({flag: false})
            //     return json;
            // }).catch(err => {
            //     this.setState({flag: true})
            //     console.log('请求错误', err);
            // })
        }, 2000);
    }
    componentWillUnmount (){
        clearInterval(this.timer)
    }
    render () {
        const { flag } = this.state;
        return (
            <div className="VPN">
                <div className="VPNLeft">
                    <div className="VPNlist">
                        <p>中转节点：</p>
                        <Select defaultValue={!flag ? '上海' : ''} disabled={flag}>
                            <Option value="上海">上海</Option>
                            <Option value="北京1">北京1</Option>
                            <Option value="北京2">北京2</Option>
                        </Select>
                    </div>
                    <div className="VPNlist">
                        <p>网关状态：</p>
                        <Input value={!flag ? 'ONLINE' : ''} disabled={flag}/>
                    </div>
                    <div className="VPNlist">
                        <p>网关SN：</p>
                        <Input value={this.props.match.params.sn} disabled={flag}/>
                    </div>
                    <div className="VPNlist">
                        <p>连接模式：</p>
                        <Button type="primary" disabled={flag}>虚拟网络</Button>
                    </div>
                    <div className="VPNlist">
                        <p>虚拟网卡IP：</p>
                        <Input disabled={flag}/>
                    </div>
                    <div className="VPNlist">
                        <p>虚拟网卡netmask：</p>
                        <Select defaultValue="255.255.255.0" disabled={flag}>
                            <Option value="255.255.255.0">255.255.255.0</Option>
                            <Option value="255.255.254.0">255.255.254.0</Option>
                            <Option value="255.255.252.0">255.255.252.0</Option>
                            <Option value="255.255.252.0">255.255.252.0</Option>
                            <Option value="255.255.0.0">255.255.0.0</Option>
                        </Select>
                    </div>
                    <div className="VPNlist">
                        <p>网关IP：</p>
                        <Input defaultValue="device ipaddress" disabled={flag} style={{marginRight: 15}}/>
                        <Button disabled={flag}><Icon type="sync"/></Button>
                    </div>
                    <div className="VPNlist">
                        <p>传输协议：</p>
                        <Button type="primary" disabled={flag}>tcp</Button>
                        <Button disabled={flag}>kcp</Button>
                    </div>
                    <div className="VPNlist">
                        <p>网络模式：</p>
                        <Button type="primary" disabled={flag}>桥接模式</Button>
                        <Button disabled={flag}>路由模式</Button>
                    </div>
                    <Button type="primary" disabled={flag} style={{fontSize: 24, height: 50}}>启动VPN</Button>
                </div>
                <div className="VPNRight">
                    <div className="VPNlist">
                        <p>
                            本地运行环境：
                        </p>
                        <span></span>
                    </div>
                    <div className="VPNlist">
                        <p>
                            本地服务状态：
                        </p>
                        <span></span>
                    </div>
                    <div className="VPNlist">
                        <p>
                            本地连接状态：
                        </p>
                        <span></span>
                    </div>
                    <div className="VPNlist">
                        <p>
                            云端隧道名称：
                        </p>
                        <span></span>
                    </div>
                    <div className="VPNlist">
                        <p>
                            云端隧道状态：
                        </p>
                        <span></span>
                    </div>
                    <div className="VPNlist">
                        <p>
                            本次启动时间：
                        </p>
                        <span></span>
                    </div>
                    <div className="VPNlist">
                        <p>
                            上次消耗流量：
                        </p>
                        <span></span>
                    </div>
                    <div className="VPNlist">
                        <p>
                            Ping网关IP状态：
                        </p>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default VPN;