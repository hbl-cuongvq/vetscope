import * as React from 'react';

export const navigationRef = React.createRef(null);

export let isReadyRef = false;

export const setIsReadyRef = (value) => {
  isReadyRef = value;
};

export function navigate(name, params) {
  if (isReadyRef && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // decide what to do if the app hasn't mounted
    // ignore this, or add these actions to a queue you can call later
  }
}
