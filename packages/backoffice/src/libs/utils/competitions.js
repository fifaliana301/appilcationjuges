// import useSWR from 'swr';
import { deleter, fetcher, poster, patcher } from '@/libs/utils/api';

export const getCompetition = (config) => {
  const pathKey = `/competitions`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postCompetition = (datas, config) => {
  const pathKey = `/competitions`;
  const data = poster(pathKey, datas, config);
  return data;
};

export const patchCompetition = (id, datas, config) => {
  const pathKey = `/competitions/${id}`;
  const data = patcher(pathKey, datas, config);
  return data;
};

export const deleteCompetition = (id, config) => {
  const pathKey = `/competitions/${id}`;
  const data = deleter(pathKey, config);
  return data;
};

export const patchAddCompetitorsToCompetitions = (datas, config) => {
  console.log("patchAddCompetitorsToCompetitions", datas)
  const pathKey = `/competitions/addCompetitorsToCompetitions`;
  const data = patcher(pathKey, datas, config);
  return data;
}
