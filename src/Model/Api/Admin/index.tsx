import { callApi } from "../../../ConfigApi";
import { FilmDetail, ListFilm } from "../../../DTO/Admin";
import { BaseResponse } from "../../Interface";

const AdminApi = {
  listFilms: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
  addNewFilmsURL: "/QuanLyPhim/ThemPhimUploadHinh",
  updateFilmURL: "/QuanLyPhim/CapNhatPhimUpload",
  deleteFilmURL: "/QuanLyPhim/XoaPhim",
  getFilmDetailURL: "/QuanLyPhim/LayThongTinPhim",
  showtimeURL: "/QuanLyDatVe/TaoLichChieu",
};

export const getListFilm = (
  tenPhim?: string
): Promise<BaseResponse<ListFilm[]> | undefined> => {
  const response = callApi(
    "GET",
    tenPhim ? AdminApi.listFilms + `&tenPhim=${tenPhim}` : AdminApi.listFilms
  ).then((res: BaseResponse<ListFilm[]>) => {
    return res;
  });
  return response;
};
export const getFilmDetail = (
  maPhim?: string
): Promise<BaseResponse<FilmDetail> | undefined> => {
  const response = callApi(
    "GET",
    AdminApi.getFilmDetailURL + `?MaPhim=${maPhim}`
  ).then((res: BaseResponse<FilmDetail>) => {
    return res;
  });
  return response;
};
export const addNewFilm = (
  body: any
): Promise<BaseResponse<string> | undefined> => {
  const response = callApi("POST", AdminApi.addNewFilmsURL, body).then(
    (res: BaseResponse<string>) => {
      return res;
    }
  );
  return response;
};
export const updateFilm = (
  body: any
): Promise<BaseResponse<string> | undefined> => {
  const response = callApi(
    "POST",
    AdminApi.updateFilmURL,
    body,
    true,
    localStorage.getItem("QTToken") || ""
  ).then((res: BaseResponse<string>) => {
    return res;
  });
  return response;
};

export const deleteFilm = (
  maPhim: number
): Promise<BaseResponse<string> | undefined> => {
  const response = callApi(
    "DELETE",
    AdminApi.deleteFilmURL + `?MaPhim=${maPhim}`,
    {},
    true,
    localStorage.getItem("QTToken") || ""
  ).then((res: BaseResponse<string>) => {
    return res;
  });
  return response;
};
export const showTimes = (
  body: any
): Promise<BaseResponse<string> | undefined> => {
  const response = callApi(
    "POST",
    AdminApi.showtimeURL,
    body,
    true,
    localStorage.getItem("QTToken") || ""
  ).then((res: BaseResponse<string>) => {
    return res;
  });
  return response;
};
export default AdminApi;
