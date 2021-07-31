import React from 'react';
import {
  ConfirmEmailMutation,
  MeDocument,
  MeQuery,
  useConfirmEmailMutation,
} from '../../generated/graphql';
import { ControllerProps } from '../../types';

export const ConfirmEmailController: React.FC<
  ControllerProps<ConfirmEmailMutation, string>
> = ({ children }) => {
  const [changePassword, { data, loading }] = useConfirmEmailMutation();

  const submit = async (token: string) => {
    return changePassword({
      variables: { token },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.confirmEmail.user,
          },
        });
      },
    });
  };

  return <>{children({ data, loading, submit })}</>;
};
