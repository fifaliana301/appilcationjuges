// import useSWR from 'swr';
import { fetcher, poster } from '@/libs/utils/api';


export const fetchAllComptes = (config) => {
  const pathKey = `/auth/all_comptes`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postAddAdmins = (datas, config) => {
  const pathKey = `/users`;
  const data = poster(pathKey, datas, config);
  return data;
};
