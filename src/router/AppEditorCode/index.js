import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import MyTree from './MyTree/';
import MyCode from './MyCode';
import './style.scss';
import http from '../../utils/Server';

class AppEditorCode extends PureComponent {
    constructor (props){
        super(props);
        this.state = {
            fontSize: 16,
            appName: '',
            version: '',
            fileName: ''
        }
    }
    componentDidMount () {
        let app = this.props.match.params.app;
        let appName = this.props.match.params.name;
        this.setState({
            appName: appName,
            app: app
        });
        //设备应用和平台应用对比
        http.get('/api/method/app_center.editor.editor_worksapce_version?app=' + app)
            .then(res=>{
                let worksapceVersion = res.message;
                console.log(worksapceVersion);
                if (worksapceVersion && worksapceVersion !== 'undefined') {
                    http.get('/api/method/app_center.api.get_latest_version?app=' + app + '&beta=' + 1)
                        .then(data=>{
                            let lastVersion = data.message;
                            console.log(lastVersion);
                            if (worksapceVersion !== lastVersion) {
                                //提示当前工作区是会基于worksapceVersion，当前的最新版本为latest_version（弹框）
                                this.setState({
                                    version: worksapceVersion
                                })
                            } else if (worksapceVersion === lastVersion ) {
                                //提示当前工作区是基于最新版本（弹框）
                                this.setState({
                                    version: lastVersion
                                })
                            }
                        });
                    //http
                } else {
                    http.get('/api/method/app_center.api.get_latest_version?app=' + app + '&beta=' + 1)
                        .then(data=>{
                            console.log(data.message);
                            if (data.message === 'undefined') {
                                //工作区为空，不显示title（title还没写）
                                //暂时还没有版本，请先上传（全局提示）
                                this.setState({
                                    version: ''
                                })
                            } else if (typeof data.message === 'number' ) {
                                //初始化工作区域到最新版本
                                http.get('/api/method/app_center.editor.editor_init?app=' + app + '&version=' + data.message)
                                    .then(res=>{
                                        console.log(res);
                                        let initVersion = res.message;
                                        console.log(initVersion);
                                        this.setState({
                                            version: initVersion
                                        });
                                        //提示：当前工作区是基于版本initVersion,
                                        // 请将设备中的应用升级到版本initVersion，或者将工作区重置到之前版本。
                                        window.location.reload();
                                    })
                            }

                        });
                    //http
                }
            })

    }

    zoomIn = ()=>{
        let size = this.state.fontSize - 2;
        this.setState({
            fontSize: size
        })
    };
    zoomOut = ()=>{
        let size = this.state.fontSize + 2;
        this.setState({
            fontSize: size
        })
        console.log(this.state.fileName)
    };

    render () {
        const {
            fontSize,
            appName
        } = this.state;
        return (
            <div className="appEditorCode">
                <div className="iconGroup">
                    <p>
                        <Icon type="zoom-in"/>
                    </p>
                    <p>
                        <Icon type="zoom-in" onClick={this.zoomOut} />
                        <Icon type="zoom-out" onClick={this.zoomIn}/>
                        {/*<Icon type="undo" onClick={this.keyPress}/>*/}
                        {/*<Icon type="redo" onClick={this.keyPress} />*/}
                    </p>
                </div>
                <div className="main">
                    <div className="tree">
                        <MyTree
                            appName={appName}
                            getFileName={this.getFileName}
                        />
                    </div>
                    <div className="code">
                        <MyCode
                            fontSize={fontSize}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AppEditorCode;