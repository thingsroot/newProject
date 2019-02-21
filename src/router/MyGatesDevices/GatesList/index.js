import React, { PureComponent } from 'react';
import http from '../../../utils/Server';
import { Button, Divider, Table } from 'antd';
import ExpandedRowRender from '../table';
import { inject, observer} from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  @inject('store')
  @observer
  @withRouter
class GatesList extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }


    state = {
        data: [],
        sn: this.props.match.params.sn
    }
    componentDidMount (){
      this.getData(this.state.sn);
    }
    UNSAFE_componentWillReceiveProps (nextProps){
      const sn = nextProps.match.params.sn;
      this.setState({
          sn
      }, ()=>{
          this.getData(sn);
      });
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
            data
        })
    })
    }
    render () {
        let { data } = this.state;
        return (
            <div>
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

export default GatesList;