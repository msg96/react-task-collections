import { Navigate } from "react-router-dom";
import { Auth } from "@/Configs/Firebase-config";

export const Logout = (props) => {
  Auth.signOut()
    .then((result) => {
      return <Navigate to="/Login" replace />;
    })
    .catch((error) => {
      return <></>;
    });
  return <></>;
};
