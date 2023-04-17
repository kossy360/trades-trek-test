import Link from 'next/link';
import { authHttp } from '../http/http';
import {
  EUserSubscriptionStatus,
  IUser,
  IUserProfile,
  IUserProfileResponse,
  IUserSubscription,
  IUserSubscriptionResponse,
} from '../types/user';
import { getSession } from '../utils/get-session';
import styles from './page.module.css';

const AuthWelcome = async (props: { user: IUser }): any => {
  const res = await authHttp.get('user/subscription').json<IUserSubscriptionResponse>();

  if (res.data.status === EUserSubscriptionStatus.active) {
    if (res.data.subscriptionId === 'free_trial') {
      return <p>Free Trial</p>;
    }

    return (
      <>
        <p>Welcome {props.user.firstName}</p>
      </>
    );
  }

  if (res.data.status === EUserSubscriptionStatus.canceled) {
    return <p>Subscription canceled</p>;
  }

  return <p>Subscription expired</p>;
};

const Home = async () => {
  const { user } = await getSession();

  return (
    <main className={styles.main}>
      {user ? (
        <AuthWelcome user={user} />
      ) : (
        <div>
          <Link href="/login">Login</Link> or <Link href="/signup">Sign up</Link>
        </div>
      )}
    </main>
  );
};

export default Home;
