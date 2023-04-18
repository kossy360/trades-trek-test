import { LoginForm } from './LoginForm/LoginForm';
import styles from './page.module.scss';

const Page = async () => {

  return (
    <div className={styles.container}>
      <h3 className='text-center mb-4'>Login</h3>
      <LoginForm />
    </div>
  );
};

export default Page;
