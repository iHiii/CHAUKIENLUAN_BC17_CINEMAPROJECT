import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { NavLink } from "react-router-dom";
import AppURL from "../Router/appURL";
import { Button } from "@mui/material";
import { useState } from "react";
import { FormDialog } from "../Component/FormDialog";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { DangNhap } from "../Model/Api/Global";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type MenuBarType = {
  name: string;
  icon: React.ReactElement;
  url: string;
};
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminLayout: React.FC<any> = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [isLogin, setLogin] = useState<string | null>(
    localStorage.getItem("QTToken")
  );

  const MenuArray: MenuBarType[] = [
    {
      name: "Danh sách phim",
      icon: <MovieOutlinedIcon />,
      url: AppURL.adminFilms,
    },
    {
      name: "Thêm mới phim",
      icon: <ModeEditOutlineOutlinedIcon />,
      url: AppURL.addNewFilm,
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  injectStyle();
  const pushNoti = (success: boolean = true, noti?: string) => {
    success ? toast.success("Đăng nhập thành công") : toast.error(noti);
  };

  const setQTToken = (token: string) => {
    localStorage.setItem("QTToken", token);
    setLogin(token);
    setOpenModal(!token);
  };
  const Login = async (userName: string, password: string) => {
    try {
      const response = await DangNhap(userName, password);
      if (response?.statusCode == 200) {
        if (response.content.maLoaiNguoiDung === "QuanTri") {
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
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                Admin page
              </Typography>

              {isLogin ? (
                <Button
                  color="green"
                  variant="contained"
                  onClick={() => setQTToken("")}
                >
                  Đăng xuất
                </Button>
              ) : (
                <Button
                  color="green"
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {theme.direction === "rtl" ? null : (
              <div
                style={{ textAlign: "center", width: "100%", fontSize: "20px" }}
              >
                ADMIN
              </div>
            )}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {MenuArray.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <NavLink to={item.url} activeStyle={{ color: "red" }} exact>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {props.children}
        </Box>
      </Box>
      <FormDialog openModal={openModal} Login={Login} />
    </>
  );
};
export default AdminLayout;
