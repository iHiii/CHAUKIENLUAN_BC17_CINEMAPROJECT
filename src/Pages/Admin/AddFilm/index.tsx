import {
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddFilmForm from "./AddFilmForm";

const AddFilm = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h2 style={{ margin: "0" }}>Thêm mới phim</h2>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <AddFilmForm />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default AddFilm;
