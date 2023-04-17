'use client';
import { useField } from 'formik';

export const FormErrorMsg = (props: { name: string }) => {
  const [, meta] = useField(props.name);

  if (!!meta.touched && meta.error) {
    return (
      <p className="invalid-feedback" style={{ display: 'block' }}>
        {meta.error}
      </p>
    );
  }

  return null;
};
