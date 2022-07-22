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
import { DangKy } from "../../../Model/Api/Global";
import { getCinemas, getInfoCinemaByCode } from "../../../Model/Api/Home";

const Register = () => {
  const params = useParams<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [name, setName] = useState<string>("");

  injectStyle();
  const pushNoti = (success: boolean = true, noti?: string) => {
    success ? toast.success("Tạo lịch chiếu thành công") : toast.error(noti);
  };

  const createAccount = async () => {
    try {
      const response = await DangKy({
        taiKhoan: userName,
        matKhau: password,
        email: email,
        soDt: phoneNum,
        maNhom: "GP01",
        hoTen: name,
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

  const submit = () => {
    setLoading(true);
    createAccount();
  };

  return (
    <>
      <Loading open={loading}></Loading>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2 style={{ margin: "0" }}>Đăng ký tài khoản mới</h2>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                id="name-input"
                name="tenPhim"
                label="Tài khoản"
                type="text"
                size="small"
                fullWidth
                value={userName}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="name-input"
                name="tenPhim"
                label="Mật khẩu"
                type="password"
                size="small"
                fullWidth
                value={password}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="name-input"
                name="tenPhim"
                label="Email"
                type="text"
                size="small"
                fullWidth
                value={email}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="name-input"
                name="tenPhim"
                label="SDT"
                type="text"
                size="small"
                fullWidth
                value={phoneNum}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setPhoneNum(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="name-input"
                name="tenPhim"
                label="Họ tên"
                type="text"
                size="small"
                fullWidth
                value={name}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => submit()}
              >
                Đăng ký
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
};

export default Register;
