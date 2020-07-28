import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  // Link,
  NavLink,
  Redirect,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import LoginForm from "./component/Login/Login_Form";
import HomePage from "./view/Home";
import Profile from "./view/Profile";
import Users from "./view/Users";
import StudentList from "./view/Students";
import QuestionsList from "./view/Question";
import Topic from "./view/Topic";
import Cookies from "js-cookie";

import LoginV from "./view/Login";
import "./css/appbar.css";
import "./css/login.scss";

class Routers extends Component {
  render() {
    const token = Cookies.get("token");

    if (token != null) {
      return (
        <BrowserRouter>
          {/* <Route exac path="/" render={() => <Redirect to="/admin" />} /> */}
          <Route exact path="/">
            <div className="Login">
              <LoginV />
            </div>
          </Route>
          <Route exact path="/admin">
            <div className="admin">
              <HomePage />
            </div>
          </Route>
          <Route exact path="/profile">
            <div className="profile">
              <Profile />
            </div>
          </Route>
          <Route exact path="/users">
            <div className="users">
              <Users />
            </div>
          </Route>
          <Route exact path="/students">
            <div className="students">
              <StudentList />
            </div>
          </Route>
          <Route exact path="/questions">
            <div className="questions">
              <QuestionsList />
            </div>
          </Route>
          <Route exact path="/threads">
            <div className="threads">
              <Topic />
            </div>
          </Route>
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
        
          <Route  path="*" render={() => <Redirect to="/" />} />
          <Route exact path="/">
            <div className="Login">
              <LoginV />
            </div>
          </Route>
          <Route exact path="/admin">
            <div className="admin">
              <HomePage />
            </div>
          </Route>
        </BrowserRouter>
      );
    }

    // return (
    // <BrowserRouter>
    //   <div>
    //     <Switch>
    //      <Route exact path="/">
    //         <div className="Login">
    //           <div className="row">
    //             <div className="col span-2-of-3"></div>
    //             <div className="col span-1-of-3">
    //               <LoginV />
    //             </div>
    //           </div>
    //         </div>
    //       </Route>
    //       <Route exact path="/admin">
    //         <div className="admin">
    //           <HomePage />
    //         </div>
    //       </Route>
    //       <Route exact path="/profile">
    //         <div className="profile">
    //           <Profile />
    //         </div>
    //       </Route>
    //       <Route exact path="/users">
    //         <div className="users">
    //           <Users />
    //         </div>
    //       </Route>
    //       <Route exact path="/students">
    //         <div className="students">
    //           <StudentList />
    //         </div>
    //       </Route>
    //       <Route exact path="/questions">
    //         <div className="questions">
    //           <QuestionsList />
    //         </div>
    //       </Route>
    //       <Route exact path="/threads">
    //         <div className="threads">
    //           <Topic />
    //         </div>
    //       </Route>
    //     </Switch>

    //   </div>
    // </BrowserRouter>

    // );
  }
}

export default Routers;
