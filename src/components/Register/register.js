import React, { Component } from 'react';
import Background from '../../assets/images/background.png';
import WrappedNormalLoginForm from './index';
var sectionStyle = {
    posation: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: `url(${Background})`,
    backgroundSize: '100% 100%'
};
class Register extends Component {
    render () {
        return (
            <div className="register"
                style={sectionStyle}
            >
                <div className="header">
                    <p>
                        <img src=""/><span>冬笋物联网</span>
                    </p>
                </div>
                <div className="main">
                    <div className="tabs">
                        <p>用户注册</p>
                        <WrappedNormalLoginForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;