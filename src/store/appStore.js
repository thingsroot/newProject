import {observable, action} from 'mobx'
import {isAuthenticated} from '../utils/Session'

class AppStore {
  @observable isLogin = !!isAuthenticated()  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
  @observable users = []  //模拟用户数据库
  @observable loginUser = {}  //当前登录用户信息
  @observable gateList = []
  @observable status = {}
  @observable config ={}
  @action setGatelist (values) {
      this.gateList = [...values];
  }
  @action setStatus (values){
    console.log(values)
      this.status = {...values.basic}
      this.config = {...values.config}
  }
  @action toggleLogin (flag, info = {}) {
    this.loginUser = info  //设置登录用户信息

  }
  @action initUsers () {
    const localUsers = localStorage['users'] ? JSON.parse(localStorage['users']) : []
    this.users = [{username: 'admin', password: 'admin'}, ...localUsers]
  }
}

export default new AppStore()