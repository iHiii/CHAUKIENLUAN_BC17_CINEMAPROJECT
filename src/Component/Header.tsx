import { Button, ButtonGroup, Grid } from "@mui/material";
import { margin } from "@mui/system";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { DangNhap } from "../Model/Api/Global";
import AppURL from "../Router/appURL";
import { FormDialog } from "./FormDialog";

const Header: React.FC<any> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLogin, setLogin] = useState<string | null>(
    localStorage.getItem("QTToken")
  );
  injectStyle();
  const pushNoti = (success: boolean = true, noti?: string) => {
    success ? toast.success("Đăng nhập thành công") : toast.error(noti);
  };

  const Login = async (userName: string, password: string) => {
    try {
      const response = await DangNhap(userName, password);
      if (response?.statusCode == 200) {
        if (response.content.maLoaiNguoiDung === "KhachHang") {
          setQTToken(response.content.accessToken);
          pushNoti();
        } else
          pushNoti(
            false,
            "Tài khoản này không có quyền Quản trị, vui lòng đăng nhập lại"
          );
      } else {
        pushNoti(false, response.content.toString());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };
  const setQTToken = (token: string) => {
    localStorage.setItem("KhachHang", token);
    setLogin(token);
    setOpenModal(!token);
  };
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={9} lg={10}>
        <Grid container justifyContent="center">
          <Grid item>
            <ButtonGroup variant="text" aria-label="text button group">
              <Button href={AppURL.home}>Trang chủ</Button>
              <Button>Liên hệ</Button>
              <Button>Tin tức</Button>
              <Button>Ứng dụng</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={2}>
        {isLogin ? (
          <Button
            color="green"
            variant="contained"
            onClick={() => {
              setQTToken("");
              setOpenModal(false);
            }}
          >
            Đăng xuất
          </Button>
        ) : (
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button color="green" variant="contained" href={AppURL.register}>
                Đăng Ký
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpenModal(true)}
              >
                Đăng Nhập
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      <FormDialog openModal={openModal} Login={Login} resister />
    </Grid>
  );
};

export default Header;
