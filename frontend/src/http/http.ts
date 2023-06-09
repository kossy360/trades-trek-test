import ky from 'ky';
import { getTokenCookie } from '../utils/auth-cookie';

export const authHttp = ky.extend({
  fetch,
  prefixUrl: process.env.API_BASE_URL,
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
