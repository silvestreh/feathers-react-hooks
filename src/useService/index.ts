import { useFeathers } from '../provider';

export const useService = (name: string) => {
  const feathers: any = useFeathers();
  return feathers.service(name);
};
