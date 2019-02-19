import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';
@inject('store')
class Status extends PureComponent {
    render () {
        return (
            <div className="statusWrap">
                <div>
                    <div className="status"><span></span></div>
                    &nbsp;名称: {this.props.store.appStore.status.name}
                </div>
                <div>
                    <div className="positon"><span></span></div>
                    &nbsp;名称: {this.props.store.appStore.status.name}
                </div>
                <div>
                    <div className="positon"><span></span></div>
                    &nbsp;描述: {this.props.store.appStore.status.describe}
                </div>
                <div>
                    <div className="positon"><span></span></div>
                    &nbsp;序号: {this.props.store.appStore.status.sn}
                </div>
                <div>
                    <Icon type="ordered-list"
                        style={{color: 'blue'}}
                    />
                    <Link to="/MyGatesLogviewer"
                        style={{color: 'blue'}}
                    >日志</Link>
                </div>
            </div>
        );
    }
}
export default Status;