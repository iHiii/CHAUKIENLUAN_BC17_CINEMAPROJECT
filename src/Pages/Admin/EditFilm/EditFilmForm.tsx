import {
  Button,
  FormControlLabel,
  Grid,
  Rating,
  TextField,
} from "@mui/material";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { injectStyle } from "react-toastify/dist/inject-style";
import BasicDatePicker from "../../../Component/BasicDatePicker";
import Loading from "../../../Component/loading";
import { SwitchCustom } from "../../../Component/SwitchCustom";
import { FilmDetail } from "../../../DTO/Admin";
import { getFilmDetail, updateFilm } from "../../../Model/Api/Admin";

const defaultValues: FilmDetail = {
  maPhim: 0,
  tenPhim: "",
  biDanh: "",
  trailer: "",
  hinhAnh: "",
  moTa: "",
  maNhom: "",
  hot: false,
  dangChieu: false,
  sapChieu: false,
  ngayKhoiChieu: "",
  danhGia: 0,
};
const EditFilmForm = () => {
  const params = useParams<{idFilm: string}>();
  const [formValues, setFormValues] = useState<FilmDetail>(defaultValues);
  const [valueDate, setValueDate] = useState<Date | null>(null);
  const [img, setImg] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const changeRate = (event: React.SyntheticEvent, value: number | null) => {
    setFormValues({
      ...formValues,
      danhGia: value || 0,
    });
  };
  const setSapChieu = () => {
    setFormValues({
      ...formValues,
      sapChieu: !formValues.sapChieu,
    });
  };
  const setDangChieu = () => {
    setFormValues({
      ...formValues,
      dangChieu: !formValues.dangChieu,
    });
  };
  const setHot = () => {
    setFormValues({
      ...formValues,
      hot: !formValues.hot,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const selectFile = (e: any) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      setFileName(file.name);
      setFileUpload(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImg(e?.target?.result?.toString() || "");
      };
    }
  };

  injectStyle();
  const pushNoti = (success: boolean = true, noti?: string) => {
    success ? toast.success("Cập nhật phim thành công") : toast.error(noti);
  };
  const addFilm = async (body: any) => {
    try {
      const response = await updateFilm(body);
      if (response?.statusCode == 200) {
        pushNoti();
      } else {
        pushNoti(false, response?.content);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
    setLoading(false);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    // this function cannot work because API 500
    setLoading(true);
    event.preventDefault();
    let formData = new FormData();
    formData.append("tenPhim", formValues.tenPhim);
    formData.append("moTa", formValues.moTa);
    formData.append("trailer", formValues.trailer);
    formData.append("maNhom", "GP01");
    formData.append("ngayKhoiChieu", moment(valueDate).format("DD/MM/YYYY"));
    formData.append("sapChieu", "" + formValues.sapChieu);
    formData.append("dangChieu", "" + formValues.dangChieu);
    formData.append("hot", "" + formValues.hot);
    formData.append("danhGia", "" + formValues.danhGia);
    fileUpload && formData.append("hinhAnh", fileUpload, fileName);
    if (fileUpload) addFilm(formData);
    else {
      pushNoti(false, "Vui lòng chọn hình ảnh ");
      setLoading(false);
    }
  };

  const fetchFilmDetail = async () => {
    try {
      const response = await getFilmDetail(params.idFilm);
      if (response?.statusCode == 200) {
        setFormValues(response.content);
        setValueDate(new Date(response.content.ngayKhoiChieu));
        setImg(response.content.hinhAnh);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchFilmDetail();
  }, []);
  return (
    <>
      <Loading open={loading}></Loading>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              id="name-input"
              name="tenPhim"
              label="Tên phim"
              type="text"
              size="small"
              fullWidth
              value={formValues.tenPhim}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="name-input"
              name="trailer"
              label="Trailer"
              type="text"
              size="small"
              fullWidth
              value={formValues.trailer}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="name-input"
              name="moTa"
              label="Mô tả"
              type="text"
              size="small"
              fullWidth
              value={formValues.moTa}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <BasicDatePicker
              label="Ngày khởi chiếu"
              value={valueDate}
              setValue={setValueDate}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<SwitchCustom sx={{ m: 1 }} />}
              checked={formValues.sapChieu}
              label="Đang chiếu"
              onChange={setSapChieu}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<SwitchCustom sx={{ m: 1 }} />}
              checked={formValues.dangChieu}
              onChange={setDangChieu}
              label="Sắp chiếu"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<SwitchCustom sx={{ m: 1 }} />}
              checked={formValues.hot}
              onChange={setHot}
              label="Hot"
            />
          </Grid>
          <Grid item>
            <Rating
              name="customized-10"
              max={10}
              value={formValues.danhGia}
              onChange={changeRate}
            />
          </Grid>

          <Grid item>
            <input
              type="file"
              onChange={selectFile}
              accept="image/png, image/jpeg,image/jpg,image/gif"
            />
            <br />
            {img ? <img width={100} src={img} alt="img" /> : null}
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Cập nhật
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default EditFilmForm;
