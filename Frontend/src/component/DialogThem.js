import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SelectSort from "./SelectSort";
import axios from "axios";
import Cookies from "js-cookie";

const styles = (theme) => ({
  btnThem: {
    position: "absolute",
    right: "7%",
    marginTop: "15px",
    borderRadius: "5px",
    background: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      background: theme.palette.primary.light,
    },
  },
  selectsort: {
    position: "absolute",
    top: "10px",
    right: "25px",
  },

  textField: {
    marginLeft: "100px",
    position: "relative",
    marginTop: "-28px",
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "65px",
    marginLeft: 60,
    fontSize: 17,
  },
  formControl: {
    maxwidth: "700px",
  },
  titleFormControl: {
    width: "100px",
    float: "left",
    paddingTop: "32px",
  },
  contentFormControl: {
    width: "400px",
    borderRadius: "5px",
    height: "30px",
    paddingLeft: "10px",
    marginTop: "25px",
    outline: "none",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  ngaysinh: {
    position: "absolute",
    marginTop: "30px",
  },
  contentNgaysinh: {
    marginTop: "5px",
    marginLeft: "100px",
  },
  //    iconbtnThem:{
  //     // background:theme.palette.primary.light,
  //     color:'white',
  //     '&:hover':{
  //         color:theme.palette.primary.light,
  //         background:'white',
  //         fontWeight:500
  //     }
  // }
});

class DialogThem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ho: "",
      ten: "",
      email: "",
      ngay_sinh: "",
      password: "",
      confirmpassword: "",
      errors: "",
      ma_sv:''
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { ho, ten, email,ma_sv, password, ngay_sinh } = this.state;
    console.log(this.props.token);
    var url='';
    (this.props.value==true)?url='https://navilearn.herokuapp.com/admin/user/add/teacher':url='https://navilearn.herokuapp.com/admin/user/add/student';
    var params;
    (this.props.value==true)?params={ ho, ten, email, ngay_sinh, password }:params={ ho, ten, email,ma_sv, ngay_sinh, password }
    console.log(params)
    axios
      .post(
        url,
        params,
        { headers: { Authorization: `Bearer ${this.props.token}` } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Lỗi", error.response.data);
      });
  };

  render() {
    const { classes, children } = this.props;
    const { open, errors } = this.state;
    // const { ho, ten, email, password,ngaysinh } = this.state;
    return (
      <div>
        <Button
          className={classes.btnThem}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          <AddCircleIcon className={classes.iconbtnThem} />
          Thêm
        </Button>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Thêm mới tài khoản
            <div className={classes.selectsort}>{children}</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Để tạo tài khoản, vui lòng điền đầy đủ các thông tin
            </DialogContentText>
            {errors}
            <form onSubmit={this.handleSubmit}>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Họ</label>
                <input
                  className={classes.contentFormControl}
                  name="ho"
                  type="text"
                  value={this.state.ho}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Tên</label>
                <input
                  className={classes.contentFormControl}
                  name="ten"
                  type="text"
                  value={this.state.ten}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl} style={{display:this.props.display}}>
                <label className={classes.titleFormControl}>MSSV</label>
                <input
                  className={classes.contentFormControl}
                  name="ma_sv"
                  type="text"
                  value={this.state.ma_sv}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Email</label>
                <input
                  name="email"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <span className={classes.ngaysinh}>Ngày sinh</span>
              <TextField
                name="ngay_sinh"
                label="Birthday"
                type="date"
                value={this.state.ngay_sinh}
                className={classes.contentNgaysinh}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
              />

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Mật khẩu</label>
                <input
                  name="password"
                  className={classes.contentFormControl}
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>
                  Xác nhận mật khẩu
                </label>
                <input
                  name="confirmpassword"
                  className={classes.contentFormControl}
                  type="password"
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                />
              </div>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Hủy bỏ
                </Button>
                <Button type="submit" color="primary">
                  Xác nhận
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogThem);
