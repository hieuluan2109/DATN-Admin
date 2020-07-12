import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 300,

        marginTop: '33%',
        marginLeft: '5%',
        background: '#f5f6f8'
    },
    avatar: {
        position: 'absolute',
        marginTop: '40px',
        marginLeft: '2%',
        width: 50,
        height: 50
    },
    info: {
        position: 'absolute',
        marginTop: '45px',
        marginLeft: '7%',

    },
    name: {
        position: 'absolute',
        marginTop: '65px',
        marginLeft: '7%',

    },
    formInfo: {
        marginTop: '107px',
        marginRight: '6%',
        marginLeft: '6%',
        height: '70vh',
        background: 'white'
    },
    titleformInfo: {
        position: 'absolute',
        marginTop: '65px',
        marginLeft: 60,
        fontSize: 17
    },
    formControl: {
        paddingTop: '30px',
        paddingLeft: '30px',
        maxwidth: '600px'
    },
    titleFormControl: {
        width: '150px',
        float: 'left',
        marginTop: '10px'

    },
    contentFormControl: {
        width: '450px',
        borderRadius: '5px',
        height: '30px',
        paddingLeft: '20px'
    },
    selectDate: {
        margin: theme.spacing(0.5),
        minWidth: 120,
        marginTop: '-10px'
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    btnXacnhan: {
        borderRadius: '5px',
        background: 'rgb(253, 216, 53)',
        width: '120px',
        height: '40px',
        marginLeft: '125px',
        cursor: 'pointer'
    }
}));
export default function MenuProfile() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [state, setState] = React.useState({
        date: '',
        month: '',
        year: '',
        name: "Nguyễn Hiếu Luân",
        phoneNumber: "0345553332",
        email: 'luanmap102@gmail.com'
    });

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    

    return (
        <div className="row">

            <div className="col span-1-of-4">
                <Avatar className={classes.avatar} />
                <div className={classes.info}>Tài khoản của</div>
                <div className={classes.name}>Luân mập địt</div>
                <div className={classes.root}>


                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thông tin tài khoản" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thông báo của tôi" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary="Đổi mật khẩu" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItem>


                </div>
            </div>
            <div className="col span-3-of-4">

                <div className={classes.titleformInfo}> Thông tin tài khoản</div>
                <form>
                    <div className={classes.formInfo}>
                        <div className={classes.formControl}>
                            <label className={classes.titleFormControl} >Họ tên</label>
                            <input className={classes.contentFormControl} name="name" type="text" value={state.name} onChange={handleChange} />
                        </div>
                        <div className={classes.formControl}>
                            <label className={classes.titleFormControl}>Số điện thoại</label>
                            <input className={classes.contentFormControl} type="text" value={state.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className={classes.formControl}>
                            <label className={classes.titleFormControl}>Email</label>
                            <input className={classes.contentFormControl} type="text" value={state.email} disabled={true} />
                        </div>
                        <div className={classes.formControl}>
                            <label className={classes.titleFormControl} style={{ marginTop: '0px' }} >Giới tính</label>
                            <input type='radio' name="gender" defaultChecked  />Nam
                        <input type='radio' name="gender" />Nữ
                    </div>
                        <div className={classes.formControl}>
                            <label className={classes.titleFormControl} style={{ marginTop: '15px' }}>Ngày sinh</label>
                            {/* <input className={classes.contentFormControl} type="text" value="Nguyễn Hiếu Luân" /> */}
                            <FormControl variant="outlined" className={classes.selectDate}>
                                <InputLabel htmlFor="outlined-age-native-simple">Ngày</InputLabel>
                                <Select
                                    native
                                    value={state.age}
                                    onChange={handleChange}
                                    label="Ngày"
                                    inputProps={{
                                        name: 'date',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                    <option value={16}>16</option>
                                    <option value={17}>17</option>
                                    <option value={18}>18</option>
                                    <option value={19}>19</option>
                                    <option value={20}>20</option>
                                    <option value={21}>21</option>
                                    <option value={22}>22</option>
                                    <option value={23}>23</option>
                                    <option value={24}>24</option>
                                    <option value={25}>25</option>
                                    <option value={26}>26</option>
                                    <option value={27}>27</option>
                                    <option value={28}>28</option>
                                    <option value={29}>29</option>
                                    <option value={30}>30</option>
                                    <option value={31}>31</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.selectDate}>
                                <InputLabel htmlFor="outlined-age-native-simple">Tháng</InputLabel>
                                <Select
                                    native
                                    value={state.month}
                                    onChange={handleChange}
                                    label="Tháng"
                                    inputProps={{
                                        name: 'month',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.selectDate}>
                                <InputLabel htmlFor="outlined-age-native-simple">Năm</InputLabel>
                                <Select
                                    native
                                    value={state.year}
                                    onChange={handleChange}
                                    label="Năm"
                                    inputProps={{
                                        name: 'year',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={2010}>2019</option>
                                    <option value={2020}>2020</option>
                                </Select>
                            </FormControl>

                            <div className={classes.formControl}>

                                <input className={classes.btnXacnhan} type="button" value="Cập Nhật" />
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </div>

    );
}
