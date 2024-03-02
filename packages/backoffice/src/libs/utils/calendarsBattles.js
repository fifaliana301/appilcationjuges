// import useSWR from 'swr';
import { fetcher, poster } from '@/libs/utils/api';


export const fetchCalendarsBattles = (config) => {
  const pathKey = `/calendars-battles`;
  const data = fetcher(pathKey, config);
  return data;
};

export const fetchCalendarsBattlesOne = (datas, config) => {
  const pathKey = `/calendars-battles/${datas.id}`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postCalendarsBattles = (datas, config) => {
  const pathKey = `/calendars-battles`;
  const data = poster(pathKey, datas, config);
  return data;
};

