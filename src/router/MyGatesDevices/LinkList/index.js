import React, { PureComponent } from 'react';
import { Card } from 'antd';
class LinkList extends PureComponent {
    render () {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card title="基本信息" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
                </Card>
                <Card title="配置信息" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
                </Card>
            </div>
        );
    }
}

export default LinkList;