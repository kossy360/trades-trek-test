import { http } from '../../../http/http';
import { IUserAuthResponse } from '../../../types/user';
import { setTokenCookie } from '../../../utils/auth-cookie';
import { errorToResponse } from '../../../utils/handle-error';

export const POST = async (request: Request) => {
  try {
    const payload = await request.json();
    const res = await http.post('auth/login', { json: payload }).json<IUserAuthResponse>();
    const response = new Response('Login success', { status: 200 });

    setTokenCookie(response, res);

    return response;
  } catch (error) {
    return errorToResponse(error);
  }
};
