export enum MessageDirection {
  incoming = 'incoming',
  outgoing = 'outgoing',
}

export type Message = {
  direction: MessageDirection;
  text: string;
  id: string;
};
