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
      <Layout>
        <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
        >
          <Siders collapsed={this.state.collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 50 }}>
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
