import React from 'react';
import {
  CreateListingMutation,
  useCreateListingMutation,
} from '../../generated/graphql';
import { ControllerProps, ListingFormProps } from '../../types';

export const CreateListingController: React.FC<
  ControllerProps<CreateListingMutation, ListingFormProps, string[]>
> = ({ children }) => {
  const [createListing] = useCreateListingMutation();

  const submit = async (
    values: ListingFormProps,
    photos: string[] | undefined
  ) => {
    return createListing({
      variables: { input: { ...values, photos: photos ?? [] } },
    });
  };

  return <>{children({ submit })}</>;
};
