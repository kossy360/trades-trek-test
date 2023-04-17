import { removeTokenCookie } from '../../../utils/auth-cookie';

export const POST = async () => {
  const res = new Response('Logged out', { status: 200 });

  removeTokenCookie(res);

  return res;
};
