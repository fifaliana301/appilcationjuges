// import useSWR from 'swr';
import { deleter, fetcher, poster, patcher } from '@/libs/utils/api';

export const getCompetitor = (config) => {
  const pathKey = `/competitors`;
  const data = fetcher(pathKey, config);
  return data;
};

export const getCompetitorByCompetition = (id, config) => {
  const pathKey = `/competitors/competitions/${id}`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postCompetitor = (datas, config) => {
  const pathKey = `/competitors`;
  const data = poster(pathKey, datas, config);
  return data;
};

export const patchCompetitor = (id, datas, config) => {
  const pathKey = `/competitors/${id}`;
  const data = patcher(pathKey, datas, config);
  return data;
};

export const deleteCompetitor = (id, config) => {
  const pathKey = `/competitors/${id}`;
  const data = deleter(pathKey, config);
  return data;
};
