import {
  Alert,
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Loading from "../../Component/loading";
import { CinemaDTO, FilmDTO } from "../../DTO/Home";
import { getDate } from "../../FunctionCommon";
import { getCinemas, getFilms } from "../../Model/Api/Home";
import Cinema from "./Cinema";
import Films from "./Films";
import Slide from "./Slider/slider";
import { homeStyles } from "./styles";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography  component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Home = () => {
  const [films, setFilms] = useState<FilmDTO[]>([]);
  const [cinemas, setCinemas] = useState<CinemaDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = homeStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  

  const convertDataResponse = (films: FilmDTO[]) => {
    const result: FilmDTO[] = [];
    films.map((item) => {
      result.push({
        ...item,
        ngayKhoiChieu: getDate(new Date(item.ngayKhoiChieu)),
      });
    });
    return result;
  };
  // lấy danh sách phim
  useEffect(() => {
    const fechDataFilms = async () => {
      setLoading(true);
      try {
        const response = await getFilms();
        if (response?.statusCode == 200) {
          const data = convertDataResponse(response.content);
          setFilms(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        return (
          <Alert severity="error" color="info">
            Có lỗi xảy ra !!
          </Alert>
        );
      }
    };
    fechDataFilms();
  }, []);

  // lấy danh sách rạp chiếu phim
  useEffect(() => {
    const fetchCinema = async () => {
      setLoading(true);
      try {
        const response = await getCinemas();
        if (response?.statusCode == 200) {
          setCinemas(response.content);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        return (
          <Alert severity="error" color="info">
            Có lỗi xảy ra !!
          </Alert>
        );
      }
    };
    fetchCinema();
  }, []);

  return (
    <Grid container>
      <Loading open={loading}></Loading>
      <Grid item xs={12}>
        <Slide></Slide>
      </Grid>
      <Grid item xs={12} className={classes.customPanel}>
        <Box>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Danh sách phim" {...a11yProps(0)} />
              <Tab label="Danh sách hệ thống rạp" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Films films={films}></Films>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Cinema cinemas={cinemas}/>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
