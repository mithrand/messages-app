import React, { FC, ReactNode } from 'react';

type MessageDirection = 'incoming' | 'outgoing';

interface MessageProps {
  direction: MessageDirection;
  children: ReactNode;
}

export const Message: FC<MessageProps> = ({ children, direction }) => (
  <div
    style={{
      alignSelf: direction === 'incoming' ? 'flex-start' : 'flex-end',
      border: '1px solid black',
      padding: 5,
      borderRadius: 5,
    }}
  >
    {children}
  </div>
);
