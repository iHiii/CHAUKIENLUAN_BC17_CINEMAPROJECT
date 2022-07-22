import { Button, Grid, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import BasicDatePicker from "../../../Component/BasicDatePicker";
import Loading from "../../../Component/loading";
import { BasicSelect } from "../../../Component/Select";
import { CommonSelect } from "../../../DTO/Global";
import { showTimes } from "../../../Model/Api/Admin";
import { getCinemas, getInfoCinemaByCode } from "../../../Model/Api/Home";

const ShowTime = () => {
  const params = useParams<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [HTRap, setHTRap] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [cumRap, setCumRap] = useState<string>("");
  const [optionHTRap, setOptionHTRap] = useState<CommonSelect[]>([]);
  const [optionCumRap, setOptionCumRap] = useState<CommonSelect[]>([]);

  const [valueDate, setValueDate] = useState<Date | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPrice(e.target.value);
  };

  const getHTR = async () => {
    try {
      const response = await getCinemas();
      if (response?.statusCode == 200) {
        const options: CommonSelect[] = [];
        response.content?.length &&
          response.content.map((item) =>
            options.push({ value: item.maHeThongRap, text: item.tenHeThongRap })
          );
        setOptionHTRap(options);
      }
    } catch (error) {}
  };

  const getCumRap = async (maHeThongRap: string) => {
    try {
      const response = await getInfoCinemaByCode(maHeThongRap);
      if (response?.statusCode == 200) {
        const options: CommonSelect[] = [];
        response.content?.length &&
          response.content.map((item) =>
            options.push({ value: item.maCumRap, text: item.tenCumRap })
          );
        setOptionCumRap(options);
      }
    } catch (error) {}
  };

  injectStyle();
  const pushNoti = (success: boolean = true, noti?: string) => {
    success ? toast.success("Tạo lịch chiếu thành công") : toast.error(noti);
  };

  const postShowTime = async () => {
    try {
      const response = await showTimes({
        maPhim: parseInt(params.idFilm),
        ngayChieuGioChieu: moment(valueDate).format("DD/MM/yyyy hh:mm:ss"),
        maRap: cumRap,
        giaVe: parseInt(price),
      });
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
  useEffect(() => {
    if (HTRap) getCumRap(HTRap);
  }, [HTRap]);

  useEffect(() => {
    getHTR();
  }, []);

  const submit = () => {
    setLoading(true);
    postShowTime();
  };

  return (
    <>
      <Loading open={loading}></Loading>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2 style={{ margin: "0" }}>Tạo lịch chiếu phim</h2>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <BasicSelect
                id="htRap"
                label="Hệ thống rạp"
                options={optionHTRap}
                value={HTRap}
                setValue={setHTRap}
              />
            </Grid>
            <Grid item>
              <BasicSelect
                id="cumRap"
                label="Cụm  rạp"
                options={optionCumRap}
                value={cumRap}
                setValue={setCumRap}
              />
            </Grid>
            <Grid item>
              <BasicDatePicker
                label="Ngày chiếu"
                value={valueDate}
                setValue={setValueDate}
              />
            </Grid>
            <Grid item>
              <TextField
                id="name-input"
                name="tenPhim"
                label="Giá vé"
                type="text"
                size="small"
                fullWidth
                value={price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => submit()}
              >
                Tạo lịch chiếu
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
};

export default ShowTime;
