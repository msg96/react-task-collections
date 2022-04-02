import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  Login,
  Logout,
  Home,
  NotFound,
  Spinner,
  Categorias,
  Tasks,
  Base,
} from "@/Pages";
import { useProvider } from "../Provider";
import { CategoryContainer } from "../../Components/Category";

function PrivateRoute({ Authenticated }) {
  return Authenticated ? <Outlet /> : <Navigate to="/Login" replace />;
}

export default function Rotas() {
  const myProvider = useProvider();
  const Authenticated = myProvider.Auth.User || false;
  return (
    <Routes>
      <Route path="/" element={<Base auth={Authenticated}/>}>
        <Route path="/Login" element={<Login />} />
        <Route path="/18031966" element={<Spinner />} />
        <Route element={<PrivateRoute Authenticated={myProvider.Auth.User} />}>
          <Route index element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/categorias" element={<CategoryContainer />}>
            <Route index element={<Categorias />} />
            <Route path=":categoriaID" element={<Tasks />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
