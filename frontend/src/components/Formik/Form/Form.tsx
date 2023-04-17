'use client';

import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { Form as BsForm, FormProps } from 'react-bootstrap';
import styles from './form.module.scss';

interface IProps extends Omit<FormProps, 'onSubmit'> {
  children: ReactNode;
  className?: string;
  gap?: number;
}

export const Form = (props: IProps) => {
  const form = useFormikContext();

  return (
    <BsForm className={props.className} onSubmit={form.handleSubmit}>
      <div className={styles.wrapper}>{props.children}</div>
    </BsForm>
  );
};
