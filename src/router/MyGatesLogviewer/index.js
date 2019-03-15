import React, { PureComponent } from 'react';
import { withRouter} from 'react-router-dom';
import { _getCookie } from '../../utils/Session';
import { Table } from 'antd';
import http from '../../utils/Server';
import mqtt from 'mqtt';
const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'timer',
    width: '200px'
  }, {
    title: '类型',
    dataIndex: 'info',
    key: 'info',
    width: '100px'
  }, {
    title: '实例ID',
    dataIndex: 'id',
    key: 'id',
    width: '100px'
  }, {
    title: '内容',
    dataIndex: 'content',
    key: 'content'
  }];
  const data = [];
  let num = 0;
  function getLocalTime (nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
 }
function makeid () {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 8; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function success (){
    console.log('success')
}

function error (){
    console.log('error')
}
let client = {};
const sn = location.pathname.split('MyGatesLogviewer/')[1]
console.log(sn)
function connect (){
   const options = {
       connectTimeout: 4000, // 超时时间
       // 认证信息
       clientId: 'webclient-' + makeid(),
       username: _getCookie('usr'),
       password: _getCookie('sid'),
       keepAlive: 60,
       timeout: 3,
       topic: sn + '/comm',
       onSuccess: success,
       onFailure: error
 }
 client = mqtt.connect('ws://ioe.thingsroot.com:8083/mqtt', options)
   client.on('connect', (pack)=>{
       console.log(pack);
   })
//    client.subscribe(topic)
//   client.on('message', (topic, message)=>{
//       const newmessage = JSON.parse(message.toString());
//       const obj = {
//        key: num++,
//        info: newmessage[0],
//        time: getLocalTime(newmessage[1]),
//        id: newmessage[2].split(']:')[0] + ']',
//        content: newmessage[2].split(']:')[1]
//        }
//        if (data.length < 1000){
//                data.unshift(obj)
//            console.log(data)
//        } else {
//            return false
//        }
//   })

}
function subscribe (){
    setInterval(() => {
        const topic = sn + '/log';
        client.subscribe(topic)
        client.on('message', (topic, message)=>{
            const newmessage = JSON.parse(message.toString());
            const obj = {
             key: num++,
             info: newmessage[0],
             time: getLocalTime(newmessage[1]),
             id: newmessage[2].split(']:')[0] + ']',
             content: newmessage[2].split(']:')[1]
             }
             if (data.length < 1000){
                     data.unshift(obj)
             } else {
                 return false
             }
        })
        console.log('222')
    }, 1000);
}

@withRouter
class MyGatesLogviewer extends PureComponent {
    state = {
        data: []
    }
    componentDidMount (){
                    //this.connect()
    }
    render () {
        console.log(this.props)
        return (
            <div>
                    <a href="#"
                        onClick={()=>{
                            const data = {
                                data: 60,
                                device: this.props.match.params.sn,
                                id: `sys_enable_log/${this.props.match.params.sn}/${new Date() * 1}`
                            }
                            http.postToken('/api/method/iot.device_api.sys_enable_log', data).then(()=>{
                                //setTimeout(() => {
                                    connect()
                                //}, 1000);
                            })
                        }}
                    >连接</a>
                    <br/>
                    <a href="#"
                        onClick={()=>{
                            subscribe()
                        }}    
                    >订阅日志</a>
                <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    //pagination={false}
                    scroll={{y: 500}}
                    rowKey="key"
                />
            </div>
        );
    }
}

export default MyGatesLogviewer;