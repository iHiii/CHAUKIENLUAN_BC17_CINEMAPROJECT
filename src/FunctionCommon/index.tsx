import moment from "moment";

// chuyển từ ngày tháng dạng datetime => dd/mm/yy
export  const getDate = (date: Date) => {
    return moment(date).format('DD/MM/YYYY')
  };

export const getTime = (dateInput: string) => {
    return moment(dateInput).format('HH:mm');
}