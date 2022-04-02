// import {
//   FacebookAuthProvider,
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   signInWithRedirect,
// } from "firebase/auth";
// import { useCallback } from "react";
// import { Auth } from "@/Configs/Firebase-config";

// export const Login = ({ mode }) => {
//   const Google = useCallback(async () => {
//     console.log("oi");
//     signInWithRedirect(Auth, new GoogleAuthProvider());
//   }, [window.history]);

//   if (mode === "Google") {
//     console.log("hi");
//     Google();
//   }
//   // Facebook: useCallback(async () => {
//   //   signInWithRedirect(Auth, new FacebookAuthProvider());
//   // }, [window.history]),

//   // Github: useCallback(async () => {
//   //   signInWithRedirect(Auth, new GithubAuthProvider());
//   // }, [window.history]),
//   return <div>wait</div>;
// };
