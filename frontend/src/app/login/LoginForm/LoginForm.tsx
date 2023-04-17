'use client';

import { Formik } from 'formik';
import ky, { HTTPError } from 'ky';
import * as yup from 'yup';
import { Form } from '../../../components/Formik/Form/Form';
import { TextInput } from '../../../components/Formik/TextInput/TextInput';
import { SubmitButton } from '../../../components/Formik/SubmitButton/SubmitButton';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IForm {
  email: string;
  password: string;
}

const initialData: IForm = { email: '', password: '' };

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(16).required(),
});

export const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  return (
    <Formik
      initialValues={initialData}
      validationSchema={schema}
      onSubmit={async (values) => {
        try {
          await ky.post('/api/login', { json: values });
          router.replace('/');
          router.refresh();
        } catch (error) {
          setErrorMsg(await (error as HTTPError).response.json().then((res) => res.message));
        }
      }}
    >
      <Form>
        <p className="text-danger mb-0">{errorMsg}</p>
        <TextInput label="Email" name="email" />
        <TextInput label="Password" name="password" type="password" />
        <p>
          New to Trades trek? <Link href="/signup">Sign up</Link>
        </p>
        <SubmitButton>Login</SubmitButton>
      </Form>
    </Formik>
  );
};
