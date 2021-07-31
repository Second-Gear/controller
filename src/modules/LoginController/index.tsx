import React from 'react';
import { AuthFormProps, ControllerProps } from '../../types';
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from '../../generated/graphql';

export const LoginController: React.FC<
  ControllerProps<LoginMutation, AuthFormProps>
> = ({ children }) => {
  const [login, { data, loading }] = useLoginMutation();

  const submit = async (values: AuthFormProps) => {
    return login({
      variables: { ...values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.login.user,
          },
        });
      },
    });
  };

  return <>{children({ data, loading, submit })}</>;
};
