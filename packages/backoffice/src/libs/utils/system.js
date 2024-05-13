// import useSWR from 'swr';
import { fetcher, patcher, poster } from '@/libs/utils/api';


export const fetchAllComptes = (config) => {
  const pathKey = `/auth/all_comptes`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postToggleStatus = (datas, config) => {
  const pathKey = `/auth/toggle_status`;
  const data = poster(pathKey, datas, config);
  return data;
};

export const postAddAdmins = (datas, config) => {
  const pathKey = `/users`;
  const data = poster(pathKey, datas, config);
  return data;
};

export const patchAdmins = (id, datas, config) => {
  const pathKey = `/users/${id}`;
  const data = patcher(pathKey, datas, config);
  return data;
};

export const fetchAdminsConnect = (config) => {
  const pathKey = `/auth/profile`;
  const data = fetcher(pathKey, config);
  return data;
};


export const postValidateAdmins = (datas, config) => {
  const pathKey = `/validation-email/validation/${datas.idUser}/${datas.validate}`;
  const data = poster(pathKey, {}, config);
  return data;
};
