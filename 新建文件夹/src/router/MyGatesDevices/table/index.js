import React, {PureComponent} from 'react';
import {
    Table,
    Button,
    Modal
  } from 'antd';
import { withRouter } from 'react-router-dom';
import http from '../../../utils/Server';
import './style.scss';
  class ExpandedRowRender extends PureComponent {
    state = {
      data: [],
      flag: true,
      visible: false
    }
    componentDidMount (){
      const { sn } = this.props.match.params;
      http.get('/api/method/iot_ui.iot_api.gate_device_data_array?sn=' + sn + '&vsn=' + this.props.sn).then(res=>{
        console.log(res)
        let data = res.message;
        data && data.length > 0 && data.map((item, ind)=>{
          item.sn = sn;
          item.vsn = this.props.sn;
          item.key = ind;
          if (item.vt === null){
            item.vt = 'float';
          }
        })
          this.setState({
            data,
            record: {},
            flag: false,
            columns: [
              { title: '类型', dataIndex: 'vt', key: 'vt' },
              { title: '名称', dataIndex: 'name', key: 'name' },
              { title: '描述', dataIndex: 'desc', key: 'desc'},
              { title: '单位', dataIndex: 'upgradeNum', key: 'upgradeNum' },
              { title: '数值', dataIndex: 'pv', key: 'pv', render (text) {
                return (<span title={text}>{text}</span>)
              }},
              { title: '时间', dataIndex: 'tm', key: 'tm' },
              { title: '质量戳', dataIndex: 'q', key: 'q' },
              {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (record, props) => {
                  return (
                    <span className="table-operation">
                      <Button onClick={()=>{
                        this.showModal(props)
                      }}
                      >浏览数据</Button>
                    </span>
                  )
                }
              }
            ]
          })
      })
    }
    showModal = (props) => {
      this.setState({
        visible: true,
        record: props
      });
    }
    handleOk = () => {
      const {record} = this.state;
      this.setState({
        visible: false
      });
      this.props.history.push(`/BrowsingHistory/${record.sn}/${record.vsn}`)
    }
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false
      });
    }
    render () {
      return (
        <div>
          <Table
              size="small"
              rowKey="key"
              loading={this.state.flag}
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={false}
          />
          <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back"
                    onClick={this.handleCancel}
                >关闭</Button>,
                <Button key="submit"
                    type="primary"
                    onClick={this.handleOk}
                >
                  更多历史数据
                </Button>
              ]}
          ></Modal>
        </div>
      );
    }
  }
export default withRouter(ExpandedRowRender) ;