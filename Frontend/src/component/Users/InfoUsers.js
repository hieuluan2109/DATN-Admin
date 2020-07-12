import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({

    formInfo: {
        marginTop: '50px',
        marginRight: '6%',

        height: '100vh',
        background: 'white',
        borderRadius: 10
    },
    titleformInfo: {
        position: 'absolute',
        marginTop: '65px',
        marginLeft: 30,
        fontSize: 17,
        paddingBottom: 30
    },
    formControl: {
        paddingTop: '30px',
        paddingLeft: '30px',
        maxwidth: '600px'
    },
    btnThem: {
        position: 'absolute',
        background: '#3f51b5',
        borderRadius: '20px',
        marginTop: '30px',
        left: '80%'
    },
    table: {
        marginLeft: 25,
        minWidth: 600,
        maxwidth: 1200,
        width: 1100,
        marginTop: 70,

    },
    eyes: {
        marginRight: 20,
        color: 'bold'
    }
}));
function createData(name, dateOfBirth, MSSV, phoneNumber, Gender) {
    return { name, dateOfBirth, MSSV, phoneNumber, Gender };
}
const rows = [
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),
    createData('Nguyễn Văn A ', '1/1/1999', '0302030212', '0342223342', 'Nam'),

];
export default function InfoUsers() {
    const classes = useStyles();
    return (
        <div className="row">
            <div className="col span-1-of-12">
            </div>
            <div className="col span-11-of-12">
                <div className={classes.titleformInfo}> Danh sách người dùng</div>
                <form>
                    <div className={classes.formInfo}>
                        <TableContainer >
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Số thứ tự</TableCell>
                                        <TableCell align="center">Tên</TableCell>
                                        <TableCell align="center">Ngày sinh</TableCell>
                                        <TableCell align="center">MSSV</TableCell>
                                        <TableCell align="center">Số điện thoại</TableCell>
                                        <TableCell align="center">Giới tính</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (

                                        <TableRow key={index + 1}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">
                                                {row.name}
                                            </TableCell>

                                            <TableCell align="center">{row.dateOfBirth}</TableCell>
                                            <TableCell align="center">{row.MSSV}</TableCell>
                                            <TableCell align="center">{row.phoneNumber}</TableCell>
                                            <TableCell align="center">{row.Gender}</TableCell>
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
