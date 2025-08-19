import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token, {
    domain: location.hostname.includes("ess-ds.com") ? ".ess-ds.com" : location.hostname,
  });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
