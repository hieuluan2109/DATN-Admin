import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    NavLink,
    // useRouteMatch,
    // useParams
} from "react-router-dom";
import LoginForm from './component/Login/Login_Form'
import Dashboard from './view/Dashboard'
import Profile from './view/Profile'
import Users from './view/Users'
import './css/appbar.css'
function Routers() {
    return (
        <Router>
            <div>
                <NavLink to="/" ></NavLink>
                <NavLink to="/admin" ></NavLink>
                <Switch>
                    <Route exact path="/">
                        <div className="Login">
                            <div className="row">
                                <div className="col span-2-of-3">
                                </div>
                                <div className="col span-1-of-3">
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Route exact path="/admin">
                        <div className="admin">
                            <Dashboard />
                        </div>
                    </Route>
                    <Route exact path="/profile">
                        <div className="profile">
                            <Dashboard  />  
                            <Profile />
                        </div>
                    </Route>
                    <Route exact path="/users">
                        <div className="users">
                            <Dashboard  />  
                            <Users />
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    )


}

export default Routers;