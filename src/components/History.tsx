import React, { FC, ReactNode, useRef } from 'react';
import { useScrollToBotonOnNewMessage } from '../hooks/useScrollOnNewMessage';

export const History: FC<{ children: ReactNode }> = ({ children }) => {

  const divRef = useRef<HTMLDivElement>(null)

  useScrollToBotonOnNewMessage(divRef)

  return (
    <div
      role="log"
      ref={divRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid black',
        padding: 10,
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
}
