import { useFormikContext } from 'formik';
import { ButtonProps } from 'react-bootstrap';
import { LoadingButton } from '../../LoadingButton/LoadingButton';

interface IProps extends ButtonProps {
  children: string;
}

export const SubmitButton = (props: IProps) => {
  const { children, ...restProps } = props;
  const form = useFormikContext();

  return (
    <LoadingButton {...restProps} type={props.type ?? 'submit'} isLoading={form.isSubmitting}>
      {children}
    </LoadingButton>
  );
};
