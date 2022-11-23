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
        padding: '16px',
        borderRadius: '16px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 0.428571rem 0px',
        fontFamily: 'sans-serif',
      }}
    >
      <History>
        {messages.map((message) => (
          <Message
            key={message.id}
            direction={message.direction}
            id={message.id}
          >
            {message.text}
          </Message>
        ))}
      </History>
      <Input />
    </div>
  );
};
