import React from 'react';
import {
  ConfirmEmailMutation,
  MeDocument,
  MeQuery,
  useConfirmEmailMutation,
} from '../../generated/graphql';
import { FetchResult } from '@apollo/client';

interface ConfirmEmailControllerProps {
  children: (data: {
    data?: ConfirmEmailMutation | null | undefined;
    loading?: boolean;
    submit: (
      token: string
    ) => Promise<
      FetchResult<
        ConfirmEmailMutation,
        Record<string, any>,
        Record<string, any>
      >
    >;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const ConfirmEmailController: React.FC<ConfirmEmailControllerProps> = ({
  children,
}) => {
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
