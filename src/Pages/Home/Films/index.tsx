import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { FilmDTO } from "../../../DTO/Home";
import logoHot from "../../../Asset/logo/imager_36697.jpg";
import AppURL from "../../../Router/appURL";
import { Link, NavLink } from "react-router-dom";
import { filmStyles } from "./filmStyle";
import { height } from "@mui/system";

interface IFilms {
  films: FilmDTO[];
}

const Films: React.FC<IFilms> = (props) => {
  const listFilm: FilmDTO[] = props.films;
  const classes = filmStyles();
  return (
    <Grid
      container
      spacing={2}
      justifyContent="flex-start"
      className={classes.customLink}
    >
      {listFilm && listFilm.length
        ? listFilm.map((item: FilmDTO) => (
            <Grid item key={item.maPhim}>
              <Card sx={{ width: 350 }} key={item.maPhim}>
                <CardMedia
                  component="img"
                  height="400"
                  image={item.hinhAnh}
                  alt={item.biDanh}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    height={70}
                  >
                    {item.tenPhim}
                  </Typography>
                  <Typography variant="body2" component={'span'} color="text.secondary" noWrap>
                    {item.moTa}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={10} justifyItems="flex-start">
                      {item.dangChieu ? "Đang chiếu" : null}
                      {item.sapChieu ? "Sắp chiếu" : null}
                      {item.dangChieu == false && item.sapChieu == false
                        ? "Chưa có thông tin chiếu"
                        : ""}
                    </Grid>
                    {item.hot ? (
                      <Grid item xs={2}>
                        <Grid container justifyContent="end">
                          <img
                            src={logoHot}
                            alt="logo-hot"
                            style={{ height: "20px", width: "20px" }}
                          ></img>
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>

                  <Grid container justifyContent="flex-start">
                    <Grid item style={{ height: "15px !important" }}>
                      {item.sapChieu
                        ? "Ngày khởi chiếu: " + item.ngayKhoiChieu
                        : null}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid container justifyContent="center" spacing={4}>
                    <Grid item>
                      <NavLink
                        to={AppURL.detail.replace(
                          ":id",
                          item.maPhim.toString()
                        )}
                      >
                        <Button variant="contained" color="info" size="small" href="">
                          Xem chi tiết
                        </Button>
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink
                        to={AppURL.ticketroom.replace(
                          ":id",
                          item.maPhim.toString()
                        )}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          Đặt vé
                        </Button>
                      </NavLink>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default Films;
