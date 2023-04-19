import got from 'got';
import { getTokenCookie } from '../utils/auth-cookie';

export const apiHttp = got.extend({
  prefixUrl: process.env.API_BASE_URL,
});

export const authApiHttp = apiHttp.extend({
  hooks: {
    beforeRequest: [
      async (opts) => {
        const token = getTokenCookie();

        if (token) {
          opts.headers.Authorization = `Bearer ${token.value}`;
        }
      },
    ],
  },
});
