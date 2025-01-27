// import useSWR from 'swr';
import { deleter, fetcher, patcher, poster } from '@/libs/utils/api';


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

export const deleteCalendarsBattles = (datas, config) => {
  const pathKey = `/calendars-battles/${datas.id}`;
  const data = deleter(pathKey, datas, config);
  return data;
};

export const patchCalendarsBattles = (datas, config) => {
  const pathKey = `/calendars-battles/${datas.id}`;
  const data = patcher(pathKey, datas, config);
  return data;
};



