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
        padding: 10,
        flexGrow: 1,
        overflow: 'auto',
        marginBottom: '10px',
        borderRadius: '8px 8px 0px 0px',
      }}
    >
      {children}
    </div>
  );
}
