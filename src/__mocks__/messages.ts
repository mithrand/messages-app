import { createMessage, Message, MessageDirection } from '../models/Message';

export const mockMessages: Message[] = [
  createMessage('hello user', MessageDirection.incoming),
  createMessage('hello bot'),
];
