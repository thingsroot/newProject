import React, { PureComponent } from 'react';
import './style.scss';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import ContentMain from '../ContentMain';
import { _getCookie } from '../../utils/Session';
const { Header, Sider, Content } = Layout;
const menu = (
  <Menu style={{padding: 20}}>
    <Menu.Item key="12">
      <Link to="/UserSettings">基本资料</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="13">
      <Link to="/MyVirtualGates">虚拟网关</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="14">
      <Link to="/MyAccessKey">AccessKey</Link>
    </Menu.Item>
  </Menu>
);
class App extends PureComponent {
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
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 50 }}>
            <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
            />
            <div className="headerUser">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#" style={{display: 'block', padding: '0 10px'}}>
                  <Icon type="user"/>
                  {
                    _getCookie('T&R_full_name').split(' ')[0]
                  }
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280
          }}
          >
            <ContentMain />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
