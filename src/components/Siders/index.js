import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
class Siders extends PureComponent {
    constructor (props){
        super(props)
        this.state = {
            collapsed: this.props.collapsed
        }
    }
    UNSAFE_componentWillReceiveProps (props){
        this.setState({
            collapsed: props.collapsed
        })
    }
    render (){
        return (
            <div className="siders" style={{width: '100%'}}>
                {
                    !this.props.collapsed
                        ? <div className="logo" style={{width: '200px', transition: 'background 0.3s, width 0.2s'}}><b>冬笋云</b></div>
                        : <div className="logo" style={{width: '80px', transition: 'background 0.3s, width 0.2s'}}><b>冬</b></div>
                }
                <Menu theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1">
                    <Link to="/Home">
                        <Icon
                            type="dashboard"
                            theme="twoTone"
                        />
                        <span>Dashboard</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Link to="/MyGates">
                        <Icon type="desktop" />
                        <span>我的网关</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/MyApps">
                        <Icon type="table" />
                        <span>我的应用</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
export default Siders;