import React, { useEffect, useState,useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchButton from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import AddTopic from "./AddTopic";
import Pagination from "@material-ui/lab/Pagination";

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
  pagination: {
    marginRight: "70px",
  },
}));

const topicTitle = ["Tên chủ đề", "Mô tả", "Người tạo", ""];

export default function Threadlist(props) {
  const classes = useStyles();
  const { title } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const token = Cookies.get("token");
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [getListTopic, setListTopic] = useState([]);
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/category/list?page=${pageIndex}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setPage(res.data.pages);
        const { data } = res.data;
        setListTopic(data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageIndex]);
  const handleChangePage = (e, value) => {
    setPageIndex(value);
  };

  const [param, setParam] = useState("");
  const typingTimeoutRef = useRef(null);
  const handleSearch = (e) => {
    const value = e.target.value;
    setParam(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const params = {
        param: value,
      };
      const url =`https://navilearn.herokuapp.com/admin/category/list?search=${params.param}`
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res.data;
         setListTopic(data)
         setPage(res.data.pages)
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }, 300);
  };

  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> {title} </div>

        <form>
          <SearchButton onChange={handleSearch}/>

          <AddTopic token={token} />

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
                      <TableCell align="center">
                        {value.nguoi_tao_id.ten}
                      </TableCell>
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

        <Pagination
          className={classes.pagination}
          count={page}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage}
          style={{ float: "right" }}
        />
      </div>
    </div>
  );
}
