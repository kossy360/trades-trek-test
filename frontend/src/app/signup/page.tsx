import styles from './page.module.scss';
import { SignupForm } from './SignupForm/SignupForm';

const Page = () => {
  return (
    <div className={styles.container}>
      <h3 className="text-center mb-4">Sign up</h3>
      <SignupForm />
    </div>
  );
};

export default Page;
