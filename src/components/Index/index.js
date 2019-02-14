import React, { Component } from 'react';
import './style.scss';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
class App extends Component {
  state = {
    collapsed: false
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <Layout>
        <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
        >
          <div className="logo">
            <b>冬
            {
              !this.state.collapsed
              ? <span>笋云</span>
              : ''
            }</b>
          </div>
          <Menu theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Link to="/dashboard">
                <Icon
                    type="dashboard"
                    theme="twoTone"
                />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/mygateway">
                <Icon type="desktop" />
                <span>我的网关</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/myapp">
                  <Icon type="table" />
                  <span>我的应用</span>
                </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 50 }}>
            <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280
          }}
          >
          123
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
