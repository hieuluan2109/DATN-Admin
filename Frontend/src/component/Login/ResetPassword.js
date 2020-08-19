import React, { useEffect, useState, useRef } from "react";
// import Status from './StatusRequest'
import axios from "axios";
import Popup from "reactjs-popup";
import ForgotPassword from "./ForgotPassword";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import "../../css/login.scss";
import App from "./../../App";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import queryString from 'query-string'
import { BrowserRouter as Router,useLocation,useHistory } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
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
    color:'red'
  },
  login: {
    position: "relative",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "600",
  },
  btnLogin: {
    // backgroundColor: "#0B0B61",
    // outline: "none",
    // padding: "10px",
    // borderRadius: "25px",
    fontSize: "100%",
    width: "87%",
    marginTop: "20px",
    marginLeft: "2%",
    height: "50px",
    // color: "white",
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
}));


function ResetPassword (props){

  const classes = useStyles();
  const location = useLocation();
  const [email,setEmail]=useState('')
 const handleChange = (event) => {
  setEmail({
      [event.target.name]: event.target.value,
    });
  };
  console.log(location.search)
  let params = queryString.parse(location.search);
  console.log(params.code)

  const handleSubmit=(e)=>{
    // axios
    // .post("https://navilearn.herokuapp.com/admin/forgot-password", { email })
    // .then((res) => {
    //   console.log(res);
    //   if (res.data.success === true) {
    //     this.setState({ success: true });
    //   }
    //   else{
    //     this.setState({success:false})
    //   }
    // })
    // .catch((err) => {
    //   if(!err.success){
    //   this.setState({err:true,message:err.msg})
    //   console.log("Lỗi", err.success);
    //   }
    // });
  }
     
    return (
      <div>
        <Paper variant="outlined" className="form">
          <div className={classes.login}>Reset mật khẩu</div>
          <div className={classes.please}>
            Xin chào, Nguyễn Hiếu Luân <br/>Vui lòng điền đầy đủ thông tin bên dưới để reset mật khẩu
          </div>
          {/* <div id="error">{this.state.Error}</div> */}
          <form className={classes.form}>
            <TextField
              id="outlined-basic"
              label="Mật khẩu mới"
              type="password"
              name="password"
            //   value={this.state.name}
              variant="outlined"
              className={classes.txtLogin}
              onChange={props.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Xác nhận mật khẩu"
              type="password"
              name="repassword"
            //   value={this.state.name}
              variant="outlined"
              className={classes.txtLogin}
              onChange={props.handleChange}
            />

            <div>
              <Button variant="contained" type='submit' className={classes.btnHuybo} color="primary">
                Xác nhận
              </Button>
            
            </div>
          </form>
        </Paper>
      </div>
    );
  }
export default withStyles(useStyles, { withTheme: true })(ResetPassword);
