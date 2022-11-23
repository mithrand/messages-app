import React, { FC, FormEventHandler, useState } from 'react';
import { useSubmitMessage } from '../hooks/useSubmitMessage';
import { useMessageSocketIsConnected } from '../providers/MessageSocketProvider';

export const Input: FC = () => {
  const isConnected = useMessageSocketIsConnected();
  const onSubmit = useSubmitMessage();
  const [message, setMessage] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (message !== '') {
      setMessage('');
      onSubmit(message);
    }
  };

  return (
    <form
      style={{ display: 'flex', alignItems: 'stretch' }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        style={{ flexGrow: 1, border: '1px solid black', padding: 5 }}
        placeholder={isConnected ? 'type here' : 'connecting with agent'}
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!isConnected}
      />
      <button
        type="submit"
        style={{ border: '1px solid black', padding: 5 }}
        disabled={!isConnected}
      >
        submit
      </button>
    </form>
  );
};
