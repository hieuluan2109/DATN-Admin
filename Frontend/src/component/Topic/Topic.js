import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import SearchButton from "../Search";
import DialogThem from "../DialogThem";
import axios from "axios";
import Cookies from "js-cookie";
import AddQuestion from "../Question/AddQuestion";
import AddTopic from './AddTopic';

const useStyles = makeStyles((theme) => ({
  formInfo: {
    marginTop: "50px",
    marginRight: "6%",

    height: "100vh",
    background: "white",
    borderRadius: 10,
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "70px",
    marginLeft: 30,
    fontSize: 20,
    paddingBottom: 30,
    fontWeight: 600,
  },
  formControl: {
    paddingTop: "30px",
    paddingLeft: "30px",
    maxwidth: "600px",
  },
  table: {
    minWidth: 600,
    maxwidth: 1200,
    width: 1161,
    marginTop: 70,
  },
  eyes: {
    marginRight: 20,
    color: "bold",
  },
  containerNext: {
    position: "absolute",
    left: "90%",
    top: "87%",
  },
  containerBack: {
    position: "absolute",
    left: "79%",
    top: "87%",
  },
  next: {
    fontSize: "1rem",
  },
  back: {
    fontSize: "1rem",
  },
  buttonPageNumber: {
    display: "inline",
    padding: ".2rem .41rem",
    borderRadius: "30px!important",
    backgroundColor: "#5089de",
    "&": {
      color: "red",
      margin: "0 3px",
      color: "#fff",
      borderColor: "#5089de",
    },
  },

  page: {
    position: "absolute",
    left: "80%",
    top: "85%",
  },
}));


const topicTitle = [ "Tên chủ đề", "Mô tả", "Người tạo", ""];

export default function Threadlist(props) {
  const classes = useStyles();
  const { title, } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const token = Cookies.get("token");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [getListTopic, setListTopic] = useState([]);

  useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/category/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
        setListTopic(data);
    
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, []);

  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> {title} </div>

        <form>
          <SearchButton />
        


          <AddTopic token={token}/>

          <div className={classes.formInfo}>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#3f8cb5", height: 50 }}>
                    {topicTitle.map((valueTitle, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        style={{ color: "#ffffff" }}
                      >
                        {valueTitle}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getListTopic.map((value, index) => (
                    <TableRow key={index + 1} hover>
                      <TableCell align="center">{value.tieu_de}</TableCell>
                      <TableCell align="center">{value.mo_ta}</TableCell>
                      <TableCell align="center">{value.nguoi_tao_id.ten}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" className={classes.eyes}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton size="small" className={classes.eyes}>
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

           
          </div>
        </form>
      </div>
    </div>
  );
}
