import React, { FC, FormEventHandler, useState } from 'react';
import { useSubmitMessage } from '../hooks/useSubmitMessage';
import { useMessageSocketIsConnected } from '../providers/MessageSocketProvider';

export const Input: FC = () => {
  const isConnected = useMessageSocketIsConnected();
  const onSubmit = useSubmitMessage();
  const [message, setMessage] = useState('');
  const [texthasFocus, setTextHasFocus] = useState(false)
  const [buttonHasFocus, setButtonHasFocus] = useState(false)

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
        style={{
          flexGrow: 1,
          padding: 10,
          borderRadius: '4px 0px 0px 4px',
          color: '#2f3941',
          borderColor: texthasFocus ? '#68737d': '#d8dcde',
          borderStyle: 'solid',
          borderWidth: '1px 1px 1px 1px',
          boxSizing: 'border-box',
          height: '40px',
          resize: 'none',
          fontFamily: 'sans-serif',
          outline: 'none',
          transition: 'border 300ms linear, boxShadow 400ms linear',
        }}
      onFocus={() => setTextHasFocus(true)}
      onBlur={() => setTextHasFocus(false)}
      placeholder={isConnected ? 'Type your question here...' : 'connecting with agent'}
      autoFocus
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      disabled={!isConnected}
      />
      <button
        type="submit"
        style={{
          padding: 5,
          fontFamily: 'sans-serif',
          borderRadius: '0px 4px 4px 0px',
          borderColor: buttonHasFocus ? '#68737d': '#d8dcde',
          borderStyle: 'solid',
          borderWidth: '1px 1px 1px 1px',
          outline: 'none',
        }}
        onFocus={() => setButtonHasFocus(true)}
        onBlur={() => setButtonHasFocus(false)}
        disabled={!isConnected}
      >
        submit
      </button>
    </form>
  );
};
