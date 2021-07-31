import React from 'react';
import {
  CancelReservationMutation,
  useCancelReservationMutation,
} from '../../generated/graphql';
import { ControllerProps } from '../../types';

export const CancelReservationController: React.FC<
  ControllerProps<CancelReservationMutation, string>
> = ({ children }) => {
  const [cancelReservation, { loading }] = useCancelReservationMutation();

  const submit = async (id: string) => {
    return cancelReservation({
      variables: {
        id,
      },
      update: (cache) => {
        cache.evict({ id: 'Reservation:' + id });
        cache.gc();
      },
    });
  };

  return <>{children({ loading, submit })}</>;
};
