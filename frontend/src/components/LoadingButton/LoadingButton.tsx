import classNames from 'classnames';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';
import styles from './loadingButton.module.scss';

interface IProps extends ButtonProps {
  children: string;
  isLoading: boolean;
}

export const LoadingButton = (props: IProps) => {
  const { children, isLoading, ...restProps } = props;

  return (
    <Button  {...restProps} className={classNames(styles.button, restProps.className)}>
      {isLoading && (
        <div className={styles.spinner}>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        </div>
      )}
      <span className={styles.content} data-loading={isLoading}>
        {children}
      </span>
    </Button>
  );
};
