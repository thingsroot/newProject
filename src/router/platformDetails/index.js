import React, { PureComponent } from 'react';
import http from '../../utils/Server';
// import axios from 'axios';
class PlatformDetails extends PureComponent {
    state = {
        data: {}
    };
    componentDidMount (){
        let name = this.props.match.params.name;
        console.log(name);
        http.postToken('/api/method/iot.user_api.dispose_device_activity?name=' + name + '&disposed=1').then(res=>{
            console.log(res);
        });
        http.postToken('/api/method/iot.user_api.device_activity_detail?name=' + name).then(res=>{
            console.log(res);
            this.setState({
                data: res.message
            })
        })
    }
    render () {
        return (
            <div className="platformDetails">
                <table>
                    <tr>
                        <td></td>
                        <td>{this.state.data.name}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default PlatformDetails;