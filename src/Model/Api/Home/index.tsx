import { callApi } from "../../../ConfigApi";
import {
  CinemaDTO,
  CinemaGroupDTO,
  FilmDTO,
  InfoCinemaDTO,
} from "../../../DTO/Home";
import { BaseResponse } from "../../Interface";

const HomeApi = {
  films: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
  cinema: "/QuanLyRap/LayThongTinHeThongRap?",
  infoCinema: "/QuanLyRap/LayThongTinLichChieuHeThongRap?",
  infoCinemaByCode: "/QuanLyRap/LayThongTinCumRapTheoHeThong",
};

export const getFilms = (): Promise<BaseResponse<FilmDTO[]> | undefined> => {
  const response = callApi("GET", HomeApi.films).then(
    (res: BaseResponse<FilmDTO[]>) => {
      return res;
    }
  );
  return response;
};

// Lấy thông tin hệ thống rạp
export const getCinemas = (): Promise<
  BaseResponse<CinemaDTO[]> | undefined
> => {
  const response = callApi("GET", HomeApi.cinema).then(
    (res: BaseResponse<CinemaDTO[]>) => {
      return res;
    }
  );
  return response;
};

// Lấy thông tin cụm rạp theo hệ thống
export const getInfoCinemasByCode = (
  cinemaCode: string
): Promise<BaseResponse<InfoCinemaDTO[]> | undefined> => {
  const response = callApi(
    "GET",
    HomeApi.infoCinema + `maHeThongRap=${cinemaCode}&maNhom=GP01`
  ).then((res: BaseResponse<InfoCinemaDTO[]>) => {
    return res;
  });
  return response;
};

//Lấy thông tin cụm rạp theo hệ thống
export const getInfoCinemaByCode = (
  maHeThongRap: string
): Promise<BaseResponse<CinemaGroupDTO[]> | undefined> => {
  const response = callApi(
    "GET",
    HomeApi.infoCinemaByCode + `?maHeThongRap=${maHeThongRap}`
  ).then((res: BaseResponse<CinemaGroupDTO[]>) => {
    return res;
  });
  return response;
};
