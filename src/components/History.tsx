import React, { FC, ReactNode } from 'react';

export const History: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    role="log"
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
