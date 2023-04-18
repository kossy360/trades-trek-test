import './globals.scss';
import Link from 'next/link';
import { LogoutButton } from '../components/LogoutButton/LogoutButton';
import { getSession } from '../utils/get-session';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Trades trek',
  description: 'Trades trek test',
};

const RootLayout = async (props: { children: React.ReactNode }) => {
  const { isAuthenticated } = await getSession();

  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.topBar}>
          <div className={styles.navButtons}>
            <Link href="/">Home</Link>
            {isAuthenticated && <Link href="/subscription">Subscriptions</Link>}
          </div>
          <div className={styles.navButtons}>
            {isAuthenticated ? (
              <LogoutButton />
            ) : (
              <>
                <Link href="/login">Login </Link>
                <Link href="/signup">Sign up</Link>
              </>
            )}
          </div>
        </div>
        <div className={styles.content}>{props.children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
