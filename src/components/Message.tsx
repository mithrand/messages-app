import React, { FC, ReactNode } from 'react';

import type { Message as MessageType } from '../models/Message';

type Props = {
  children: ReactNode;
} & Omit<MessageType, 'text'>;

export const Message: FC<Props> = ({ children, direction }) => (
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
