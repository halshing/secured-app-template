import React, { useEffect } from "react";
import { AccountInfo } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";

const ProtectedApp: React.FC = () => {
  const account = useAccount();
  const { instance, accounts } = useMsal();

  const { idTokenClaims }: AccountInfo | { [key: string]: any } = account
    ? (account as AccountInfo)
    : {};

  const firstName = idTokenClaims?.given_name;
  const lastName = idTokenClaims?.family_name;
  const username = account?.username;

  useEffect(() => {
    instance.setActiveAccount(accounts[0]);
  }, []);

  return (
    <div>
      <h1>Protected App</h1>
      <div>Hi {`${firstName} ${lastName} (${username})`}</div>
      <button
        onClick={() => {
          instance.logoutRedirect();
        }}
      >
        Logout
      </button>
      <div>{JSON.stringify(account)}</div>
    </div>
  );
};

export default ProtectedApp;
