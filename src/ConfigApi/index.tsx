import axios, { Method } from "axios";
import { ResponseSchema } from "./responseSchema";

const baseURL = "https://movienew.cybersoft.edu.vn/api";
const tokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNyIsIkhldEhhblN0cmluZyI6IjI2LzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2Njc0MjQwMDAwMCIsIm5iZiI6MTYzNzYwMDQwMCwiZXhwIjoxNjY2ODkwMDAwfQ.bsbyK5ZxphAvsyp2ZqB_XhppPE9tnzCxMpCoHby_Wc0";
export const callApi = (
  method: Method,
  url: string,
  data?: any,
  isAuthen?: boolean,
  token?: string,
  responseType?: boolean
) => {
  const Authorization: string = (token && isAuthen && `Bearer ${token}`) || "";

  return axios({
    method: method,
    url: baseURL + url,
    responseType: responseType ? "blob" : "json",
    data: data,
    headers: {
      TokenCyberSoft: tokenCybersoft,
      Authorization,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res: ResponseSchema) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        return err.response.data;
      }
    });
};
