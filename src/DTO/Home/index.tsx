export interface FilmDTO {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface CinemaDTO {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface InfoCinemaDTO {
  logo: string;
  lstCumRap: GroupCinemaDTO[];
  maHeThongRap: string;
  mahom: string;
  tenHeThongRap: string;
}

export interface GroupCinemaDTO {
  danhSachPhim: FilmsByGroupDTO[];
  diaChi: string;
  hinhAnh: string;
  maCumRap: string;
  tenCumRap: string;
}

export interface FilmsByGroupDTO {
  dangChieu: boolean;
  hinhAnh: string;
  hot: boolean;
  lstLichChieuTheoPhim: ScheduleDTO[];
  maPhim: 1359;
  sapChieu: boolean;
  tenPhim: string;
}

export interface ScheduleDTO {
  giaVe: number;
  maLichChieu: number;
  maRap: string;
  ngayChieuGioChieu: string;
  tenRap: string;
}
export interface CinemaGroupDTO {
  danhSachRap: { maRap: string; tenRap: string }[];
  diaChi: string;
  maCumRap: string;
  tenCumRap: string;
}
