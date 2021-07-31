import React from 'react';
import { ChangePasswordForm } from '../../types';
import {
  ChangePasswordMutation,
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../../generated/graphql';
import { FetchResult } from '@apollo/client';

interface ChangePasswordControllerProps {
  children: (data: {
    data?: ChangePasswordMutation | null | undefined;
    loading?: boolean;
    submit: ({
      password,
      token,
    }: ChangePasswordForm) => Promise<
      FetchResult<
        ChangePasswordMutation,
        Record<string, any>,
        Record<string, any>
      >
    >;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const ChangePasswordController: React.FC<ChangePasswordControllerProps> =
  ({ children }) => {
    const [changePassword, { data, loading }] = useChangePasswordMutation();

    const submit = async ({ password, token }: ChangePasswordForm) => {
      return changePassword({
        variables: { newPassword: password, token },
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: data?.changePassword.user,
            },
          });
        },
      });
    };

    return <>{children({ data, loading, submit })}</>;
  };
