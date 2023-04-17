import { authHttp } from '../http/http';
import { IUser, IUserProfileResponse } from '../types/user';

interface IUserSession {
  isAuthenticated: boolean;
  user: IUser | null;
}

export const getSession = async (): Promise<IUserSession> => {
  try {
    const res = await authHttp.get('user/profile').json<IUserProfileResponse>();

    return { isAuthenticated: true, user: res.data.user };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
};
