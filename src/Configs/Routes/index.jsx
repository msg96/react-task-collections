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
import { CategoryContainer } from "@/Components/Category";
import { createGlobalStyle } from "styled-components";

const InjectedTransition = createGlobalStyle`
  body{
    transition: background 250ms ease-in;
  }
`;

function PrivateRoute({ Authenticated }) {
  return Authenticated ? <Outlet /> : <Navigate to="/Login" replace />;
}

export default function Rotas() {
  const myProvider = useProvider() || {
    Auth: {
      Pending: true,
      User: false,
    },
    Theme: {
      isDarkMode: undefined,
      Toggle: undefined,
    },
  };

  var Authenticated = false;
  if (!myProvider.Auth.Pending) {
    Authenticated = myProvider.Auth.User || false;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Base auth={Authenticated} />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/18031966" element={<Spinner />} />
          <Route
            element={<PrivateRoute Authenticated={myProvider.Auth.User} />}
          >
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
      {!myProvider.Auth.Pending && <InjectedTransition />}
    </>
  );
}
