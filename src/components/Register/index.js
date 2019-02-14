import React, { Component } from 'react';
import './register.scss'
import {
    Form, Icon, Input, Button
} from 'antd';

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}
                className="login-form"
            >
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }]
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
                        rules: [{ required: true, message: 'Please input your username!' }]
                    })(
                        <Input prefix={
                            <Icon type="user"
                                style={{ color: 'rgba(0,0,0,.25)'}}
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
                    <Button href="/login"
                        size="small"
                    >登录》
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;