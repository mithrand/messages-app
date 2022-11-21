import { v4 as uuidv4 } from 'uuid';

import { useAddMessage } from '../providers/MessagesProvider';
import { MessageDirection } from '../types/Message';

export const useSubmitMessage = () => {
  const addMessage = useAddMessage();
  return (message: string) => {
    addMessage({
      text: message,
      direction: MessageDirection.outgoing,
      id: uuidv4(),
    });
  };
};
