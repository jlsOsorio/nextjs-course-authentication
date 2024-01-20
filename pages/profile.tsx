import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

import UserProfile from '../components/profile/user-profile';
import { authOptions } from './api/auth/[...nextauth]';

const ProfilePage = () => {
  return <UserProfile />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user?.email,
    },
  };
}

export default ProfilePage;
