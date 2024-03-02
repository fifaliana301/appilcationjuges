// import useSWR from 'swr';
import { fetcher, poster } from '@/libs/utils/api';


export const fetchTables = (datas, config) => {
  const pathKey = `/tables/${datas.id}`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postTables = (datas, config) => {
  const pathKey = `/tables`;
  const data = poster(pathKey, datas, config);
  return data;
};

export const fetchTablesCompetitions = (datas, config) => {
  const pathKey = `/tables/competitions/${datas.id}`;
  const data = fetcher(pathKey, config);
  return data;
};

