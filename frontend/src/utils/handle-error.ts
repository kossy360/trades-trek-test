import { HTTPError as KyError } from 'ky';
import { HTTPError as GotError } from 'got';

export const errorToResponse = async (error: unknown) => {
  let message = 'Server Error';
  let status = 500;

  if (error instanceof KyError) {
    const response = await error.response.json();

    message = response.message;
    status = error.response.status;
  }

  if (error instanceof GotError) {
    const response = await JSON.parse(error.response.body as string);

    message = response.message;
    status = error.response.statusCode;
  }

  return new Response(JSON.stringify({ success: false, message }), { status });
};
