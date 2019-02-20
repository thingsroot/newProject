import React, { PureComponent } from 'react';
import { withRouter, Switch, Redirect, Link } from 'react-router-dom';
import Status from '../../common/status';
import LeftNav from '../../components/LeftNav';
import LoadableComponent from '../../utils/LoadableComponent';
import PrivateRoute from '../../components/PrivateRoute';
import './style.scss';
import http from '../../utils/Server';
import { inject, observer } from 'mobx-react';
import { Drawer, Button } from 'antd';
const GatesList = LoadableComponent(()=>import('./GatesList'));
const AppsList = LoadableComponent(()=>import('./AppsList'));
const LinkList = LoadableComponent(()=>import('./LinkList'));
@inject('store')
@observer
@withRouter

class MyGatesDevices extends PureComponent {
  state = {
    visible: false,
    url: window.location.pathname
  }
  
  componentDidMount (){
    this.sendAjax()
  }
  componentWillReceiveProps (){
    const pathname = window.location.pathname
    if (pathname === this.state.url){
      return false
    } else {
      
      this.sendAjax()
      console.log('1')
    }
  }
  sendAjax = () => {
    http.get('/api/method/iot_ui.iot_api.gate_info?sn=' + this.props.match.params.sn).then(res=>{
      this.props.store.appStore.setStatus(res.message.basic)
    })
    http.get('/api/method/iot_ui.iot_api.devices_list?filter=online').then(res=>{
      console.log(res)
      this.props.store.appStore.setGatelist(res.message);
    })
  }
  showDrawer = () => {
    this.setState({
      visible: true
    })
  }
  onClose = () => {
    this.setState({
      visible: false
    })
  }
  setUrl = (sn) => {
    let arr = location.pathname.split('/');
    arr[2] = sn
    return arr.join('/')
  }
    render () {
      let { path } = this.props.match;
      const { gateList } = this.props.store.appStore;
        return (
            <div >
                <Status />
                <div className="mygatesdevices">
                  <LeftNav />
                  <Button type="primary" onClick={this.showDrawer}>
                      网关列表
                  </Button>
                  <Drawer
                      title="网关列表"
                      placement="right"
                      closable={false}
                      onClose={this.onClose}
                      visible={this.state.visible}
                  >
                  <ul>
                    {
                      gateList && gateList.length > 0 && gateList.map((v, i)=>{
                        return (
                        <Link key={i} to={
                          this.setUrl(v.device_sn)
                        }>
                            <p>{v.device_name}</p>
                        </Link>
                        )
                      })
                    }
                    </ul>
                  </Drawer>
                  <div className="mygateslist">
                    <Switch>
                      <PrivateRoute path={`${path}/GatesList`}
                          component={GatesList}
                      />
                      <PrivateRoute path={`${path}/AppsList`}
                          component={AppsList}
                      />
                      <PrivateRoute path={`${path}/LinkList`}
                          component={LinkList}
                      />
                      <Redirect from={path}
                          to={`${path}/GatesList`}
                      />
                    </Switch>
                  </div>
                </div>
            </div>
        );
    }
}
export default MyGatesDevices;