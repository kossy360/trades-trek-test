import { authApiHttp } from '../../../../http/api-http';

export const PATCH = async (req: Request) => {
  const res = await authApiHttp.patch('user/subscription/cancel');

  return new Response(res.body, {
    status: res.statusCode,
    headers: { 'content-type': req.headers.get('content-type') as string },
  });
};
