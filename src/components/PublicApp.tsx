import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/auth";

const PublicApp: React.FC = () => {
  const { instance } = useMsal();

  return (
    <div>
      <h1>Public App</h1>
      <button
        onClick={() => {
          instance.loginRedirect(loginRequest);
        }}
      >
        Log In / Sign Up
      </button>
    </div>
  );
};

export default PublicApp;
