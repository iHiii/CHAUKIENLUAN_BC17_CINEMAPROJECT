import { Grid } from "@mui/material";
import React from "react";
import Header from "../Component/Header";
import { styles } from "./styles";

const GuestLayout: React.FC<any> = (props) => {
  const classes = styles();
  return (
    <Grid container className={classes.customStyles}>
      <Grid item xs={12} style={{ marginBottom: "15px" }}>
        <Header></Header>
      </Grid>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default GuestLayout;
