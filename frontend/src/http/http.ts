import ky from 'ky';
import { cookies } from 'next/headers';
import { getTokenCookie } from '../utils/auth-cookie';

export const http = ky.extend({
  fetch,
  prefixUrl: process.env.API_BASE_URL,
});

export const authHttp = http.extend({
  hooks: {
    beforeRequest: [
      async (req) => {
        const token = getTokenCookie();

        if (token) {
          req.headers.set('Authorization', `Bearer ${token.value}`);
        }
      },
    ],
  },
});
