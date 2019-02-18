import React, { PureComponent } from 'react';
import './style.scss';
import { Layout, Icon } from 'antd';
import ContentMain from '../ContentMain';
const { Header, Content, Sider } = Layout;
import Siders from '../Siders';
import HeaderBar from '../HeaderBar';

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
      <Layout style={{minHeight: '100vh'}}>
        <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{width: '100%'}}
        >
          <Siders collapsed={this.state.collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 50, position: 'fixed', top: 0, right: 0, left: '200px '}}>
            <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
            />
            <HeaderBar />
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
