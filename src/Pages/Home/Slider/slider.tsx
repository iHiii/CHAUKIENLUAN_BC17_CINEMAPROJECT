import { Card, CardContent, CardMedia } from "@mui/material"
import { height } from "@mui/system";

const Slide: React.FC<any> = (props) => {
  const linkImage: string =
    "http://movieapi.cyberlearn.vn/hinhanh/lat-mat-48h.png";
  return (
    <img
      alt="slide"
      src={linkImage}
      style={{ width: "100%", height: "400px" }}
    ></img>
  );
};

export default Slide