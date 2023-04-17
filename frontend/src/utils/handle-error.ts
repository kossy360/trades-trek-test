import { HTTPError } from 'ky';

export const errorToResponse = async (error: unknown) => {
  let message = 'Server Error';
  let status = 500;

  if (error instanceof HTTPError) {
    const response = await error.response.json();

    message = response.message;
    status = error.response.status;
  }

  return new Response(JSON.stringify({ success: false, message }), { status });
};
