import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItemButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GroupSheduleDTO, SheduleDTO } from "../../../DTO/Details";
import { GroupCinemaDTO } from "../../../DTO/Home";
import { getTime } from "../../../FunctionCommon";
import AppURL from "../../../Router/appURL";
import { groupFilmStyles } from "./groupFilmStyles";

interface IFilmsOfCenima {
  groupCinema: GroupSheduleDTO[];
}

const buttons = [
  <Button key="button1">
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" component={"span"}>
          Thứ 2
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography> 15</Typography>
      </Grid>
    </Grid>
  </Button>,
  <Button key="button2">
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" component={"span"}>
          Thứ 3
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>16</Typography>
      </Grid>
    </Grid>
  </Button>,
  <Button key="button3">
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" component={"span"}>
          Thứ 4
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>17</Typography>
      </Grid>
    </Grid>
  </Button>,
  <Button key="button4">
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" component={"span"}>
          Thứ 5
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>18</Typography>
      </Grid>
    </Grid>
  </Button>,
  <Button key="button5">
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" component={"span"}>
          Thứ sáu
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>19</Typography>
      </Grid>
    </Grid>
  </Button>,
  <Button key="button6">
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" component={"span"}>
          Thứ bảy
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>20</Typography>
      </Grid>
    </Grid>
  </Button>,
  <Button key="button7">
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" component={"span"}>
          Chủ nhật
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>21</Typography>
      </Grid>
    </Grid>
  </Button>,
];

const GroupFilm: React.FC<IFilmsOfCenima> = (props) => {
  const groupCinema = props.groupCinema;
  const [valueShedule, setValueShedule] = useState(0);
  const classes = groupFilmStyles();
  // bắt sự kiện khi một rạp được click
  const handleChangeShedule = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueShedule(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          size="large"
          aria-label="large button group"
          variant="contained"
          color="secondary"
          fullWidth
        >
          {buttons}
        </ButtonGroup>
      </Box>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          border: "1px solid #e0e0e0",
          padding: 0,
        }}
      >
        {groupCinema && groupCinema.length
          ? groupCinema.map((group: GroupSheduleDTO) => (
              <ListItemButton
                alignItems="flex-start"
                key={group.maCumRap}
                sx={{
                  height: "auto",
                  borderBottom: "1px solid #e0e0e0",
                  padding: "5px !important",
                }}
              >
                <Grid container justifyContent={"space-between"} spacing={2}>
                  <Grid item xs={2}>
                    <img src={group.hinhAnh} height={100}></img>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          component={"span"}
                          align="left"
                        >
                          {group.tenCumRap}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="body2"
                          component={"span"}
                          align="left"
                          style={{
                            textTransform: "lowercase",
                            color: "grey",
                          }}
                        >
                          {group.diaChi}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Tabs
                          value={valueShedule}
                          onChange={handleChangeShedule}
                          variant="scrollable"
                          textColor="secondary"
                          indicatorColor={"secondary"}
                          scrollButtons={false}
                        >
                          {group.lichChieuPhim && group.lichChieuPhim.length
                            ? group.lichChieuPhim.map(
                                (sheduleFilm: SheduleDTO, index: number) => (
                                  <Tab
                                    key={
                                      `rap-phim-${index}` + sheduleFilm.maRap
                                    }
                                    label={sheduleFilm.tenRap}
                                  ></Tab>
                                )
                              )
                            : null}
                        </Tabs>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} className={classes.customLink}>
                            {group.lichChieuPhim && group.lichChieuPhim.length
                              ? group.lichChieuPhim.map((item, index) => (
                                  <Link
                                  to={`${AppURL.ticketroom}`.replace(':id', item.maLichChieu+'')}
                                    key={
                                      item.maRap +
                                      item.tenRap +
                                      item.maLichChieu
                                    }
                                  >
                                    <span
                                      style={{
                                        color: "green",
                                        marginRight: "22px",
                                        marginLeft: "25px",
                                        fontSize: "25px",
                                        display:
                                          group.lichChieuPhim[index].maRap ==
                                          item.maRap
                                            ? ""
                                            : "none",
                                      }}
                                    >
                                      {getTime(item.ngayChieuGioChieu)}
                                    </span>
                                  </Link>
                                ))
                              : null}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItemButton>
            ))
          : null}
      </List>
    </>
  );
};

export default GroupFilm;
