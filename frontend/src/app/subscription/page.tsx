import { authHttp } from '../../http/http';
import { IGetSubscriptionsResponse, ISubscription } from '../../types/subscription';
import {
  EUserSubscriptionStatus,
  IUserProfileResponse,
  IUserSubscription,
  IUserSubscriptionResponse,
} from '../../types/user';
import { getSession } from '../../utils/get-session';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';
import classNames from 'classnames';
import { SubscribeButton } from './ActionButtons/SubscribeButton';
import { CancelButton } from './ActionButtons/CancelButton';

const Card = (props: { subscription: ISubscription; userSub: IUserSubscription }) => {
  const isFree = props.subscription.id === 'free_trial';
  const isActive = props.userSub.status === EUserSubscriptionStatus.active;
  const isSubscribed = props.userSub.subscriptionId === props.subscription.id;

  return (
    <div className={classNames('card', 'text-center', styles.card)}>
      <div className="card-header">{props.subscription.price}</div>
      <div className="card-body">
        <h5 className="card-title">{props.subscription.name}</h5>
        <p className="card-text">{props.subscription.description}</p>
        {!isFree && isSubscribed && (
          <p>
            Status: <strong>{props.userSub.status}</strong>
          </p>
        )}
        {!(isSubscribed && isActive) && !isFree && (
          <SubscribeButton subscriptionId={props.subscription.id} />
        )}
        {isSubscribed && isActive && !isFree && <CancelButton />}
      </div>
      <div className="card-footer text-muted">{props.subscription.duration} days</div>
    </div>
  );
};

const Page = async () => {
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) {
    redirect('/');
  }

  const [subscriptions, userSub] = await Promise.all([
    authHttp
      .get('subscription')
      .json<IGetSubscriptionsResponse>()
      .then((res) => res.data),
    authHttp
      .get('user/subscription')
      .json<IUserSubscriptionResponse>()
      .then((res) => res.data),
  ]);

  return (
    <div>
      <div className={styles.container}>
        {subscriptions.map((subscription) => {
          return <Card key={subscription.id} subscription={subscription} userSub={userSub} />;
        })}
      </div>
    </div>
  );
};

export default Page;
