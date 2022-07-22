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
import { GroupSheduleDTO, SheduleSystemDTO } from "../../../DTO/Details";
import {
  CinemaDTO,
  GroupCinemaDTO,
} from "../../../DTO/Home";
import { getInfoCinemasByCode } from "../../../Model/Api/Home";
import GroupFilm from "../GroupFilm";

interface ICinema {
  cinemas?: SheduleSystemDTO[];
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

const CinemaFilm: React.FC<ICinema> = (props) => {
  const cinemasProps = props.cinemas;
  const [groupCinema, setGroupCinema] = useState<GroupSheduleDTO[]>([]);
  const [loadingCinema, setLoadingCenima] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if(cinemasProps && cinemasProps.length){
        setGroupCinema(cinemasProps[value].cumRapChieu);
    } 
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
              ? cinemasProps.map((item: SheduleSystemDTO, index: number) => (
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
                            alt={item.maHeThongRap}
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
        <Grid item xs={10}>
          <TabPanel value={value} index={value}>
            <GroupFilm groupCinema={groupCinema}></GroupFilm>
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CinemaFilm;
