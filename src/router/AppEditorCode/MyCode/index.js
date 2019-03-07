import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import AceEditor from 'react-ace';
import http from '../../../utils/Server';
import 'brace/mode/java';
import 'brace/theme/github';
@withRouter
@inject('store')
@observer

class MyCode extends PureComponent {
    constructor (props){
        super(props);
        this.state = {
            editorContent: '',
            mode: '',
            app: '',
            fileName: ''
        }
    }
    componentDidMount () {
        this.getContent();
    }
    componentWillReact () {
        console.log(this.props)
    }
    getContent = ()=>{
        http.get('/api/method/app_center.editor.editor?app=' + this.props.match.params.app + '&operation=get_content&id=' + this.props.store.codeStore.fileName)
            .then(res=>{
                console.log('==============');
                console.log(res);
                this.setState({
                    editorContent: res.content,
                    mode: res.type
                })
            })
    };
    onChange = (newValue, editor)=>{
        console.log(this);
        console.log(newValue);
        console.log(editor);
        this.setState({
            editorCode: this
        })
    };
    render () {
        const { fontSize } = this.props;
        console.log('----------------------')

        return (
            <div className="myCode">
                <AceEditor
                    style={{width: '100%', height: '600px'}}
                    mode="java"
                    theme="github"
                    fontSize={fontSize}
                    onChange={this.onChange.bind(this)}
                    value={this.state.editorContent}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                />
            </div>
        );
    }
}

export default MyCode;