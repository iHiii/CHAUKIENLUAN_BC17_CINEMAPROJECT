import { makeStyles, Theme } from "@material-ui/core";

export const filmStyles = makeStyles((theme: Theme) => ({
  customLink: {
    "& a:link": {
      textDecoration: "none",
      color: 'none'
    },

    "& a:visited": {
      textDecoration: "none",
      color: 'none'
    },

    "& a:hover": {
      textDecoration: "none",
      color: 'none'
    },

    "& a:active": {
      textDecoration: "none",
      color: 'none'
    },
  },
}));
