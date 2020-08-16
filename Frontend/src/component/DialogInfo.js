import { withStyles } from "@material-ui/core/styles";
import React, { Component, Fragment } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
const styles = (theme) => ({
  selectsort: {
    position: "absolute",
    top: "10px",
    right: "25px",
  },
  formInfo: {
    marginTop: "107px",
    marginRight: "6%",
    marginLeft: "6%",
    height: "100%",
    background: "white",
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
});

class DialogInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errors: "",
      status: true,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.onClickInfor(this.props.id, this.props.age);
  };
  handleClose = () => {
    this.setState({ open: false, errors: "",status:true });
    this.props.setError();

  };
  CheckValid = () => {
    const regexp = /[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
    const regSDT = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let today = new Date();
    let getdate = today.getDate();
    let getmonth = today.getMonth() + 1;
    let getyear = today.getFullYear();
    if (getdate < 10) {
      getdate = "0" + getdate;
    }
    if (getmonth < 10) {
      getmonth = "0" + getmonth;
    }
    // today=today()
    const getToday = getyear + "-" + getmonth + "-" + getdate;
    if (this.props.Data.ho == "") {
      this.setState({ errors: "Họ không được bỏ trống", status: true });
    } else if (!regexp.test(this.props.Data.ho)) {
      this.setState({ errors: "Họ không hợp lệ", status: true });
    } else if (this.props.Data.sdt == "") {
      this.setState({ errors: "Số điện thoại không được bỏ trống" });
    } else if (!regSDT.test(this.props.Data.sdt)) {
      this.setState({ errors: "Số điện thoại không hợp lệ" });
    } else if (this.props.Data.ten == "") {
      this.setState({ errors: "Tên không được bỏ trống", status: true });
    } else if (!regexp.test(this.props.Data.ten)) {
      this.setState({ errors: "Họ không hợp lệ", status: true });
    } else if (this.props.Data.ngay_sinh >= getToday) {
      this.setState({ errors: "Ngày sinh không hợp lệ", status: true });
    } else {
      this.setState({ errors: "", status: false });
    }
  };

  render() {
    const { classes } = this.props;
    const { open, errors, status } = this.state;
    return (
      <div>
        <IconButton
          name="icon"
          size="small"
          className={classes.eyes}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          {this.props.icon}
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Thông Tin {this.props.age ? this.props.title : " Sinh Viên"}
          </DialogTitle>
          <span style={{ textAlign: "center", color: "red" }}>
            {errors}
            {this.props.success}
          </span>
          <DialogContent>
            <form onSubmit={this.props.onSubmit}>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Họ</label>
                <TextField
                  size="small"
                  name="ho"
                  variant="outlined"
                  value={this.props.Data.ho}
                  onChange={this.props.handleChange}
                  className={classes.contentFormControl}
                  disabled={this.props.status}
                  onBlur={this.CheckValid}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Tên</label>
                <TextField
                  size="small"
                  name="ten"
                  variant="outlined"
                  className={classes.contentFormControl}
                  value={this.props.Data.ten}
                  disabled={this.props.status}
                  onChange={this.props.handleChange}
                  onBlur={this.CheckValid}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Email</label>
                <TextField
                  size="small"
                  name="email"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.Data.email}
                  disabled={true}
                  onChange={this.props.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Ngày sinh</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Fragment>
                    <DatePicker
                      className={classes.contentFormControl}
                      onBlur={this.CheckValid}
                      format="yyyy/MM/dd"
                      name="ngay_sinh"
                      disabled={this.props.status}
                      onChange={this.props.handleDateChange}
                      value={this.props.Data.ngay_sinh}
                    />
                  </Fragment>
                </MuiPickersUtilsProvider>
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>
                  Số điện thoại
                </label>
                <TextField
                  size="small"
                  name="sdt"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="number"
                  value={this.props.Data.sdt}
                  disabled={this.props.status}
                  onChange={this.props.handleChange}
                  onBlur={this.CheckValid}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Giới tính</label>
                <TextField
                  size="small"
                  name="gioi_tinh"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.Data.gioi_tinh ? "Nam" : "Nữ"}
                  disabled={true}
                  onChange={this.props.handleChange}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Người tạo</label>
                <TextField
                  size="small"
                  name="nguoi_tao_id"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.name.fname + " " + this.props.name.lname}
                  disabled={true}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Ngày tạo</label>
                <TextField
                  size="small"
                  name="ngay_tao"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.Data.createdAt}
                  disabled={true}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Cập nhật</label>
                <TextField
                  size="small"
                  name="update"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.Data.updatedAt}
                  disabled={true}
                />
              </div>
              <DialogActions>
                {/* <Button onClick={this.handleClose} color="primary"    style={{ display: this.props.age == true ? "block" : "none"}}>
              Hủy bỏ
            </Button> */}
                <Button
                  name="btnXacNhan"
                  type={this.props.type}
                  onClick={this.props.status ? this.handleClose : ""}
                  color="primary"
                  disabled={this.props.status ? "" : status}
                >
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

export default withStyles(styles, { withTheme: true })(DialogInfo);
