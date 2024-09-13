import {sendRequest} from "src/helpers/request";

export function setToken(accessToken) {
  localStorage.setItem("accessToken", accessToken)
}

export function getToken() {
  return localStorage.getItem("accessToken")
}

export function clearToken() {
  return localStorage.removeItem("accessToken")
}

export function redirectToLoginPage() {
  window.location.href = '/#/auth/sign-in';
}


export async function login(email, password) {
  try {
    const data = await sendRequest(
      "auth/sign-in",
      "POST",
      {
        "email": email,
        "password": password
      },
    )
    setToken(data.data['access-token'])
    return data
  } catch (err) {
    throw err;
  }
}

export function isLoggedIn() {
  const token = getToken()
  return token != null
}

export function checkIsLoggedIn() {
  if (!isLoggedIn()) {
    return redirectToLoginPage()
  }
}
