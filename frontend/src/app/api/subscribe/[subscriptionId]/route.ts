import { authApiHttp } from '../../../../http/api-http';

export const PATCH = async (req: Request, ctx: { params: { subscriptionId: string } }) => {
  const res = await authApiHttp.patch(`user/subscription/${ctx.params?.subscriptionId}/subscribe`);

  return new Response(res.body, {
    status: res.statusCode,
    headers: { 'content-type': req.headers.get('content-type') as string },
  });
};
