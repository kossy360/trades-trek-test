
import { authHttp } from '../../../http/http';
import { IVerifyPaymentResponse } from '../../../types/payment';
import styles from './page.module.scss';
import { Redirect } from './Redirect';

const Page = async (props: { searchParams: { reference: string; trxref: string } }) => {
  const ref = props.searchParams.reference ?? props.searchParams.trxref;
  const res = await authHttp
    .patch(`payment/${ref}/verify`, { throwHttpErrors: false })
    .json<IVerifyPaymentResponse>();

  return (
    <div className={styles.container}>
      <Redirect />
      <h2>{res.message}</h2>
      <p>redirecting...</p>
    </div>
  );
};

export default Page;
