export interface DetailFilmDTO {
  maPhim: number | string;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: string;
  danhGia: number;
  heThongRapChieu: SheduleSystemDTO[];
}

export interface SheduleSystemDTO {
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  cumRapChieu: GroupSheduleDTO[];
}

export interface GroupSheduleDTO {
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
  lichChieuPhim: SheduleDTO[];
}

export interface SheduleDTO {
  maLichChieu: string | number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}
