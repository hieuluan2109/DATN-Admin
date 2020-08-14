import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import TabTest from "./Tabs";
const styles = (theme) => ({
  dialogPaper: {
    minHeight: "90vh",
    maxHeight: "90vh",
    minWidth: "140vh",
    // maxWidth: "170vh",
  },
  heightgrd: { height: "90vh", width: "140vh" },
  info: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "220px",
    marginBottom:'20px'
  },
});

class ClassRoomDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      errors: "",
      status: true,
      value: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.testList(this.props.id);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, disable, data } = this.props;
    const { open } = this.state;
    return (
      <div>
        <IconButton
          size="small"
          className={classes.eyes}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          {this.props.icon}
        </IconButton>

        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            {data.tieu_de}
            <Divider />
          </DialogTitle>

          <DialogContent className={classes.formsize}>
            <Grid container>
              <Grid item xs={4}>
                <Paper
                  square
                  className={classes.info}
                  elevation={3}
                  style={{ marginRight: "50px", padding: "5px" }}
                >
                  Người tạo: {data.nguoi_tao.ho} {data.nguoi_tao.ten}
                  <br />
                  Cập nhật: {data.updatedAt}
                  <br />
                  Ngày tạo: {data.ngay_tao}
                </Paper>
                <Paper 
                  square
                  className={classes.info}
                  elevation={3}
                  style={{ marginRight: "50px", padding: "5px" }}
                >
                  Ngày Thi: {data.ngay_thi}
                  <br />
                  Thời gian thi: {data.thoi_gian_thi}
                  
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <TabTest data={data} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ClassRoomDetail);
