interface FResponse {
  data: object[];
  total: number;
  limit: number;
  skip: number;
}

interface FParams {
  query?: object;
}

interface FService {
  on: Function;
  off: Function;
  find: Function;
  get: Function;
  remove: Function;
  patch: Function;
  update: Function;
}

