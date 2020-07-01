import React, { Component } from 'react'
class LoginForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <h2> Login </h2>
                    <div><i id="user" className="fas fa-user"></i> </div>
                    <div> <input type="email" placeholder="Email" id="Email"></input></div>
                    <div><i id="lock" className="fa fa-lock" ></i></div>
                    <div><input type="password" placeholder="********" id="password" ></input></div>
                    <div> <input type="checkbox"></input><label id="remember">Remember me</label> </div>
                    <div><input type="submit" className="btn" value="Login" /> </div>
                    <a href="??">Forget Password? </a>
                </form>
            </div>
        );
    }
}
export default LoginForm;