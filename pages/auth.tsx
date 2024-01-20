import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import AuthForm from '../components/auth/auth-form';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const AuthPage = () => {
  return <AuthForm />;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/profile',
      },
    };
  }

  return {
    props: {},
  };
}

export default AuthPage;
