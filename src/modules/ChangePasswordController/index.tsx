import React from 'react';
import { ChangePasswordForm, ControllerProps } from '../../types';
import {
  ChangePasswordMutation,
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../../generated/graphql';

export const ChangePasswordController: React.FC<
  ControllerProps<ChangePasswordMutation, ChangePasswordForm>
> = ({ children }) => {
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
