import React, { PureComponent } from 'react';
import LoadableComponent from '../../utils/LoadableComponent';
import { Switch, Redirect, withRouter} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
const Home = LoadableComponent(()=>import('../Home'));
const MyGates = LoadableComponent(()=>import('../MyGates'));
const MyApps = LoadableComponent(()=>import('../MyApps'));
const UserSettings = LoadableComponent(()=>import('../UserSettings'));
const MyAccessKey = LoadableComponent(()=>import('../MyAccessKey'));
const MyVirtualGates = LoadableComponent(()=>import('../MyVirtualGates'));
class ContentMain extends PureComponent {
    render (){
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
                <PrivateRoute
                    path="/UserSettings"
                    component={UserSettings}
                />
                <PrivateRoute
                    path="/MyAccessKey"
                    component={MyAccessKey}
                />
                <PrivateRoute
                    path="/MyVirtualGates"
                    component={MyVirtualGates}
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