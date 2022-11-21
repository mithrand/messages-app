import { v4 as uuidv4 } from 'uuid';

import { Message, MessageDirection } from '../../../types/Message';

export const mockMessages: Message[] = [
  {
    direction: MessageDirection.incoming,
    text: 'hello user',
    id: uuidv4(),
  },
  {
    direction: MessageDirection.outgoing,
    text: 'hello bot',
    id: uuidv4(),
  },
];
