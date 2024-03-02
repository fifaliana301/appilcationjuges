// import useSWR from 'swr';
import {  poster, fetcher } from '@/libs/utils/api';


export const postLogin = (datas, config) => {
  const pathKey = `/auth/login`;
  const data = poster(pathKey, datas, config);
  return data;
};

export const postSign = (datas, config) => {
  const pathKey = `/judges`;
  const data = poster(pathKey, datas, config);
  return data;
};


export const patchJudges = (id, datas, config) => {
  const pathKey = `/judges/${id}`;
  const data = patcher(pathKey, datas, config);
  return data;
};

export const fetchJudges = (config) => {
  const pathKey = `/judges`;
  const data = fetcher(pathKey, config);
  return data;
};

export const fetchJudgesActive = (config) => {
  const pathKey = `/auth/profile`;
  const data = fetcher(pathKey, config);
  return data;
};

