import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FilmsByGroupDTO, ScheduleDTO } from "../../../../DTO/Home";
import { getTime } from "../../../../FunctionCommon";

interface IFilmOfCenima {
  film: FilmsByGroupDTO;
}
const FilmOfCenima: React.FC<IFilmOfCenima> = (props) => {
  const film = props.film;
  const [valueShedule, setValueShedule] = useState(0);
  const [shedules, setShedules] = useState<ScheduleDTO[]>([]);
  // sắp xếp danh sách rạp theo số thứ tự rạp tăng dần
  const sortArray = (array: ScheduleDTO[]) => {
    const result = array.sort((a, b) => {
      const value1 = +(a.tenRap.substring(4).trim());
      const value2 = +(b.tenRap.substring(4).trim());
      if(value1 < value2) return -1;
      if(value1 > value2 ) return 1;
      return 0
    });
    return result
  };

  //sắp xếp danh sách rạp
  const orderFilmShedules = () => {
    const filmShedules = props.film?.lstLichChieuTheoPhim;
    if(filmShedules && filmShedules.length){
      return sortArray(filmShedules)
    }
  }
  const filmShedules = orderFilmShedules();

  // bắt sự kiện khi một rạp được click
  const handleChangeShedule = (event: React.SyntheticEvent, newValue: number) => {
    
    setValueShedule(newValue);
  };

  // Filter lại lịch chiếu phim khi chọn rạp
  useEffect(()=> {
    filterShedule(valueShedule);
  }, [valueShedule])
  

  // lọc lịch chiếu theo rạp
  const filterShedule = (index: number) => { 
    if(film && film?.lstLichChieuTheoPhim.length && index != null){
      const code = film.lstLichChieuTheoPhim[index].maRap;
      let shedulesResult: ScheduleDTO[] = [];
      shedulesResult = film.lstLichChieuTheoPhim.filter(item => item.maRap == code);
      setShedules(shedulesResult);
    }
  }

  return (
    <Box>
      {film ? (
        <>
          <Typography variant="subtitle2">
            {film.hot ? (
              <span style={{ color: "red" }}>[ Hot ] &nbsp;</span>
            ) : null}
            {film.tenPhim}
          </Typography>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="caption">
                {film.dangChieu ? (
                  <span style={{ color: "green" }}>Đang chiếu &emsp;</span>
                ) : null}
                {film.sapChieu ? (
                  <span style={{ color: "red" }}>Sắp chiếu &emsp;</span>
                ) : null}
              </Typography>
            </Grid>
            <Grid item xs={9} >
              <Grid container>
                <Grid item xs={12}>
                  <Tabs
                    value={valueShedule}
                    onChange={handleChangeShedule}
                    variant='scrollable'
                    textColor="secondary"
                    indicatorColor={'secondary'}
                    scrollButtons={false}
                  >
                    {filmShedules && filmShedules.length ? filmShedules.map((sheduleFilm: ScheduleDTO, index: number) => (
                        <Tab key={`rap-phim-${index}`+sheduleFilm.maRap+film.maPhim} label={sheduleFilm.tenRap}></Tab>
                    )) : null} 
                  </Tabs>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              {shedules && shedules.length ? shedules.map(item => (
                <span 
                key={item.maRap}
                style={{
                  color: 'green',
                  marginRight: '22px',
                  marginLeft: '25px',
                  fontSize: '25px'
                }}>{getTime(item.ngayChieuGioChieu)}</span>
              )): null}
            </Grid>
          </Grid>
        </>
      ) : null}
    </Box>
  );
};

export default FilmOfCenima;
