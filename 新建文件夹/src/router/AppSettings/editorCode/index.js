import React, { PureComponent } from 'react';
import { split as SplitEditor} from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';

class EditorCode extends PureComponent {
    state = {
        data: ['qwer', {
            'serial': {
                'parity': 'NONE',
                'baudrate': 9600,
                'stop_bits': 1,
                'flow_control': 'OFF',
                'data_bits': 8,
                'port': '/dev/ttymcx0'
            },
            'protocol': 'rtu',
            'socket': {
                'host': '192.168.1.132',
                'port': 502,
                'nodelay': true
            },
            'Link_type': 'serial'
        }]
    };
    render () {
        return (
            <div
                className="editorCode"
                style={{width: '100%'}}
            >
                <div style={{padding: '20px 0'}}>
                    <SplitEditor
                        style={{width: '100%'}}
                        mode="json"
                        theme="github"
                        splits={2}
                        orientation="beside"
                        value={['hi', 'hello']}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                    />
                </div>
            </div>
        );
    }
}

export default EditorCode;