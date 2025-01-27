// import useSWR from 'swr';
import { fetcher, poster } from '@/libs/utils/api';


export const fetchInvitedJudges = (datas, config) => {
  const pathKey = `/invited-judges/${datas.id}`;
  const data = fetcher(pathKey, config);
  return data;
};

export const fetchInvitedJudgesCompetitions = (datas, config) => {
  const pathKey = `/invited-judges/competitions/${datas.id}`;
  const data = fetcher(pathKey, config);
  return data;
};

export const postInvitedJudges = (datas, config) => {
  const pathKey = `/invited-judges`;
  const data = poster(pathKey, datas, config);
  return data;
};


export const fetchValidationJudges = (datas, config) => {
  const pathKey = `/invited-judges/validationJudges/${datas.idCompetitions}/${datas.idJudges}`;
  const data = fetcher(pathKey, config);
  return data;
};
