import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminLayout from "../ComponentLayout/adminLayout";
import GuestLayout from "../ComponentLayout/guestLayout";
import AddFilm from "../Pages/Admin/AddFilm";
import EditFilm from "../Pages/Admin/EditFilm";
import ListFilm from "../Pages/Admin/ListFilm";
import Register from "../Pages/Admin/Register/Register";
import ShowTime from "../Pages/Admin/ShowTime";
import DetailFilm from "../Pages/DetailsFilm";
import Home from "../Pages/Home";
import TicketRoom from "../Pages/TicketRoom";
import AppURL from "./appURL";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Redirect to={AppURL.home} />} />
        <Route exact path={AppURL.register} component={Register} />
        <Route path={[AppURL.home, AppURL.detail, AppURL.ticketroom]} >
          <GuestLayout>
            <Switch>
              <Route exact path={AppURL.home} component={Home}></Route>
              <Route exact path={AppURL.detail} component={DetailFilm}></Route>
              <Route
                exact
                path={AppURL.ticketroom}
                component={TicketRoom}
              ></Route>
            </Switch>
          </GuestLayout>
        </Route>
        <Route
          path={[
            AppURL.adminFilms,
            AppURL.addNewFilm,
            AppURL.editFilm,
            AppURL.showtime,
          ]}
        >
          <AdminLayout>
            <Switch>
              <Route
                exact
                path={AppURL.adminFilms}
                component={ListFilm}
              ></Route>
              <Route exact path={AppURL.addNewFilm} component={AddFilm}></Route>
              <Route exact path={AppURL.editFilm} component={EditFilm}></Route>
              <Route exact path={AppURL.showtime} component={ShowTime}></Route>
            </Switch>
          </AdminLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
