import React, { PureComponent } from 'react';
import EditorCode from './editorCode';
import EditorDesc from './editorDesc';
import http from '../../utils/Server';
import {
    Form, Row, Col, Input, Button, Select, Tabs
} from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;

function callback (key) {
    console.log(key);
}
function handleChange (value) {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
}
class AppSettings extends PureComponent {
    state = {
        expand: false,
        a: 1,
        category: [],
        deviceSupplier: [],
        protocol: []
    };
    componentDidMount (){
        //获取应用分类
        http.get('/api/method/app_center.api.app_categories').then(res=>{
            let data = [];
            res.message.map((v)=>{
                data.push(v.name)
            });
            this.setState({
                category: data
            })
        });
        //获取设备提供商
        http.get('/api/method/app_center.api.app_suppliers').then(res=>{
            let data = [];
            res.message.map((v)=>{
                data.push(v.name)
            });
            this.setState({
                deviceSupplier: data
            })
        });
        //获取通讯协议
        http.get('/api/method/app_center.api.app_protocols').then(res=>{
            console.log(res.message);
            let data = [];
            res.message.map((v)=>{
                data.push(v.name)
            });
            console.log(data);
            this.setState({
                protocol: data
            })
        });
    }
    componentWillUnmount (){
        clearInterval(window.set)
    }
    getFields () {
        let list = [{
            name: '应用名称',
            type: 'input',
            index: 'app_name'
        }, {
            name: '授权类型',
            type: 'select',
            index: '0',
            children: ['免费']
        }, {
            name: '应用厂商',
            type: 'select',
            index: 'device_supplier',
            children: this.state.deviceSupplier
        }, {
            name: '设备型号',
            type: 'input',
            index: 'device_serial'
        }, {
            name: '协议',
            type: 'select',
            index: 'protocol',
            children: this.state.protocol
        }, {
            name: '类别',
            type: 'select',
            index: 'category',
            children: this.state.category
        }];
        window.list = list;
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        list.map((item, key)=>{
            if (item.type === 'input'){
                children.push(
                    <Col span={8}
                        key={key}
                        style={{ display: key < count ? 'block' : 'none' }}
                    >
                        <Form.Item label={`${item.name}`}>
                            {getFieldDecorator(`${item.index}`, {
                                rules: [{
                                    required: true,
                                    message: `请输入${item.name}`
                                }]
                            })(
                                <Input style={{width: '180px'}} placeholder={`请输入${item.name}`} />
                            )}
                        </Form.Item>
                    </Col>
                );
            } else {
                children.push(
                    <Col span={8}
                        key={key}
                        style={{ display: key < count ? 'block' : 'none' }}
                    >
                        <Form.Item label={`${item.name}`}>
                            {getFieldDecorator(`${item.index}`, {
                                rules: [{
                                    required: true,
                                    message: `请选择${item.name}`
                                }]
                            })(
                                <Select labelInValue
                                    defaultValue={item.children[0]}
                                    style={{ width: 240 }}
                                    onChange={handleChange}
                                    key={key}
                                >
                                    {

                                        item.children && item.children.map((val, ind)=>{
                                            return (
                                                <Option
                                                    value={val}
                                                    key={ind}
                                                >
                                                    {val}
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                );
            }
            return false;
        });
        return children;
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };
    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };
    setNum (_this){
        _this.setState({a: 333})
    }
    render () {
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={24}>
                        <Col span={3}> </Col>
                        <Col span={21}>{this.getFields()}</Col>
                    </Row>
                    <Row>
                        <Col span={18}
                            style={{ textAlign: 'right' }}
                        >
                        </Col>
                    </Row>
                    <p>描述</p>
                    <Tabs onChange={callback} type="card">
                        <TabPane tab="描述" key="1">
                            <div style={{minHeight: '400px'}}>
                                <EditorDesc/>
                            </div>
                        </TabPane>
                        <TabPane tab="预定义" key="2">
                            <div style={{minHeight: '400px'}}>
                                <EditorCode/>
                            </div>
                        </TabPane>
                    </Tabs>

                    <Button type="primary"
                        htmlType="submit"
                    >创建</Button>
                </Form>
            </div>
        )
    }
}
const WrappedAdvancedSearchForm = Form.create()(AppSettings);
export default (WrappedAdvancedSearchForm);
