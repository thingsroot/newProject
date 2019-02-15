import React, { PureComponent } from 'react';
import { Layout, Icon } from 'antd';
const { Header } = Layout;
class Headers extends PureComponent {
    render () { 
        return (
            <Header style={{ background: '#fff', padding: 0, height: 50 }}>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className="headerUser">
                    <Icon type="user"/>
                    <span></span>
                </div>
            </Header>
        );
    }
}
export default Headers;