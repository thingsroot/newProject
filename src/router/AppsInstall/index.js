import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Input, Rate, Icon, Button, Tabs } from 'antd';
import { inject, observer} from 'mobx-react';
import Status from '../../common/status';
import http from '../../utils/Server';
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/github.css';
import './style.scss';
import Nav from './Nav';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;
function callback (key) {
    if (key === 2) {
        console.log(2)
    }
  }
@withRouter
@inject('store')
@observer
class MyGatesAppsInstall extends Component {
    state = {
        vendor: [],
        agreement: [],
        type: [],
        data: [],
        flag: true,
        item: {},
        detail: true,
        filter: {
            ventor: '',
            agreement: '',
            type: ''
        },
        instName: null,
        config: []
    };
    componentDidMount (){
        http.get('/api/method/iot_ui.iot_api.gate_info?sn=' + this.props.match.params.sn).then(res=>{
            this.props.store.appStore.setStatus(res.message)
          });
        http.get('/api/method/app_center.api.app_suppliers').then(res=>{
            this.setState({
                vendor: res.message
            })
        });
        http.get('/api/method/app_center.api.app_protocols').then(res=>{
            this.setState({
                agreement: res.message
            })
        });
        http.get('/api/method/app_center.api.app_categories').then(res=>{
            this.setState({
                type: res.message
            })
        });
        http.get('/api/method/iot_ui.iot_api.appslist_bypage?count=100&page=1').then(res=>{
            res.message.result.length > 0 && this.setState({
                data: res.message.result,
                filterdata: res.message.result
            })
        });
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false,
            highlight: (code) =>  highlight.highlightAuto(code).value // 这段代码
            });

    }
    shouldComponentUpdate (nextProps, nextState){
        if (nextState.item.description !== undefined){
            document.getElementById('box').innerHTML = marked(nextState.item.description)
        }
        return true;
    }
    setFilter (){
        let { filterdata, filter } = this.state;
        let newdata = [];
            if (filter.vendor === '' && filter.type !== '' && filter.agreement !== ''){
                newdata = filterdata.filter((item)=>item.protocol === filter.agreement && item.category === filter.type)
            } else if (filter.agreement === '' && filter.vendor !== '' && filter.type !== ''){
                newdata = filterdata.filter((item)=>item.device_supplier === filter.vendor && item.category === filter.type)
            } else if (filter.type === '' && filter.agreement !== '' && filter.vendor !== ''){
                newdata = filterdata.filter((item)=>item.device_supplier === filter.vendor && item.protocol === filter.agreement)
            } else if (filter.vendor === '' && filter.agreement === '' && filter.type !== ''){
                newdata = filterdata.filter((item)=>item.category === filter.type)
            } else if (filter.vendor === '' && filter.type === '' && filter.agreement !== ''){
                newdata = filterdata.filter((item)=>item.protocol === filter.agreement)
            } else if (filter.type === '' && filter.agreement === '' && filter.vendor !== ''){
                newdata = filterdata.filter((item)=>item.device_supplier === filter.vendor)
            } else if (filter.vendor !== '' && filter.type !== '' && filter.agreement !== ''){
                newdata = filterdata.filter((item)=>item.protocol === filter.agreement && item.device_supplier === filter.vendor && item.category === filter.type)
            } else {
                newdata = filterdata
            }
        this.setState({
            data: newdata
        })
    }
    handleChangevendor () {
        const value = event.target.innerHTML
        if (value === '全部'){
            this.setState({
                filter: {
                    vendor: '',
                    agreement: this.state.filter.agreement,
                    type: this.state.filter.type
                }
            }, ()=>{
                this.setFilter()
            })
            return
        }
        this.setState({
            filter: {
                vendor: value,
                agreement: this.state.filter.agreement,
                type: this.state.filter.type
            }
        }, ()=>{
            this.setFilter()
        })
    }
    handleChangeagreement () {
        const value = event.target.innerHTML
        if (value === '全部'){
            this.setState({
                filter: {
                    vendor: this.state.filter.vendor,
                    agreement: '',
                    type: this.state.filter.type
                }
            }, ()=>{
                this.setFilter()
            })
            return
        }
        this.setState({
            filter: {
                vendor: this.state.filter.vendor,
                agreement: value,
                type: this.state.filter.type
            }
        }, ()=>{
            this.setFilter()
        })
    }
    handleChangetype () {
        const value = event.target.innerHTML
        if (value === '全部'){
            this.setState({
                filter: {
                    vendor: this.state.filter.vendor,
                    agreement: this.state.filter.agreement,
                    type: ''
                }
            }, ()=>{
                this.setFilter()
            })
            return
        }
        this.setState({
            filter: {
                vendor: this.state.filter.vendor,
                agreement: this.state.filter.agreement,
                type: value
            }
        }, ()=>{
            this.setFilter()
        })
    }
    searchApp (value){
        let { filterdata } = this.state;
        let newdata = [];
        newdata = filterdata.filter((item)=>item.app_name.indexOf(value) !== -1)
        this.setState({
            data: newdata
        })
    }
    setInstName = ()=>{
        this.setState({
            instName: event.target.value
        }, ()=>{
            console.log(this.state.instName)
        });
        console.log(this.state.item)
    };
    onChange = (newValue)=>{
        console.log('change', newValue);
        this.props.store.codeStore.setEditorValue(newValue)
    };
    selectChange1 = (val)=>{
        console.log(val)
    };

    render () {
        const { vendor, agreement, type, data, flag, item, detail, instName, config} = this.state;
        return (<div>
            <Status />
                <div className="AppInstall">
                    <Nav />
                    <div className={flag ? 'hide appsdetail' : 'show appsdetail'}>
                    <Button className="installbtn"
                        type="primary"
                        onClick={()=>{
                            this.setState({detail: !detail})
                        }}
                    >
                        {
                            detail ? '安装到网关' : '查看应用描述'
                        }
                    </Button>
                        <Icon type="rollback"
                            className="back"
                            onClick={()=>{
                                this.setState({
                                    flag: true
                                })
                        }}
                        />
                        <h2 style={{borderBottom: '1px solid #ccc', padding: 10}}>{item.app_name}</h2>
                        <div className={detail ? 'show' : 'hide'}>
                            <div style={{display: 'flex' }}>
                                <img src={'http://cloud.thingsroot.com' + item.icon_image}
                                    alt=""
                                />
                                <div style={{display: 'flex', paddingTop: 20, paddingLeft: 20}}>
                                    <div style={{width: 500}}
                                        className="detail"
                                    >
                                        <p>发布者： {item.app_name_unique}</p>
                                        <p>通讯协议: {item.protocol}</p>
                                        <p>适配型号： {item.device_serial}</p>
                                    </div>
                                    <div  className="detail">
                                        <p>应用分类： {item.category}</p>
                                        <p>设备厂家: {item.device_supplier}</p>
                                        <p>应用价格： 免费</p>
                                    </div>
                                </div>
                            </div>
                            <div id="box"
                                style={{marginTop: 20}}
                            >
                                markdown
                            </div>
                        </div>
                        <div className={detail ? 'installapp hide' : 'installapp show'}>
                        <Tabs onChange={callback}
                            type="card"
                        >
                            <TabPane tab="配置面板"
                                key="1"
                            >
                                <p style={{lineHeight: '50px'}}>
                                    <span className="spanStyle">实例名：</span>
                                    <Input
                                        type="text"
                                        style={{width: '300px'}}
                                        defaultValue={instName}
                                        onChange={this.setInstName}
                                    />
                                    <span>{instName}</span>
                                </p>
                                <div>
                                    {
                                        config && config.length > 0 && config.map((v, key)=>{
                                            if (v.type === 'section') {
                                                console.log(v);
                                                console.log(key);
                                                return <div id={v.name} key={key}>
                                                    <p style={{lineHeight: '50px'}}>
                                                        <span className="spanStyle">{v.desc}</span>

                                                    </p>
                                                </div>
                                            } else {
                                                return <div id={v.name} key={key}>
                                                    <div style={{lineHeight: '50px'}}>
                                                        <span className="spanStyle">{v.desc}：</span>
                                                        <Select
                                                            defaultValue={v.value[0]}
                                                            style={{ width: 300 }}
                                                            onChange={this.selectChange1}
                                                        >
                                                            {v.value.map(w => <Option key={w}>{w}</Option>)}
                                                        </Select>
                                                    </div>
                                                </div>
                                            }
                                        })
                                    }
                                </div>

                            </TabPane>
                            <TabPane tab="JSON源码"
                                key="2"
                            >
                                <div className="editorInfo">
                                    <p style={{lineHeight: '50px'}}>
                                        <span className="spanStyle">实例名：</span>
                                        <Input
                                            type="text"
                                            style={{width: '300px'}}
                                            defaultValue={instName}
                                            onChange={this.setInstName}
                                        />
                                    </p>
                                    <p style={{lineHeight: '40px'}}>
                                        编辑器状态：
                                        <span>{this.props.store.codeStore.readOnly ? '不可编辑' : '可编辑'}</span>
                                    </p>
                                </div>
                                <AceEditor
                                    style={{width: '100%'}}
                                    mode="java"
                                    theme="github"
                                    onChange={this.onChange}
                                    value={this.state.item.pre_configuration}
                                    fontSize={16}
                                    readOnly={this.props.store.codeStore.readOnly}
                                    name="UNIQUE_ID_OF_DIV"
                                />
                                <Button type="primary">安装</Button>


                            </TabPane>
                        </Tabs>
                        </div>
                    </div>
                    <div className={flag ? 'show' : 'hide'}>
                        <div className="installheader">
                            <div className="selectlist">
                                <div>
                                    设备厂商:
                                    <Select defaultValue="设备厂商"
                                        style={{ width: 120 }}
                                        onChange={()=>{
                                            this.handleChangevendor()

                                        }}
                                        size="small"
                                        key="44"
                                    >
                                        <Option
                                            value="全部"
                                            key="99"
                                        >全部</Option>
                                                {
                                                    vendor && vendor.length > 0 && vendor.map((val, ind) => {
                                                        return (
                                                            <Option
                                                                value={val.name}
                                                                key={ind}
                                                            >{val.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                </div>
                                <div>
                                    通讯协议:
                                    <Select defaultValue="通讯协议"
                                        style={{ width: 120 }}
                                        onChange={()=>{
                                            this.handleChangeagreement()
                                        }}
                                        size="small"
                                        key="11"
                                    >
                                        <Option
                                            value="全部"
                                            key="99"
                                        >全部</Option>
                                                {
                                                    agreement && agreement.length > 0 && agreement.map((val, ind) => {
                                                        return (
                                                            <Option
                                                                value={val.name}
                                                                key={ind}
                                                            >{val.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                </div>
                                <div>
                                    应用类型:
                                    <Select defaultValue="应用类型"
                                        style={{ width: 120 }}
                                        onChange={()=>{
                                            this.handleChangetype()
                                        }}
                                        size="small"
                                        key="22"
                                    >
                                        <Option
                                            value="全部"
                                            key="99"
                                        >全部</Option>
                                                {
                                                    type && type.length > 0 && type.map((val, ind) => {
                                                        return (
                                                            <Option
                                                                value={val.name}
                                                                key={ind}
                                                            >{val.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                </div>
                            </div>
                            <div className="searchlist">
                                <Search
                                    key="33"
                                    placeholder="搜索应用名"
                                    onSearch={(value)=>{
                                        this.searchApp(value)
                                    }}
                                    style={{ width: 200 }}
                                />
                            </div>
                        </div>
                        <div className="installcontent">
                            {
                                data && data.length > 0 && data.map((val, ind)=>{
                                    return (
                                        <div key={ind}
                                            className="item"
                                        >
                                            <img src={`http://cloud.thingsroot.com${val.icon_image}`}
                                                alt="logo"
                                                onClick={()=>{
                                                    let config = JSON.parse(val.conf_template);
                                                    console.log(config);
                                                    console.log(val.conf_template);
                                                    this.setState({
                                                        flag: false,
                                                        item: val,
                                                        detail: true,
                                                        config: config
                                                    })
                                                }}
                                            />
                                            <div className="apptitle">
                                                <p>{val.app_name}</p>
                                                <div>
                                                    <Rate disabled
                                                        defaultValue={val.star}
                                                        size="small"
                                                    />
                                                    <span onClick={()=>{
                                                        this.setState({
                                                            flag: false,
                                                            detail: false,
                                                            item: val
                                                        })
                                                    }}
                                                    ><Icon type="cloud-download" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyGatesAppsInstall;