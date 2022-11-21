import { useAddMessage } from '../providers/MessagesProvider';
import { createMessage } from '../models/Message';

export const useSubmitMessage = () => {
  const addMessage = useAddMessage();
  return (messageText: string) => {
    const message = createMessage(messageText);
    addMessage(message);
  };
};
