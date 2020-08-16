import React, { Component } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import ForgotPassword from "./ForgotPassword";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import Alert from '@material-ui/lab/Alert';
import "../../css/login.scss";
import App from "./../../App";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
    Link,
  } from "react-router-dom";
const styles = (theme) => ({
  txtLogin: {
    margin: theme.spacing(1),
    width: "40ch",
  },
  form: {
    position: "absolute",
    top: "65%",
    left: "50%",
    transform: "translate(-45%, -50%)",
    width: "400px",
    marginRight: "10%",
  },
  login: {
    position: "relative",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "600",
  },
  btnLogin: {
    fontSize: "100%",
    width: "87%",
    marginTop: "20px",
    marginLeft: "2%",
    height: "50px",
  },
  forgot: {
    marginTop: "20px",
    marginLeft: "57%",
  },
  please: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "30px",
  },
  btnHuybo: {
    fontSize: "100%",
    width: "87%",
    marginTop: "20px",
    marginLeft: "2%",
    height: "50px",
  },link:{textDecoration:'none'}
});

class Forgot extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false;
    this.state = {
      email: "",
      password: "",
      error:false,
      loggedIn,
      cookie: null,
    }
    
  }

  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit=(event)=>{
  
    event.preventDefault();
    const regexE = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    const {email}=this.state
    // if(!email||!regexE.test(email)){
    //   this.setState({error:true})
    // }
    axios.post('http://navilearn.herokuapp.com/admin/reset-password',{email}).then((res)=>{
        console.log(res)
    }).catch((error)=>{
        console.log('Lỗi',error)
    })
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper variant="outlined" className="form">
          <div className={classes.login}>Quên mật khẩu?</div>
          <div className={classes.please}>
            Vui lòng nhập email đã đăng ký và kiểm tra hộp thư
          </div>
          <div id="error">{this.state.Error}</div>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              id="outlined-basic"
              label="Email"
              type="Email"
              name="email"
              value={this.state.name}
              variant="outlined"
              className={classes.txtLogin}
              onChange={this.handleChange}
            />

            <div>
              <Button variant="contained" onsubmit={this.handleSubmit} className={classes.btnLogin} color="primary" type="submit">
                Tiếp tục
              </Button>
              {/* <input
                type="submit"
                className={classes.btnLogin}
                onChange={this.handleChange}
                value="Tiếp tục"
              /> */}
              <Link to='/' className={classes.link}> <Button variant="contained" className={classes.btnHuybo} color="primary">
                Hủy bỏ
              </Button></Link>
              {/* <input
                type="text"
                className={classes.btnHuybo}
                onChange={this.handleChange}
                value="Hủy bỏ"
              /> */}
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Forgot);
