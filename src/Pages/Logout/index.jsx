import { Navigate } from "react-router-dom";
import { Logout as sair } from "@/Configs/Auth";
export const Logout = (props) => {
  sair()
    .then((result) => {
      return <Navigate to="/Login" replace />;
    })
    .catch((error) => {
      window.history.back();
    });
  return <></>;
};
