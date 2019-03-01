import React, { PureComponent } from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import { Button, Icon, Tabs } from 'antd';
import './style.scss';
import marked from 'marked';
import PrivateRoute from '../../components/PrivateRoute';
import VersionList from './versionList'
import TemplateList from './templateList'

const TabPane = Tabs.TabPane;

class MyAppDetails extends PureComponent {
    componentDidMount (){
        let rendererMD = new marked.Renderer();
        marked.setOptions({
            renderer: rendererMD,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });//基本设置
        console.log(marked('I am using __markdown__.'));
        // document.getElementById('editor').innerHTML =
        //     marked('# Marked in browser\n\nRendered by **marked**.');
    }
    callback = (key)=>{
        console.log(key);

    };

    render () {
        const { url } = this.props.match;
        // let name = this.props.match.params.name;
        return (
            <div className="myAppDetails">
                <div className="header">
                    <span>gps</span>
                    <span>创建时间:2019-02-11</span>
                </div>
                <div className="details">
                    <div className="appImg">
                        <img src=""
                            alt=""
                        />
                    </div>
                    <div className="appInfo">
                        <p className="appName">appname</p>
                        <p className="info">
                            <span>应用分类：SYS</span>
                            <span>通讯协议：private</span><br/>
                            <span>适配型号：Q102</span>
                            <span>设备厂商：东笋科技</span>
                        </p>
                    </div>
                    <div className="btnGroup">
                        <Button style={{margin: '0 10px'}}>
                            <Icon type="setting" />
                            设置
                        </Button>
                        <Button style={{margin: '0 10px'}}>
                            <Icon type="edit" />
                            代码编辑
                        </Button>
                        <Button style={{margin: '0 10px'}}>
                            <Icon type="download" />
                            下载
                        </Button>
                        <Button style={{margin: '0 10px'}}>
                            <Icon type="share-alt" />
                            分支
                        </Button>
                    </div>
                </div>
                <Tabs onChange={this.callback}
                    type="card"
                >
                    <TabPane tab={<Link to={`${url}/desc`}>描述</Link>}
                        key="1"
                    > </TabPane>
                    <TabPane tab={<Link to={`${url}/versionList`}>版本列表</Link>}
                        key="2"
                    > </TabPane>
                    <TabPane tab={<Link to={`${url}/templateList`}>模板列表</Link>}
                        key="3"
                    > </TabPane>
                </Tabs>
                <div className="content">
                    <Switch>
                        <PrivateRoute path={`${url}/versionList`}
                            component={VersionList}
                        />
                        <PrivateRoute path={`${url}/templateList`}
                            component={TemplateList}
                        />
                        <Redirect from={url}
                            to={`${url}/versionList`}
                        />
                    </Switch>
                </div>
                {/*<div id="editor"> </div>*/}
            </div>
        );
    }
}

export default MyAppDetails;