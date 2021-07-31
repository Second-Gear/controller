import React from 'react';
import {
  CreateMessageMutation,
  useCreateMessageMutation,
} from '../../generated/graphql';
import { ControllerProps, MessageFormProps } from '../../types';

export const CreateMessageController: React.FC<
  ControllerProps<CreateMessageMutation, MessageFormProps>
> = ({ children }) => {
  const [createMessage] = useCreateMessageMutation();

  const submit = async (values: MessageFormProps) => {
    return createMessage({
      variables: {
        input: {
          ...values,
        },
      },
      optimisticResponse: {
        createMessage: {
          __typename: 'Message',
          createdAt: new Date().toUTCString(),
          creator: {
            id: 'temp-id',
            __typename: 'User',
            name: 'User',
            photoUrl: 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3',
            createdAt: Math.floor(new Date().getTime() / 1000).toString(),
          },
          headerId: values.headerId,
          id: 'temp-id',
          isFromSender: values.isFromSender,
          text: values.text,
        },
      },
    });
  };

  return <>{children({ submit })}</>;
};
