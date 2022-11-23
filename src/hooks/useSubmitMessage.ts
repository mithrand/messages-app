import { useMessagesDispatch } from '../providers/MessagesProvider/MessagesProvider';
import { createMessage } from '../models/Message';
import { addMessage } from '../providers/MessagesProvider/MessagesReducer';
import { sendMessage } from '../providers/MessageSocketProvider';

export const useSubmitMessage = () => {
  const dispatch = useMessagesDispatch();
  return (messageText: string) => {
    const message = createMessage(messageText);
    dispatch(addMessage(message));
    sendMessage(message);
  };
};
