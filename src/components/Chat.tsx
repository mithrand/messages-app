import React from 'react';

import { History } from './History';
import { Message } from './Message';
import { Input } from './Input';
import { useMessages } from '../providers/MessagesProvider';

export const Chat = () => {
  const messages = useMessages();
  return (
    <div
      style={{
        width: 300,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <History>
        {messages.map((message) => (
          <Message direction={message.direction}>{message.text}</Message>
        ))}
      </History>

      {/* TODO: send message on submit */}
      <Input />
    </div>
  );
};
