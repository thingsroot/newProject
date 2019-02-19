import React from 'react';
import {
    Table, Menu, Dropdown, Icon
  } from 'antd';
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
  let data = [];
  function ExpandedRowRender (props) {
        function conso (){
            http.get('/api/method/iot_ui.iot_api.gate_device_data_array?sn=' + props.sn + '&vsn=' + props.sn).then(res=>{
                data = res.message;
                if (data.length > 0){
                    console.log('success')
                }
            })
        }
        conso()
      return (
        <Table
            size="small"
            loading={false}
            columns={columns}
            dataSource={data}
            pagination={false}
        />
      );
  }
    export default ExpandedRowRender ;