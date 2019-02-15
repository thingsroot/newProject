import React, { PureComponent } from 'react';
import './index.scss'

class Home extends PureComponent {
    render () { 
        return (
            <div className="home">
                <div className="main">
                    <div>
                        <p>在线统计</p>
                        
                    </div>
                    <div>
                        <p>故障统计</p>
                    </div>
                    <div>
                        <p>网关型号统计</p>
                    </div>
                    <div>
                        <p>故障类型统计</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;