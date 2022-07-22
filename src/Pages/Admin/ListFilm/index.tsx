import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ListFilm } from "../../../DTO/Admin";
import { deleteFilm, getListFilm } from "../../../Model/Api/Admin";
import AppURL from "../../../Router/appURL";
import ListFilmTable from "./ListFilmTable";

const ListFilmAdmin = () => {
  const history = useHistory();

  const [dataTable, setDataTable] = useState<ListFilm[]>();
  const [searchInput, setSearchInput] = useState<string>("");

  const fechDataFilms = async (tenphim?: string) => {
    try {
      const response = await getListFilm(tenphim);
      if (response?.statusCode == 200) {
        setDataTable(response.content);
      }
    } catch (error) {}
  };

  const goToPage = () => {
    history.push(AppURL.addNewFilm);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      fechDataFilms(searchInput);
    }
  };

  const searchFilm = () => {
    fechDataFilms(searchInput);
  };

  useEffect(() => {
    fechDataFilms();
  }, []);

  injectStyle();
  const pushNoti = (success: boolean = true, noti?: string) => {
    success ? toast.success("Xoá phim thành công") : toast.error(noti);
  };

  const onDeleteFilm = async (maPhim: number) => {
    try {
      const response = await deleteFilm(maPhim);
      if (response?.statusCode == 200) {
        pushNoti();
        fechDataFilms();
      } else {
        pushNoti(false, response?.content);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h2 style={{ margin: "0" }}>Quản lý phim</h2>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={goToPage}>
          Thêm phim
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Input
          id="search-film"
          placeholder="Tìm kiếm tên phim"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          fullWidth
          onKeyDown={keyDownHandler}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={searchFilm}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Grid>
      <Grid item xs={12}>
        <ListFilmTable dataTable={dataTable} deleteFilm={onDeleteFilm} />
      </Grid>
    </Grid>
  );
};

export default ListFilmAdmin;
