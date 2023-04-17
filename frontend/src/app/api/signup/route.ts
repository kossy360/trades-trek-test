import { NextResponse } from 'next/server';
import { http } from '../../../http/http';
import { IUserAuthResponse } from '../../../types/user';
import { setTokenCookie } from '../../../utils/auth-cookie';
import { HTTPError } from 'ky';
import { errorToResponse } from '../../../utils/handle-error';

export const POST = async (request: Request) => {
  try {
    const payload = await request.json();
    const res = await http.post('auth/signup', { json: payload }).json<IUserAuthResponse>();
    const response = new Response('Signup success', { status: 200 });

    setTokenCookie(response, res);

    return response;
  } catch (error) {
    return errorToResponse(error);
  }
};