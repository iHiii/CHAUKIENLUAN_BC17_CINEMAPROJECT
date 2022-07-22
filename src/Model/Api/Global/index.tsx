import { callApi } from "../../../ConfigApi";
import { ListFilm } from "../../../DTO/Admin";
import { LoginType } from "../../../DTO/Global";
import { BaseResponse } from "../../Interface";

const Global = {
  dangNhapUrl: "/QuanLyNguoiDung/DangNhap",
  dangKyUrl: "/QuanLyNguoiDung/DangKy",
};

export const DangNhap = (
  taiKhoan: string,
  matKhau: string
): Promise<BaseResponse<LoginType>> => {
  const response = callApi("POST", Global.dangNhapUrl, {
    taiKhoan,
    matKhau,
  }).then((res: BaseResponse<LoginType>) => {
    return res;
  });
  return response;
};

export const DangKy = (body: any): Promise<BaseResponse<string>> => {
  const response = callApi("POST", Global.dangKyUrl, {
    body,
  }).then((res: BaseResponse<string>) => {
    return res;
  });
  return response;
};
export default Global;
