import React, { FC, ReactNode } from 'react';

import { Message as MessageType, MessageDirection } from '../models/Message';

type Props = {
  children: ReactNode;
} & Omit<MessageType, 'text'>;

export const Message: FC<Props> = ({ children, direction }) => {
  const isIncomming = direction === MessageDirection.incoming;
  return (
    <div
      style={{
        alignSelf: isIncomming ? 'flex-start' : 'flex-end',
        border: '0px solid black',
        padding: '5px 15px 5px 15px',
        borderRadius: isIncomming ? '0px 5px 5px 5px' : '5px 5px 0px 5px',
        margin: '5px 0px',
        color: '#2f3941',
        backgroundColor: isIncomming ? '#eee' : '#d9fdd3',
        boxShadow: '#0d2c4029 1px 1px 1px',
        fontSize: '14px',
        lineHeight: '20px',
      }}
      className={
        isIncomming ? MessageDirection.incoming : MessageDirection.outgoing
      }
    >
      {children}
    </div>
  );
};
