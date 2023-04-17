import { authHttp } from '../../../../http/http';

export const PATCH = async (req: Request, ctx: { params: { subscriptionId: string } }) => {
  const res = await authHttp.patch('user/subscription/cancel');

  return new Response(await res.text(), {
    status: res.status,
    headers: { 'content-type': req.headers.get('content-type') as string },
  });
};
