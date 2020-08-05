import React, { useEffect, useState, useRef } from "react";
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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import SearchButton from "../Search";
import SelectSort from "../SelectSort";
import DialogThem from "../DialogThem";
import axios from "axios";
import Cookies from "js-cookie";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetQuestionTN from "./QuestionTN";
import GetQuestionTL from "./QuestionTL";
import AddQuestions from "./AddQuestion";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  formInfo: {
    marginTop: "50px",
    marginRight: "6%",

    height: "120vh",
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
    // marginLeft: 25,
    minWidth: 600,
    maxwidth: 1200,
    width: 1161,
    marginTop: 70,
  },
  eyes: {
    marginRight: 20,
    color: "bold",
  },
  // tableRow:{
  //     '&:nth-of-type(odd)': {
  //         backgroundColor: theme.palette.action.focus,
  //       },
  // }
  containerNext: {
    position: "absolute",
    left: "90%",
    top: "86.5%",
  },
  containerBack: {
    position: "absolute",
    left: "79%",
    top: "86.5%",
  },
  next: {
    fontSize: "1rem",
  },
  back: {
    fontSize: "1rem",
  },
  buttonPageNumber: {
    position: "relative",
    display: "inline",
    padding: ".2rem .41rem",
    borderRadius: "30px!important",
    backgroundColor: "#5089de",
    // background:'red',
    "&": {
      color: "red",
      margin: "0 3px",
      color: "#fff",
      borderColor: "#5089de",
    },

    // '&:focus':{
    //     backgroundColor:'red'
    // }
    // },'&:hover':{
    //     backgroundColor:'green'
    // }
  },

  page: {
    position: "absolute",
    left: "80%",
    top: "85%",
  },
  formControl: {
    position: "absolute",
    right: "15%",
    minWidth: 120,
  },
  pagination: {
    marginRight: "70px",
  },
}));

export default function QuestionAllList(props) {
  const classes = useStyles();
  const title = ["Số thứ tự", "Nội dung", "Chủ đề", "Điểm"];
  const title1 = [
    "Số thứ tự",
    "Nội dung",
    "Chủ đề",
    "Điểm",
    "Ghi chú",
    ".........",
  ];
  const token = Cookies.get("token");
  //   const {TITLE,STT,CAUHOI,DAPANA,DAPANB,DAPANC,DAPAND,DAPANDUNG,DIEM,NGUOITAO,NGAYTAO}=props

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [valueQuestion, setValueQuestion] = useState(true);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleChange = (event) => {
    setValueQuestion((event.target.name = event.target.value));
  };

  const [getListTN, setGetListTN] = useState([]);
  const [getListTL, setGetListTL] = useState([]);
  const [pageTN, setPageTN] = useState(1);
  const [pageTL, setPageTL] = useState(1);
  const [pageNumberTN, setPageNumberTN] = useState(1);
  const [pageNumberTL, setPageNumberTL] = useState(1);
  const url = [
    `https://navilearn.herokuapp.com/admin/question/list/?loai=choice&page=${pageNumberTN}`,
    `https://navilearn.herokuapp.com/admin/question/list/?loai=assay&page=${pageNumberTL}`,
  ];
  // const token=Cookies.get('token')
  useEffect(() => {
    axios
      .get(url[0], { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // const {data}=res.data
        setGetListTN(res.data.data);
        setPageTN(res.data.pages);
        console.log("TN", res.data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageNumberTN]);
  useEffect(() => {
    axios
      .get(url[1], { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // const {data}=res.data
        setGetListTL(res.data.data);
        setPageTL(res.data.pages);
        console.log("TL", res.data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageNumberTL]);

  const handleChangePage1 = (event, value) => {
    setPageNumberTN(value);
  };
  const handleChangePage2 = (event, value) => {
    setPageNumberTL(value);
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
      const url =
        valueQuestion == true
          ? `https://navilearn.herokuapp.com/admin/question/list/?loai=choice&search=${params.param}`
          : `https://navilearn.herokuapp.com/admin/question/list/?loai=assay&search=${params.param}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res.data;
          console.log('pppp',res.data)
          valueQuestion == true ? setGetListTN(data) : setGetListTL(data);
          // valueQuestion==true?setPageNumberTN(res.data.pages):setGetListTL(res.data.pages)
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
        <div className={classes.titleformInfo}> Danh sách câu hỏi </div>

        <form>
          <SearchButton onChange={handleSearch} />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Loại</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueQuestion}
              onChange={handleChange}
            >
              <MenuItem value={true}>Trắc nghiệm</MenuItem>
              <MenuItem value={false}>Tự luận</MenuItem>
            </Select>
          </FormControl>
          <AddQuestions token={token} />

          <div className={classes.formInfo}>
            <TableContainer>
              {valueQuestion == true ? (
                <GetQuestionTN getList={getListTN} />
              ) : (
                <GetQuestionTL getList={getListTL} />
              )}
            </TableContainer>
          </div>
        </form>
        <Pagination
          className={classes.pagination}
          count={pageTN}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage1}
          style={{
            display: valueQuestion == true ? "block" : "none",
            float: "right",
          }}
        />
        <Pagination
          className={classes.pagination}
          count={pageTL}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage2}
          style={{
            display: valueQuestion == true ? "none" : "block",
            float: "right",
          }}
        />
      </div>
    </div>
  );
}
