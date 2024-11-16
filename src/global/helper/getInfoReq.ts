import { type Request } from 'express';

const getInfoReq = (req: Request) => {
  const { method, originalUrl: url, body, query, params, ip } = req;
  return {
    method,
    url,
    body,
    query,
    params,
    ip,
  };
};
export { getInfoReq };
