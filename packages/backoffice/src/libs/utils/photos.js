// import useSWR from 'swr';
import { fetcher, poster } from '@/libs/utils/api';


export const postPhotos = (datas, config) => {
  const pathKey = `/photos`;
  const data = poster(pathKey, datas, config);
  return data;
};
