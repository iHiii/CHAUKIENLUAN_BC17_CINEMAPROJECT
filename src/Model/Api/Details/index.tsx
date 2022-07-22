import { callApi } from "../../../ConfigApi";
import { DetailFilmDTO } from "../../../DTO/Details";
import { BaseResponse } from "../../Interface";

const DetailApi = {
    detailByCode : '/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=',
}

export const getDetailByCode = (idFilm: string|number): Promise<BaseResponse<DetailFilmDTO>| undefined> => {
	const response = callApi('GET', DetailApi.detailByCode+idFilm).then((res: BaseResponse<DetailFilmDTO>) => {
		return res;
	});
	return response;
};
