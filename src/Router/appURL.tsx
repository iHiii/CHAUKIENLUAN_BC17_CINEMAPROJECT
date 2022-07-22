const AppURL = {
  // guest
  home: "/home", // trang chủ
  detail: "/detail/:id", // trang chi tiết phim theo id
  ticketroom: "/ticketroom/:id", // trang đặt vé

  //register + login => loginLayout config router
  register: "/register",
  login: "/login",

  // admin => dung admin layout config router
  adminFilms: "/admin/films",
  showtime: "/admin/showtime/:idFilm",
  addNewFilm: "/admin/films/addnew",
  editFilm: "/admin/films/edit/:idFilm",
  profile: "/profile",
  userNameManagement: "admin/quanlynguoidung/index",
  addUserName: "admin/quanlynguoidung/addUserName",
  editUserName: "admin/quanlynguoidung/editUserName",
};
export default AppURL;
