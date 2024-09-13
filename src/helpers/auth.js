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
  if (!window.location.href.includes("auth")) {
    window.location.href = '/#/auth/sign-in';
  }
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

export async function register(email, password) {
  try {
    const data = await sendRequest(
      "auth/sign-up",
      "POST",
      {
        "email": email,
        "password": password
      },
    )
    return data
  } catch (err) {
    throw err;
  }
}

export async function verifyEmail(email, verification_token) {
  try {
    const data = await sendRequest(
      "auth/verify-email",
      "POST",
      {
        "email": email,
        "verification_token": verification_token
      },
    )
    return data
  } catch (err) {
    throw err;
  }
}

export async function forgotPassword(email) {
  try {
    const data = await sendRequest(
      "auth/forgot-password",
      "POST",
      {
        "email": email,
      },
    )
    return data
  } catch (err) {
    throw err;
  }
}

export async function forgotPasswordChangePassword(email, new_password, forgot_password_token) {
  try {
    const data = await sendRequest(
      "auth/forgot-password/change-password",
      "POST",
      {
        "token": forgot_password_token,
        "new_password": new_password,
        "email": email,
      },
    )
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
