import { callApi } from "../../../ConfigApi";
import { TickettRoomDTO } from "../../../DTO/TicketRoom";
import { BaseResponse } from "../../Interface";

const TicketRoom = {
    code : '/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=',
	
}

export const getInfoTicketRoom = (malichchieu: string|number): Promise<BaseResponse<{thongTinPhim: TickettRoomDTO}>| undefined> => {
	const response = callApi('GET', TicketRoom.code+malichchieu).then((res: BaseResponse<{thongTinPhim: TickettRoomDTO}>) => {
		return res;
	});
	return response;
};