import axios from 'axios';
import config from '@/config';
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: config.API_HOST,
  timeout: 4000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8'
  }
});

// Intercepteur de réponse
instance.interceptors.response.use(
  function(response) {
    if (response.config.method !== 'get') {
      toast.success("Successful execution of the action", { position: toast.POSITION.BOTTOM_RIGHT, });
    }
    // Faites quelque chose avec les données de la réponse
    return response;
  },
  function(error) {
    // Gérez l'erreur ici
    // Assurez-vous de renvoyer la promesse rejetée pour que l'appelant puisse également gérer l'erreur
    // toast.error(error?.response?.data?.message || "Runtime error", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: false });
    toast.error(error?.response?.data?.message || "Runtime error", { position: toast.POSITION.BOTTOM_RIGHT });
    return Promise.reject(error);
  }
);

export const fetcher = async (url, config = {}) => {
  return instance.get(url, config).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

export const poster = async (url, datas = {}, config = {}) => {
  return instance.post(url, datas, config).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

export const deleter = async (url, config = {}) => {
  return instance.delete(url, config).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

export const patcher = async (url, datas = {}, config = {}) => {
  return instance.patch(url, datas, config).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

export default instance;
