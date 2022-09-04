import React from "react";
import PublicApp from "./PublicApp";
import ProtectedApp from "./ProtectedApp";
import { useIsAuthenticated } from "@azure/msal-react";

const App: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <ProtectedApp /> : <PublicApp />;
};

export default App;
