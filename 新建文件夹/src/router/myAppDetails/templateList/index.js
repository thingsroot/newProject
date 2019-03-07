import React, { PureComponent } from 'react';

class TemplateList extends PureComponent {
    render () {
        let {name} = this.props;
        console.log(name);
        return (
            <div className="templateList">

            </div>
        );
    }
}
export default TemplateList;