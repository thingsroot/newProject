import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
    Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import http  from '../../../utils/Server';
import { _setCookie, get_NewToken, apply_AccessKey, isAdmin, _getCookie } from '../../../utils/Session';

class Sign extends PureComponent {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                http.post('/api/method/login', `usr=${values.userName}&pwd=${values.password}`).then(res=>{
                    if (res.message === 'Logged In') {
                        get_NewToken();
                        apply_AccessKey();
                        isAdmin();
                        _setCookie('T&R_usr', values.userName);
                        _setCookie('T&R_full_name', res.full_name);
                        message.success('登录成功，正在跳转', 1).then(()=>{
                            if (_getCookie('T&R_auth_token') !== null ){
                                this.props.history.push('/')
                            }
                        })
                    }
                }).catch(function (error){
                    if (error){
                        message.info('账号密码错误，请重新输入')
                        console.log(get_NewToken())
                    }
                })
            }
        });
    }
    render () {
        console.log(this.props)
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <p className="title">密码登录</p>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名' }, {
                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '用户名格式6-16位字母、数字或  - 、  _ 、  @'
                            }]
                        })(
                            <Input prefix={
                                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}
                                />} placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }, {
                                pattern: /^[\w]{6,12}$/, message: '密码格式6-12数字、字母组合'
                            }]
                        })(
                            <Input prefix={
                                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                                />} type="password" placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox>记住我！</Checkbox>
                        )}
                        <Link className="login-form-forgot" style={{float: 'right'}} to="/login/retrieve">忘记密码</Link>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>登录</Button>
                        <Link to="/login/register" style={{display: 'block', height: '60px'}}>注册</Link>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}
export default Form.create({ name: 'normal_login' })(Sign);