import React, { PureComponent } from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import Status from '../../common/status';
import LeftNav from '../../components/LeftNav';
import LoadableComponent from '../../utils/LoadableComponent';
import PrivateRoute from '../../components/PrivateRoute';
import './style.scss';

const GatesList = LoadableComponent(()=>import('./GatesList'));
const AppsList = LoadableComponent(()=>import('./AppsList'));
const LinkList = LoadableComponent(()=>import('./LinkList'));

@withRouter
class MyGatesDevices extends PureComponent {
    render () {
      console.log(this.props)
      let { path } = this.props.match;
        return (
            <div >
                <Status />
                <div className="mygatesdevices">
                  <LeftNav />
                  <div className="mygateslist">
                    <Switch>
                      <PrivateRoute path={`${path}/GatesList`}
                          component={GatesList}
                      />
                      <PrivateRoute path={`${path}/AppsList`}
                          component={AppsList}
                      />
                      <PrivateRoute path={`${path}/LinkList`}
                          component={LinkList}
                      />
                      <Redirect from={path}
                          to={`${path}/GatesList`}
                      />
                    </Switch>
                  </div>
                </div>
            </div>
        );
    }
}
export default MyGatesDevices;