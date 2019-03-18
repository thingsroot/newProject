import React, { PureComponent } from 'react';


import http from '../../utils/Server';

class MyTemplateDetails extends PureComponent {
    constructor () {
        super();
        this.state = {
            content: ''
        }
    }
    componentDidMount () {
        let app = this.props.match.params.app;
        let name = this.props.match.params.name;
        let version = this.props.match.params.version;
        http.get('/api/method/conf_center.api.app_conf_data?app=' + app +
            '&conf=' + name + '&version=' + version)
            .then(res=>{
                console.log(res.message);
                this.setState({
                    content: res.message.data
                });
            })
    }

    render () {
        return (
            <div className="MyTemplateDetails">
                <div>

                </div>
                <div className="main">

                </div>
            </div>
        );
    }
}

export default MyTemplateDetails;