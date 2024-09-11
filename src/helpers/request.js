import axios from 'axios';
import {clearToken, getToken, redirectToLoginPage} from 'src/helpers/auth';
import {Loading, Notify} from 'quasar';

const baseUrl = "/api/"

export async function sendRequest(url, method = 'GET', data = null, headers = {}) {
  try {
    const options = {
      url: baseUrl + url,
      method,
      headers: {
        'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken(),
        ...headers,
      },
      data: data ? JSON.stringify(data) : null,
    };
    Loading.show({
      message: 'Please wait...',
    });
    const response = await axios(options);
    Loading.hide();
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      clearToken()
      redirectToLoginPage()
    }
    Loading.hide();
    console.log(error)
    let message = "An unexpected error has been accrued"
    try {
      message = error.response.data['error']
    } catch (e) {
      console.log(e)
    }
    Notify.create({
      type: 'negative',
      message: message,
      icon: 'error',
      position: 'top',
    });
    throw error.response ? error.response.data : error;
  }
}

