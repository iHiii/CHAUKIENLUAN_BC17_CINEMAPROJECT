import { Grid, List, ListItemButton, Typography } from "@mui/material";
import { FilmsByGroupDTO } from "../../../../DTO/Home"
import FilmOfCenima from "../FilmOfCinema";

interface IFilmsOfCenima {
    listFilm: FilmsByGroupDTO[]
}

const FilmsOfCenima: React.FC<IFilmsOfCenima> = (props) =>{
    const listFilm = props.listFilm;
    return (
        <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 400,
              border: '1px solid #e0e0e0',
              padding: 0
            }}
          >
            {listFilm && listFilm.length
        ? listFilm.map((film: FilmsByGroupDTO) => (
          <ListItemButton alignItems="flex-start" key={film.maPhim} sx={{height: 'auto', borderBottom: '1px solid #e0e0e0', padding: '5px !important'}}>
              <Grid container>
                <Grid item xs={1}>
                  <img src={film.hinhAnh} alt={film.tenPhim} width={65}></img>
                </Grid>
                <Grid item xs={11}>
                    <FilmOfCenima film={film}></FilmOfCenima>
                </Grid>
              </Grid>
              
            </ListItemButton>
          ))
        : null}
          </List>
        )
}

export default FilmsOfCenima