import {observable, action} from 'mobx';
class CodeStore {
    @observable fileName = [];
    @action setFileName (values) {
        this.fileName = values;
        console.log(this.fileName)
    }
}

export default new CodeStore()