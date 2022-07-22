import { Grid } from "@mui/material";
import AddFilmForm from "./EditFilmForm";

const EditFilm = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h2 style={{ margin: "0" }}>Chỉnh sửa phim</h2>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <AddFilmForm />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default EditFilm;
