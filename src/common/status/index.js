import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './style.scss';
@withRouter
@inject('store')
@observer
class Status extends Component {
    render () {
        const { url } = this.props.match;
        const { status } = this.props.store.appStore;
        return (
            <div className="statusWrap">
                <div>
                    <div className="status"></div>
                    &nbsp; <span className={status.status === 'ONLINE' ? 'online' : 'offline'}>{status.status}</span>
                </div>
                <div>
                    <div className="positon"><span></span></div>
                    &nbsp;名称: {status.name}
                </div>
                <div>
                    <div className="positon"><span></span></div>
                    &nbsp;描述: {status.desc}
                </div>
                <div>
                    <div className="positon"><span></span></div>
                    &nbsp;序号: {status.sn}
                </div>
                <div>
                    <Link to="/MyGatesLogviewer"
                        style={{color: 'blue'}}
                    >   <Icon type="ordered-list"
                        style={{color: 'blue'}}
                        />日志</Link>
                </div>
                <div>
                    <Link to={`${url}/MyGatesAppsInstall`}>
                        安装新应用
                    </Link>
                </div>
            </div>
        );
    }
}
export default Status;