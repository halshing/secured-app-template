import { LogLevel } from "@azure/msal-browser";

const {
  REACT_APP_B2C_NAME,
  REACT_APP_B2C_CLIENT_ID,
  REACT_APP_B2C_POLICY_SIGNUP_SIGNIN,
  REACT_APP_B2C_POLICY_PASSWORD_RESET,
  REACT_APP_B2C_POLICY_EDIT_PROFILE,
} = process.env;

const b2cName = `${REACT_APP_B2C_NAME}`;
const b2cClientId = `${REACT_APP_B2C_CLIENT_ID}`;
const authorityDomain = `${b2cName}.b2clogin.com`;
const b2cTenant = `${b2cName}.onmicrosoft.com`;

const policyNames = {
  signUpSignIn: `${REACT_APP_B2C_POLICY_SIGNUP_SIGNIN}`,
  passwordReset: `${REACT_APP_B2C_POLICY_PASSWORD_RESET}`,
  editProfile: `${REACT_APP_B2C_POLICY_EDIT_PROFILE}`,
};

export const b2cPolicies = {
  authorities: {
    signUpSignIn: {
      authority:
        `https://${authorityDomain}/${b2cTenant}/${policyNames.signUpSignIn}`.toLowerCase(),
    },
    passwordReset: {
      authority:
        `https://${authorityDomain}/${b2cTenant}/${policyNames.passwordReset}`.toLowerCase(),
    },
    editProfile: {
      authority:
        `https://${authorityDomain}/${b2cTenant}/${policyNames.editProfile}`.toLowerCase(),
    },
  },
  authorityDomain: authorityDomain,
};

export const msalConfig = {
  auth: {
    clientId: b2cClientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    secureCookies: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: any, containsPii: boolean) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      piiLoggingEnabled: false,
    },
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
    asyncPopups: false,
  },
  telemetry: {
    application: {
      appName: "Secured App Template",
      appVersion: "0.1.0",
      appOwner: "Posterity Technologies LLC",
    },
  },
};

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [],
};
