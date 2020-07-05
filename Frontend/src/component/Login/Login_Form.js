import React, { Component } from 'react'
// import Status from './StatusRequest'
import axios from 'axios'
import Popup from "reactjs-popup";
import ForgotPassword from './ForgotPassword';
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            Error: "",
            // validEmail:"/^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$\/"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    //   handleChanges = (event) => {
    //     this.setState({ password: event.target.value           
    //     });
    //   }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state
        // POST #1
        axios({
            method: 'post',
            url: 'http://localhost:8000/admin/login',
            data: { email, password }
        }).then(res => {
            console.log(res.data)
            if (res.data.success === true) {
                this.setState({
                    Error: ""
                });
            }
        }).catch((error) => {
            console.log("Lỗi", error.response.data.success)

            if (email.length === 0) {
                this.setState({
                    Error: "Vui lòng nhập email"
                });
            }
            else if (password === "") {
                this.setState({
                    Error: "Vui lòng nhập password"
                });
            }
            else if (password.length <= 6) {
                this.setState({
                    Error: "Password phải từ 6 kí tự"
                });
            } else if (error.response.data.success === false) {
                this.setState({
                    Error: "Email hoặc password không đúng"
                });
            }
            else {
                this.setState({
                    Error: ""
                });
            }
        });
    }
    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h2> Login </h2>
                    <div id="error">{this.state.Error}</div>
                    <div>
                        <i id="user" className="fas fa-user"></i>
                    </div>
                    <div>
                        <input className="iput"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={this.state.name}
                            onChange={this.handleChange}>
                        </input>
                    </div>
                    <div><i id="lock" className="fa fa-lock" > </i> </div>
                    <div>
                        <input className="iput"
                            type="password"
                            placeholder="********"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange} >
                        </input>
                    </div>
                    <div className="checkb"> <input type="checkbox"></input><label id="remember">Remember me</label> </div>
                    <div>
                        <input type="submit"
                            className="btn"
                            value="Login" />
                    </div>

                </form>

                <Popup trigger={<span>Forget Password</span>} modal>
                    {close => <ForgotPassword close={close} />}
                </Popup>

            </div>
        );
    }
}
export default LoginForm;