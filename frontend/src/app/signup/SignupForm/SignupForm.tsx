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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialData: IForm = { firstName: '', lastName: '', email: '', password: '' };

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(16).required(),
});

export const SignupForm = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  return (
    <Formik
      initialValues={initialData}
      validationSchema={schema}
      onSubmit={async (values) => {
        try {
          await ky.post('/api/signup', { json: values });
          router.replace('/');
          router.refresh();
        } catch (error) {
          setErrorMsg(await (error as HTTPError).response.json().then((res) => res.message));
        }
      }}
    >
      <Form>
        <p className="text-danger mb-0">{errorMsg}</p>
        <TextInput label="First name" name="firstName" />
        <TextInput label="Last name" name="lastName" />
        <TextInput label="Email" name="email" />
        <TextInput label="Password" name="password" type="password" />
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
        <SubmitButton>Create Account</SubmitButton>
      </Form>
    </Formik>
  );
};
