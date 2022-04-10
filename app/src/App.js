import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./views/login/login";
import { Register } from "./views/register/register";
import { MyGroups } from "./views/my-groups/my-groups";
import { EditGroup } from "./views/edit-group";
import { ViewGroup } from "./views/view-group/view-group";
import { CreateGroup } from "./views/create-group/create-group";
import { UserRoute } from "./components/route/user.route";
import { PublicRoute } from "./components/route/public.route";
import { AppRoutes } from "./constants/routes.constants";
import { Logout } from "./views/logout/logout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.ViewGroup}
            element={
              <UserRoute>
                <ViewGroup />
              </UserRoute>
            }
          ></Route>
          <Route
            path={AppRoutes.EditGroup}
            element={
              <UserRoute>
                <EditGroup />
              </UserRoute>
            }
          ></Route>
          <Route
            path={AppRoutes.CreateGroup}
            element={
              <UserRoute>
                <CreateGroup />
              </UserRoute>
            }
          ></Route>
          <Route
            path={AppRoutes.MyGroups}
            element={
              <UserRoute>
                <MyGroups />
              </UserRoute>
            }
          ></Route>
          <Route
            path={AppRoutes.Register}
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path={AppRoutes.Logout}
            element={
              <PublicRoute>
                <Logout />
              </PublicRoute>
            }
          ></Route>
          <Route
            path={AppRoutes.Login}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
