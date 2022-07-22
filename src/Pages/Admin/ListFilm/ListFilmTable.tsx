import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import { ListFilm } from "../../../DTO/Admin";
import { useHistory } from "react-router-dom";
import AppURL from "../../../Router/appURL";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type PropType = {
  dataTable?: ListFilm[];
  deleteFilm(maPhim: number): void;
};

const ListFilmTable: React.FC<PropType> = ({ dataTable, deleteFilm }) => {
  const history = useHistory();
  const changeToPage = (edit: boolean, maPhim: number) => {
    edit
      ? history.push(AppURL.editFilm.replace(":idFilm", maPhim.toString()))
      : history.push(AppURL.showtime.replace(":idFilm", maPhim.toString()));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="List film table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Mã phim</StyledTableCell>
            <StyledTableCell align="center">Poster</StyledTableCell>
            <StyledTableCell align="center">Tên phim</StyledTableCell>
            <StyledTableCell align="center">Mô tả</StyledTableCell>
            <StyledTableCell align="center" width={200}>
              Hành động
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable &&
            dataTable.map((row) => (
              <StyledTableRow key={row.maPhim}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.maPhim}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <img src={row.hinhAnh} alt={row.tenPhim} width={100} />
                </StyledTableCell>
                <StyledTableCell align="center">{row.tenPhim}</StyledTableCell>
                <StyledTableCell align="center">{row.moTa}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={() => changeToPage(true, row.maPhim)}>
                    <BorderColorOutlinedIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => changeToPage(false, row.maPhim)}>
                    <FolderOpenIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteFilm(row.maPhim)}>
                    <DeleteOutlineOutlinedIcon color="error" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListFilmTable;
