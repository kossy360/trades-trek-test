'use client';
import { Field, FieldProps } from 'formik';
import { Form } from 'react-bootstrap';
import { FormErrorMsg } from '../FormErrorMsg/FormErrorMsg';

interface IProps {
  name: string;
  placeholder?: string;
  label: string;
  as?: 'input' | 'textarea';
  className?: string;
  disabled?: boolean;
  type?: string;
}

export const TextInput = (props: IProps) => {
  return (
    <Field name={props.name}>
      {/* <p>something</p> */}
      {({ field, meta }: FieldProps) => {
        return (
          <Form.Group controlId={props.name}>
            <Form.Label className={props.className ?? 'fw-bold'}>{props.label}</Form.Label>
            <Form.Control
              {...field}
              as={props.as}
              placeholder={props.placeholder}
              isInvalid={meta.touched && !!meta.error}
              disabled={props.disabled}
              type={props.type}
            />
            <FormErrorMsg name={props.name} />
          </Form.Group>
        );
      }}
    </Field>
  );
};
