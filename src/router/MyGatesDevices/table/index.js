import React, {PureComponent} from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
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
      visible: false,
      barData: []
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
      http.get(`/api/method/iot_ui.iot_api.gate_device_data_array?sn=${this.props.match.params.sn}&vsn=${props.vsn}&_=${new Date() * 1}`).then(res=>{
        let data = res.message;
        let newdata = [];
        let alldata = [];
        data && data.map((item, index)=>{
          alldata[index] = [];
          http.get(`/api/method/iot_ui.iot_api.taghisdata?sn=${this.props.match.params.sn}&vsn=${props.vsn}&tag=${item.name}&vt=${item.vt || 'float'}&time_condition=time > now() - 30m&value_method=raw&group_time_span=10m&_=${new Date() * 1}`).then(message=>{
            newdata = message.message;
            newdata.map((item)=>{
              alldata[index].push(item.value)
            })
          })
        })
        setTimeout(()=>{
          let myFaultTypeChart = echarts.init(document.getElementById('faultTypeMain'));
          myFaultTypeChart.setOption({
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              // legend: {
              //     data: ['系统', '设备', '通讯', '数据']
              // },
              xAxis: {
                  data: ['Mon Fed 11', 'Mon Fed 13', 'Mon Fed 15', 'Mon Fed 17']
              },
              yAxis: {},
              series: data.map((item, key)=>{
                return {
                  name: item.name,
                  type: 'line',
                  color: '#37A2DA',
                  data: alldata[key]
                }
              })
          });
        }, 1000)
      })
      // http.get('/api/method/iot_ui.iot_api.device_event_type_statistics').then(res=>{
      //   this.setState({barData: res.message}, ()=>{
      //     console.log(res, '=====')
      //     if (res.message){
      //       let data1 = [];
      //           let data2 = [];
      //           let data3 = [];
      //           let data4 = [];
      //           this.state.barData.map((v) =>{
      //               data1.push(v['系统']);
      //               data2.push(v['设备']);
      //               data3.push(v['通讯']);
      //               data4.push(v['数据']);
      //           });
      //           let myFaultTypeChart = echarts.init(document.getElementById('faultTypeMain'));
      //           myFaultTypeChart.setOption({
      //               tooltip: {
      //                   trigger: 'axis',
      //                   axisPointer: {
      //                       type: 'shadow'
      //                   }
      //               },
      //               // legend: {
      //               //     data: ['系统', '设备', '通讯', '数据']
      //               // },
      //               xAxis: {
      //                   data: ['Mon Fed 11', 'Mon Fed 13', 'Mon Fed 15', 'Mon Fed 17']
      //               },
      //               yAxis: {},
      //               series: [{
      //                   name: '系统',
      //                   type: 'line',
      //                   color: '#37A2DA',
      //                   data: data1
      //               }, {
      //                   name: '设备',
      //                   type: 'line',
      //                   color: '#67E0E3',
      //                   data: data2
      //               }, {
      //                   name: '通讯',
      //                   type: 'line',
      //                   color: '#FFDB5C',
      //                   data: data3
      //               }, {
      //                   name: '数据',
      //                   type: 'line',
      //                   color: '#FF9F7F',
      //                   data: data4
      //               }]
      //           });
      //     }
      //   });
      // })
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
          >
            <div
                id="faultTypeMain"
                style={{width: 472, height: 250}}
            ></div>
          </Modal>
        </div>
      );
    }
  }
export default withRouter(ExpandedRowRender);