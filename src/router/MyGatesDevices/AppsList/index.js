import React, { PureComponent } from 'react';
import { Table, Icon, Switch } from 'antd';
import http from '../../../utils/Server';
import { inject } from 'mobx-react';
const columns = [{
    title: '',
    dataIndex: 'img',
    key: 'img'
  }, {
    title: '实例名',
    dataIndex: 'info.inst',
    sorter: true,
    render: name => `${name} ${name}`,
    width: '20%'
  }, 
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     filters: [
//       { text: 'Male', value: 'male' },
//       { text: 'Female', value: 'female' }
//     ],
//     width: '20%'
//   },
   {
    title: '版本',
    dataIndex: 'info.version',
    key: 'info.version'
  }, {
    title: '设备数',
    dataIndex: 'info.devs_len',
    key: 'info.devs_len'
  }, {
    title: '状态',
    dataIndex: 'email'
  }, {
    title: '启动时间',
    dataIndex: 'info.running'
  }, {
    title: '开机自启',
    dataIndex: 'info.auto',
    render: (props)=>{
        return (<Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={props}/>)
    }
  }, {
    title: '操作',
    dataIndex: ''
  }];
  @inject('store')
class AppsList extends PureComponent {
    state = {
        data: [],
        pagination: {},
        loading: false,
        url: window.location.pathname
    }
    
    componentDidMount () {
        this.fetch();
      }
      UNSAFE_componentWillReceiveProps (){
        const pathname = window.location.pathname
        if (pathname === this.state.url){
          return false
        } else {
          this.fetch();
        }
      }
      handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager
        });
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters
        });
      }
    
      fetch = () => {
        console.log('1')
        this.setState({ loading: true });
        http.get('/api/method/iot_ui.iot_api.gate_applist?sn=' + this.props.match.params.sn).then((res) => {
            let data = res.message;
            data.map((item)=>{
                item.img = <span><Icon type="table" /></span>
                if (item.info.running){
                    item.info.running = new Date(parseInt(item.info.running) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
                }
                if (item.info.auto === '1'){
                    item.info.auto = true
                } else {
                    item.info.auto = false
                }
            })
          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          // pagination.total = 200;
          this.setState({
            loading: false,
            data: res.message,
            pagination
          });
        });
      }
      
    render () {
        return (
            <div>
                <Table
                    rowKey="info.inst"
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default AppsList;