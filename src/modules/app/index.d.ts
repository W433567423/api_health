interface IResData<T> {
  code?: number;
  msg?: string;
  data?: T;
}

interface IUser {
  id: number;
  user_name: string;
  iat: number;
  exp: number;
}

interface IReqUser extends Request {
  user?: IUser;
}
export type { IReqUser, IResData, IUser };
