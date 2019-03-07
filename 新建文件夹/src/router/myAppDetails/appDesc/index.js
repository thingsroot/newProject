import React, { PureComponent } from 'react';
import marked from 'marked';
import http from '../../../utils/Server';

class AppDesc extends PureComponent {
    state = {
        editorContent: '',
        input: '# Marked in browser\n\nRendered by **marked**.'
    };
    componentDidMount (){
        const {name} = this.props;
        console.log(name);

        http.postToken('/api/method/app_center.api.app_detail?app=' + name).then(res=>{
            this.setState({
                editorContent: res.message.description
            });
            console.log(this.state.editorContent)
        });

        let rendererMD = new marked.Renderer();
        marked.setOptions({
            renderer: rendererMD,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });//基本设置
        console.log(marked('I am using __markdown__.'));
        document.getElementById('editor').innerHTML =
            marked(this.state.input);
    }
    render () {
        return (
            <div className="appDesc">
                <div id="editor"> </div>
            </div>
        );
    }
}

export default AppDesc;