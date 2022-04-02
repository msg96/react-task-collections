import { Auth } from "@/Configs/Firebase-config";

export const Logout = async (props) => {
  Auth.signOut();
};
