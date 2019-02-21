import React, { PureComponent } from 'react';
import { Switch, Redirect, withRouter} from 'react-router-dom';
import LoadableComponent from '../../utils/LoadableComponent';
import PrivateRoute from '../PrivateRoute';
const Home = LoadableComponent(()=>import('../../router/Home'));
const MyGates = LoadableComponent(()=>import('../../router/MyGates'));
const MyApps = LoadableComponent(()=>import('../../router/MyApps'));
const UserSettings = LoadableComponent(()=>import('../../router/UserSettings'));
const MyAccessKey = LoadableComponent(()=>import('../../router/MyAccessKey'));
const MyVirtualGates = LoadableComponent(()=>import('../../router/MyVirtualGates'));
const MyGatesDevices = LoadableComponent(()=>import('../../router/MyGatesDevices'));
const MyGatesAppsInstall = LoadableComponent(()=>import('../../router/MyGatesAppsInstall'));
const PlatformMessage = LoadableComponent(()=>import('../../router/platformMessage'))
const DeviceMessage = LoadableComponent(()=>import('../../router/deviceMessage'))
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
                <PrivateRoute
                    path="/MyGatesDevices/:sn"
                    component={MyGatesDevices}
                />
                <PrivateRoute
                    path="/MyGatesAppsInstall/:sn"
                    component={MyGatesAppsInstall}
                />
                <PrivateRoute
                    path="/PlatformMessage"
                    component={PlatformMessage}
                />
                <PrivateRoute
                    path="/DeviceMessage"
                    component={DeviceMessage}
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