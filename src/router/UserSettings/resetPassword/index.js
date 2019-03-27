import React, { Component } from 'react';
import {
    Modal, Form, Input
} from 'antd';
import { inject, observer} from 'mobx-react';

@inject('store')
@observer

class ResetPassword extends Component {
    state = {
        oldPassword: '',
        num: '',
        newPassword: ''
    };
    render () {
        const {
            visible, onCancel, onCreate, form
        } = this.props;
        const { getFieldDecorator } = form;
        //  密码验证
        const passwordValidator = (rule, value, callback) => {
            const { getFieldValue } = this.props.form;
            console.log(value)
            this.props.store.codeStore.setNewPassword(value)
            if (value && value !== getFieldValue('password')) {
                callback('两次输入不一致！')
            }
            // 必须总是返回一个 callback，否则 validateFields 无法响应
            callback();
        };
        const oldPassword = (rule, value, callback) => {
            console.log(value);
            this.props.store.codeStore.setOldPassword(value)
            this.setState({
                num: value
            });
            callback();
        };
        return (
            <Modal
                visible={visible}
                title="修改密码"
                okText="确定"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="旧密码">
                        {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: '不能为空' }, {
                                validator: oldPassword
                            }]
                        })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                    <Form.Item label="新密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }, {
                                pattern: /^[\w]{6,12}$/, message: '密码格式6-12数字和字母组合'
                            }]
                        })(
                            <Input
                                type="password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="确认新密码">
                        {getFieldDecorator('passwordComfire', {
                            rules: [{ required: true, message: '请再次输入密码!' }, {
                                validator: passwordValidator
                            }]
                        })(
                            <Input
                                type="password"
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const ResetPasswordCreateForm = Form.create({ name: 'resetPassword' })(ResetPassword);
export default ResetPasswordCreateForm;
