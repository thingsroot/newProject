import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './style.scss';
@withRouter
class LeftNav extends PureComponent {
    state = {
        list: [
            {
                icon: 'table',
                text: '设备列表',
                href: '/GatesList'
            }, {
                icon: 'table',
                text: '应用列表',
                href: '/AppsList'
            }, {
                icon: 'table',
                text: '网关状态',
                href: '/LinkStatus'
            }
        ],
        index: 0
    }
    
    componentDidMount (){
        const { pathname } = this.props.location;
        if (pathname.indexOf('/AppsList') !== -1){
            this.setState({
                index: 1
            });
        } else if (pathname.indexOf('/LinkStatus') !== -1){
            this.setState({
                index: 2
            });
        }
    }
    setIndex (key){
        this.setState({
            index: key
        })
    }
    render () {
        const { list, index } = this.state;
        const { url } = this.props.match;
        return (
            <div className="leftnav">
                <div className="navlist">
                    <p>基本功能</p>
                    <ul>
                        {
                            list.map((v, i)=>{
                                return (
                                    <Link to={`${url}${v.href}`} key={i} onClick={()=>{
                                        this.setIndex(i)
                                    }}><li className={index === i ? 'active' : ''}><Icon type={v.icon}/>&nbsp;&nbsp;{v.text}</li></Link>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="navlist">
                    <p>扩展功能</p>
                    <ul>
                        <li>VPN通道</li>
                    </ul>
                </div>
            </div>
        );
    }
}
 
export default LeftNav;