import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
    Form, Icon, Input, Button, message
} from 'antd';
import http from '../../../utils/Server';

class Register extends PureComponent {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                http.post(`/?cmd=frappe.core.doctype.user.user.sign_up&email=${values.email}&full_name=${values.username}&redirect_to=`).then(res=>{
                    if (res.message){
                        if (res.message[0] === 0){
                            message.info('此用户' + res.message[1])
                        }
                        if (res.message[0] === 1){
                            message.info('注册成功，' + res.message[1] + '登录邮箱' + values.email + '完成注册')
                        }
                    }
                })
            }
        });
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <p className="title">用户注册</p>
                <Form onSubmit={this.handleSubmit}
                    className="login-form"
                >
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入邮箱!' }, {
                                pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                                message: '邮箱格式不正确'
                            }]
                        })(
                            <Input prefix={
                                <Icon type="mail"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />}
                                placeholder="email"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!'}, {
                                pattern: /^[\w_-][\da-zA-Z~!@]{6,16}$/, message: '用户名格式6-16位字母、数字或  - 、  _ 、  @'
                            }]
                        })(
                            <Input prefix={
                                <Icon type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />}
                                type="username"
                                placeholder="username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{width: '100%'}}
                        >
                            注册
                        </Button>
                        <Link to="/login"
                            style={{display: 'block', height: '60px'}}
                        >登录</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default Form.create({ name: 'normal_register' })(Register);