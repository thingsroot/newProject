import {observable, action} from 'mobx';
class CodeStore {
    @observable fileName = 'version';
    @action setFileName (values) {
        this.fileName = [...values];
        console.log(values)
    }
}

export default new CodeStore()