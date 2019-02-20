import React, {PureComponent} from 'react';
import {
    Table, Menu, Dropdown, Icon
  } from 'antd';
import { withRouter } from 'react-router-dom';
import http from '../../../utils/Server';

  const menu = (
    <Menu>
      <Menu.Item>
        Action 1
      </Menu.Item>
      <Menu.Item>
        Action 2
      </Menu.Item>
    </Menu>
  );
  const columns = [
    { title: '类型', dataIndex: 'vt', key: 'vt' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'desc', key: 'desc'},
    { title: '单位', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: '数值', dataIndex: 'pv', key: 'pv' },
    { title: '时间', dataIndex: 'tm', key: 'tm' },
    { title: '质量戳', dataIndex: 'q', key: 'q' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <a href="javascript:;">Pause</a>
          <a href="javascript:;">Stop</a>
          <Dropdown overlay={menu}>
            <a href="javascript:;">
              More <Icon type="down" />
            </a>
          </Dropdown>
        </span>
      )
    }
  ];

  class ExpandedRowRender extends PureComponent {
    state = {
      data: [],
      flag: true
    }
    componentDidMount (){
      const { sn } = this.props.match.params;
      http.get('/api/method/iot_ui.iot_api.gate_device_data_array?sn=' + sn + '&vsn=' + this.props.sn).then(res=>{
        let data = res.message;
        data.map((item)=>{
          if (item.vt === null){
            item.vt = 'float';
          }
        })
          this.setState({
            data,
            flag: false
          })
      })
    }
    render () {
      return (
        <Table
            size="small"
            loading={this.state.flag}
            columns={columns}
            dataSource={this.state.data}
            pagination={false}
        />
      );
    }
  }
export default withRouter(ExpandedRowRender) ;