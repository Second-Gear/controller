import React from 'react';
import {
  UpdateListingMutation,
  useUpdateListingMutation,
} from '../../generated/graphql';
import { NullPartial, ListingFormProps, ControllerProps } from '../../types';

export const UpdateListingController: React.FC<
  ControllerProps<UpdateListingMutation, string, NullPartial<ListingFormProps>>
> = ({ children }) => {
  const [updateListing, { error, loading }] = useUpdateListingMutation();

  const submit = async (
    id: string,
    values: NullPartial<ListingFormProps> | undefined
  ) => {
    return updateListing({
      variables: { id, input: { ...values } },
    });
  };

  return <>{children({ error, loading, submit })}</>;
};
