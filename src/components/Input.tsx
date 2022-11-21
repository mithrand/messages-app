import React, { FC, FormEventHandler, useState } from 'react';
import { useSubmitMessage } from '../hooks';

export const Input: FC = () => {
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
        placeholder="type here"
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" style={{ border: '1px solid black', padding: 5 }}>
        submit
      </button>
    </form>
  );
};
