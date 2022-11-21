import { v4 as uuidv4 } from 'uuid';

export enum MessageDirection {
  incoming = 'incoming',
  outgoing = 'outgoing',
}

export type Message = {
  direction: MessageDirection;
  text: string;
  id: string;
};

export const createMessage = (
  text: string,
  direction: MessageDirection = MessageDirection.outgoing,
): Message => ({
  text,
  direction,
  id: uuidv4(),
});
