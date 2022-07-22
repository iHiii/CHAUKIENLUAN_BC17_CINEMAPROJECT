import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../../Component/loading";
import {
  CinemaDTO,
  FilmsByGroupDTO,
  GroupCinemaDTO,
  InfoCinemaDTO,
} from "../../../DTO/Home";
import { getInfoCinemasByCode } from "../../../Model/Api/Home";
import FilmsOfCenima from "./FilmsOfCinema";
import { cinemaStyles } from "./styles";

interface ICinema {
  cinemas: CinemaDTO[];
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ height: "400px !important" }}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function a11yProps2(index: number) {
  return {
    id: `vertical-tab2-${index}`,
    "aria-controls": `vertical-tabpanel2-${index}`,
  };
}

const Cinema: React.FC<ICinema> = (props) => {
  const cinemasProps = props.cinemas;
  const classes = cinemaStyles();
  const [groupCinema, setGroupCinema] = useState<GroupCinemaDTO[]>([]);
  const [listFilm, setListFilm] = useState<FilmsByGroupDTO[]>([]);
  const [loadingCinema, setLoadingCenima] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [valueTab2, setValueTab2] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab2(0);
    setValue(newValue);
  };

  const handleChangeValueTab2 = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    
    setListFilm(groupCinema[newValue].danhSachPhim);
    setValueTab2(newValue);
  };

  useEffect(() => {
    setLoadingCenima(true);
    const fetchDataCinema = async () => {

      try {
        const cinemaCode = cinemasProps[value].maHeThongRap;
        const response = await getInfoCinemasByCode(cinemaCode);
        if (response?.statusCode == 200) {
          const groupCinema = response.content[0].lstCumRap;
          setGroupCinema(groupCinema);
          setListFilm(groupCinema[0].danhSachPhim);
          setLoadingCenima(false);
        }
      } catch (error) {
        setLoadingCenima(false);
      }
    };
    fetchDataCinema();
  }, [value]);
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 400,
      }}
    >
      <Loading open={loadingCinema}></Loading>
      <Grid container>
        <Grid item xs={1}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ border: 1, borderColor: "divider", height: 400 }}
            scrollButtons={false}
          >
            {cinemasProps && cinemasProps.length
              ? cinemasProps.map((item: CinemaDTO, index: number) => (
                  <Tab
                    key={item.maHeThongRap}
                    sx={{
                      height: "100px!important",
                    }}
                    label={
                      <Tooltip title={item.tenHeThongRap}>
                        <IconButton component={"span"}>
                          <img
                            src={item.logo}
                            alt={item.biDanh}
                            width={30}
                            height={30}
                          ></img>
                        </IconButton>
                      </Tooltip>
                    }
                    {...a11yProps(index)}
                  />
                ))
              : null}
          </Tabs>
        </Grid>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={4}>
              <TabPanel value={value} index={value}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={valueTab2}
                  onChange={handleChangeValueTab2}
                  aria-label="Vertical tabs"
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    height: "400px",
                    width: "100%"
                  }}
                  scrollButtons={false}
                >
                  {groupCinema && groupCinema.length
                    ? groupCinema.map(
                        (group: GroupCinemaDTO, indexGroup: number) => (
                          <Tab
                            key={group.maCumRap}
                            sx={{
                              height: "100px!important",
                            }}
                            label={
                              <Grid
                                container
                                justifyContent={"space-between"}
                                spacing={2}
                              >
                                <Grid item xs={2}>
                                  <img src={group.hinhAnh} height={60}></img>
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
                                  </Grid>
                                </Grid>
                              </Grid>
                            }
                            {...a11yProps2(indexGroup)}
                          />
                        )
                      )
                    : null}
                </Tabs>
              </TabPanel>
            </Grid>
            <Grid item xs={8}>
              <FilmsOfCenima listFilm={listFilm}></FilmsOfCenima>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cinema;
