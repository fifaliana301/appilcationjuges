// import useSWR from 'swr';
import { fetcher, poster } from '@/libs/utils/api';


export const fetchRounds = (config) => {
  const pathKey = `/rounds`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postRoundsUpdateAll = (datas, config) => {
  const pathKey = `/rounds/update_all/${datas.id}`;
  const data = poster(pathKey, datas, config);
  return data;
};

export const fetchRoundsCalendarsBattles = (datas, config) => {
  const pathKey = `/rounds/calendars_battles/${datas.id}`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postRounds = (datas, config) => {
  const pathKey = `/rounds/`;
  const data = poster(pathKey, datas, config);
  return data;
};


