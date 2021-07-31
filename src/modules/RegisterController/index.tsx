import React from 'react';
import { ControllerProps, RegisterFormProps } from '../../types';
import {
  MeDocument,
  MeQuery,
  RegisterMutation,
  useRegisterMutation,
} from '../../generated/graphql';

export const RegisterController: React.FC<
  ControllerProps<RegisterMutation, RegisterFormProps>
> = ({ children }) => {
  const [register, { data, loading }] = useRegisterMutation();

  const submit = async (values: RegisterFormProps) => {
    return register({
      variables: { ...values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.register.user,
          },
        });
      },
    });
  };

  return <>{children({ data, loading, submit })}</>;
};
