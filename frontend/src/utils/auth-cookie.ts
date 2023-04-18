import { serialize } from 'cookie';
import { cookies } from 'next/headers';
import { IUserAuthResponse } from '../types/user';

const tokenKey = 'trades-trek-token';

export const setTokenCookie = (res: Response, data: IUserAuthResponse) => {
  const cookie = serialize(tokenKey, data.data.token, {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 5 - 60,
  });

  res.headers.set('Set-Cookie', cookie);
};

export const removeTokenCookie = (res: Response) => {
  const cookie = serialize(tokenKey, '', {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: -1,
  });

  res.headers.set('Set-Cookie', cookie);
};

export const getTokenCookie = () => {
  const token = cookies().get(tokenKey);

  return token;
};
