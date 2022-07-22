export interface BaseResponse<T> {
  content: T;
  dateTime: string;
  message: string;
  messageConstants: null;
  statusCode: number;
}
