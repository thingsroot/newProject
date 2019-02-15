import React, { PureComponent } from 'react';
import LoadableComponent from '../../utils/LoadableComponent';
import { Switch, Redirect, withRouter} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
const Home = LoadableComponent(()=>import('../Home'));
const MyGates = LoadableComponent(()=>import('../MyGates'));
const MyApps = LoadableComponent(()=>import('../MyApps'));
class ContentMain extends PureComponent {
    render () { 
        return (
            <Switch>
                <PrivateRoute
                    path="/Home"
                    component={Home}
                />
                <PrivateRoute
                    path="/MyGates"
                    component={MyGates}
                />
                <PrivateRoute
                    path="/MyApps"
                    component={MyApps}
                />
                <Redirect
                    from="/"
                    to="/Home"
                />
            </Switch>
        );
    }
}

export default withRouter(ContentMain);