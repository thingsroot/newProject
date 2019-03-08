import {observable, action} from 'mobx';
class CodeStore {
    @observable isChange = false;
    @observable editorContent = '';
    @observable newEditorContent = '';
    @observable fileName = 'version';
    @action setEditorContent (values) {
        this.editorContent = values;
    }
    @action setNewEditorContent (values) {
        this.newEditorContent = values;
    }
    @action change () {
        this.isChange = !this.isChange
    }
    @action setFileName (values) {
        this.fileName = values;
    }
}

export default new CodeStore()