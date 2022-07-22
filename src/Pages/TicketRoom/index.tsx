import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Component/loading";
import { TickettRoomDTO } from "../../DTO/TicketRoom";
import { getInfoTicketRoom } from "../../Model/Api/TicketRoom";
import { TicketType } from "../../Model/Enum/TicketRoom";
import { Ticket } from "../../Model/Interface/TicketRoom";
import { ticketRoomStyles } from "./ticketRoomStyles";
import TitleTicketRoom from "./TitleTicketRoom";

const TicketRoom: React.FC<any> = (props) => {
  const params = useParams<{ id: string }>();
  const [openData, setOpenData] = useState<boolean>(false);
  const [data, setData] = useState<TickettRoomDTO>();
  const classes = ticketRoomStyles();
  const ticketInCol = 16;
  const ticketInRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "j"];
  const [ticketsInit, setTicketsInit] = useState<Ticket[]>([]);
  const dataResponseTickets: Ticket[] = localStorage.getItem("tickets")
    ? JSON.parse(localStorage.getItem("tickets") || "")
    : [];

  // Tạo danh sách chỗ ngồi (vé)
  const initTickets = () => {
    const result: Ticket[] = [];
    ticketInRow.map((row) => {
      for (let col = 1; col <= ticketInCol; col++) {
        const ticket = initTicket(row, col);
        result.push(ticket);
      }
    });
    setTicketsInit(result);
  };

  // Tạo một vé xem phim khi nhận vào số hàng và số cột
  const initTicket = (row: string, col: number): Ticket => {
    if (row == "F" || row == "G") {
      if (col >= 4 && col <= 14) {
        return { id: row + col, name: row + col, type: TicketType.VIP };
      }
    }
    return { id: row + col, name: row + col, type: TicketType.Normal };
  };

  // Lấy thông tin vé từ localStore => Nếu có thông tin,  replace thông tin vé được khởi tạo với thông tin nhận được
  // => Nếu không có thông tin, thông tin vé sẽ là thông tin khởi tạo
  useEffect(() => {
    if (dataResponseTickets && dataResponseTickets.length) {
      setTicketsInit(dataResponseTickets);
    } else {
      initTickets();
    }
  }, []);

  const handlerSelectTicket = (idTicket: string, type: number) => {
    const index = ticketsInit.findIndex((item) => item.id == idTicket);
    if (index != -1 && type == TicketType.Normal) {
      const data = ticketsInit;
      data[index] = {
        id: ticketsInit[index].id,
        name: ticketsInit[index].name,
        type: TicketType.Select,
      };
      setTicketsInit(data);
    }
    if (index != -1 && type == TicketType.VIP) {
      const data = ticketsInit;
      data[index] = {
        id: ticketsInit[index].id,
        name: ticketsInit[index].name,
        type: TicketType.selectVIP,
      };
      setTicketsInit(data);
    }
  };

  const handlerCancelBook = (id: string, type: number) => {
    const index = ticketsInit.findIndex((item) => item.id == id);
    if (index != -1 && TicketType.Select) {
      ticketsInit[index] = {
        ...ticketsInit[index],
        type: TicketType.Normal,
      };
    }
    if (index != -1 && TicketType.selectVIP) {
      ticketsInit[index] = {
        ...ticketsInit[index],
        type: TicketType.VIP,
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setOpenData(true);
      if (params.id) {
        const response = await getInfoTicketRoom(params.id);
        if (response?.statusCode == 200) {
          setData(response.content.thongTinPhim);
          console.log(9999, response.content.thongTinPhim);
          
        } 
      }
      setOpenData(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <Loading open={openData}></Loading>
      <Grid container justifyContent={"center"} textAlign="center" sx={{marginBottom: 5, marginTop: 15}}>
        <Grid item xs={12}>
          <TitleTicketRoom></TitleTicketRoom>
        </Grid>
      </Grid>
      <Grid container justifyContent={"flex-start"} sx={{marginBottom: 5}}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "orangered" }}>
            Ngày chiếu: {data?.ngayChieu} - {data?.tenRap}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Grid container justifyContent={"center"}>
            <Grid item xs={10} className={classes.customSpan}>
              MÀN HÌNH
            </Grid>
            <Grid item xs={12} textAlign="left">
              {ticketsInit && ticketsInit.length
                ? ticketsInit.map((item) => (
                    <Button
                      key={item.id}
                      color={item.type == 2 ? "green" : "default"}
                      variant="contained"
                      sx={{ maxWidth: 40, margin: 1.3, minWidth: 10 }}
                      onClick={() => handlerSelectTicket(item.id, item.type)}
                    >
                      {item.name}
                    </Button>
                  ))
                : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{border: '1px solid gray', borderRadius: 5, padding: 4, background:'transparent'}}>
            <Grid container justifyContent={'center'} textAlign="center">
              <Grid item>
                  <span style={{fontSize: 20}}>{data?.tenPhim}</span>
              </Grid>
            </Grid>
            <Divider sx={{marginTop: 5}}></Divider>
            <Grid container justifyContent={'space-between'}>
              <Grid item xs={6}>
                  <span>Ngày chiếu, giờ chiếu:</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <span>{data?.ngayChieu} | {data?.gioChieu}</span>
              </Grid>
            </Grid>
            <Divider sx={{marginTop: 5}}></Divider>
            <Grid container justifyContent={'space-between'}>
              <Grid item xs={6}>
                  <span>Cụm rạp:</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <span>{data?.tenCumRap}</span>
              </Grid>
            </Grid>
            <Divider sx={{marginTop: 5}}></Divider>
            <Grid container justifyContent={'space-between'}>
              <Grid item xs={6}>
                  <span>Địa chỉ:</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <span>{data?.diaChi}</span>
              </Grid>
            </Grid>
            <Divider sx={{marginTop: 5}}></Divider>
            <Grid container justifyContent={'space-between'}>
              <Grid item xs={6}>
                  <span>Rạp:</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <span>{data?.tenRap}</span>
              </Grid>
            </Grid>
  
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TicketRoom;
