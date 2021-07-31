import React from 'react';
import {
  ForgotPasswordMutation,
  useForgotPasswordMutation,
} from '../../generated/graphql';
import { ControllerProps, ForgotPasswordProps } from '../../types';

export const ForgotPasswordController: React.FC<
  ControllerProps<ForgotPasswordMutation, ForgotPasswordProps>
> = ({ children }) => {
  const [forgotPassword, { loading }] = useForgotPasswordMutation();

  const submit = async (values: ForgotPasswordProps) => {
    return forgotPassword({
      variables: { email: values.email },
    });
  };

  return <>{children({ loading, submit })}</>;
};
