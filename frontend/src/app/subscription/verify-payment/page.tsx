import { redirect } from 'next/navigation';
import { authHttp } from '../../../http/http';
import { IVerifyPaymentResponse } from '../../../types/payment';
import styles from './page.module.scss';
import { Redirect } from './Redirect';

const Page = async (props: { searchParams: { reference: string; trxref: string } }) => {
  const ref = props.searchParams.reference ?? props.searchParams.trxref;
  const res = await authHttp
    .patch(`payment/${ref}/verify`, { throwHttpErrors: false })
    .json<IVerifyPaymentResponse>();

  setTimeout(() => {
    redirect('/subscription');
  }, 3000);

  return (
    <h2 className={styles.container}>
      <Redirect />
      {res.message}
    </h2>
  );
};

export default Page;
