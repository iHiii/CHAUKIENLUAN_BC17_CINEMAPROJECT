import { Button, Grid, Rating, Typography } from "@mui/material";
import { NavLink, useLocation, useParams } from "react-router-dom";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { useEffect, useState } from "react";
import { getDetailByCode } from "../../Model/Api/Details";
import { DetailFilmDTO } from "../../DTO/Details";
import { getDate } from "../../FunctionCommon";
import CinemaFilm from "./CenimaFilm";
import { CinemaDTO } from "../../DTO/Home";
import { getCinemas } from "../../Model/Api/Home";
import Loading from "../../Component/loading";
import AppURL from "../../Router/appURL";

const DetailFilm = () => {
  const param = useParams<{ id: string }>();
  const idFilm: string = param.id;
  const [detailFilm, setDetailFilm] = useState<DetailFilmDTO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showErr, setShowErr] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchDetailFilm = async () => {
      const response = await getDetailByCode(idFilm);
      if (response?.statusCode == 200) {
        setDetailFilm(response.content);
        setShowErr(false);
        setLoading(false);
      } else {
        setLoading(false);
        setShowErr(true);
      }
    };
    fetchDetailFilm();
  }, [idFilm]);

  return (
    <>
    {detailFilm ? (
        <Grid container>
        <Loading open={loading}></Loading>
      <Grid
        item
        xs={12}
        sx={{
          minHeight: "50vh",
        }}
      >
        <Grid container justifyContent={"flex-start"}>
          <Grid item xs={4}>
            <img
              src={detailFilm?.hinhAnh}
              alt={detailFilm?.biDanh}
              width={300}
            ></img>
          </Grid>
          <Grid item xs={8}>
            <Grid container justifyContent={"start"} spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" component={"span"} align="left">
                  {detailFilm?.tenPhim}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component={"p"} align="left">
                  {detailFilm?.moTa}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <span>Tình trạng: </span>
                  </Grid>
                  <Grid item xs={10}>
                    {detailFilm?.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                  </Grid>
                </Grid>
                {detailFilm?.dangChieu == false &&
                detailFilm?.sapChieu == true ? (
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <span>Ngày khởi chiếu: </span>
                    </Grid>
                    <Grid item xs={10}>
                      {detailFilm?.ngayKhoiChieu
                        ? getDate(new Date(detailFilm?.ngayKhoiChieu))
                        : null}
                    </Grid>
                  </Grid>
                ) : null}

                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <span>Đánh giá</span>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid item>
                      <Rating
                        name="customized-10"
                        max={10}
                        value={detailFilm?.danhGia}
                        readOnly
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="green"
                  size="large"
                  sx={{ marginRight: 10 }}
                >
                  XEM TRAILER
                </Button>
                <NavLink
                  to={AppURL.ticketroom.replace(
                    ":id",
                    idFilm.toString()
                  )}
                  style={{textDecoration: "none"}}
                >
                <Button
                  variant="contained"
                  color="green"
                  size="large"
                  startIcon={<LocalActivityIcon></LocalActivityIcon>}
                >
                  MUA VÉ NGAY
                </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CinemaFilm cinemas={detailFilm?.heThongRapChieu}></CinemaFilm>
      </Grid>
    </Grid>
    ) : null}
    </>
    
  );
};

export default DetailFilm;
