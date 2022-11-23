import { Dispatch } from 'react';
import { createMessage, Message } from '../../models/Message';
import { addMessage } from './MessagesReducer';
import { Action } from './types';

export const submitMessageDispatcher =
  (dispatch: Dispatch<Action>, sendMessage: (message: Message) => void) =>
  (messageText: string) => {
    const message = createMessage(messageText);
    sendMessage(message);
    dispatch(addMessage(message));
  };

export const receiveMessageDispatcher =
  (dispatch: Dispatch<Action>) => (message: Message) => {
    dispatch(addMessage(message));
  };
