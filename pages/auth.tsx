import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';

const AuthPage = () => {
  return <AuthForm />;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> {
  const session = await getSession({
    req: context.req,
  });

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
