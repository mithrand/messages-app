import { useMessagesDispatch } from '../providers/MessagesProvider/MessagesProvider';
import { Message } from '../models/Message';
import { addMessage } from '../providers/MessagesProvider/MessagesReducer';

export const useReceiveMessage = () => {
  const dispatch = useMessagesDispatch();
  return (message: Message) => {
    dispatch(addMessage(message));
  };
};
