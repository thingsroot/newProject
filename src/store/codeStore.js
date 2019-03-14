import {observable, action} from 'mobx';
class CodeStore {
    @observable treeData = [];
    @observable isChange = false;
    @observable folderType = '';
    @observable myFolder = '';
    @observable editorContent = '';
    @observable newEditorContent = '';
    @observable myEditor = null;
    @observable fileName = 'version';
    @observable addFileName = '';
    @observable addFolderName = '';
    @action setEditorContent (values) {
        this.editorContent = values;
    }
    @action setTreeData (values) {
        this.treeData = [...values];
    }
    @action setMyEditor (values) {
        this.myEditor = values;
    }
    @action setMyFolder (values) {
        this.myFolder = values;
    }
    @action setFolderType (values) {
        this.folderType = values;
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
    @action setAddFileName (values) {
        this.addFileName = values;
    }
    @action setAddFolderName (values) {
        this.addFolderName = values;
    }

}

export default new CodeStore()