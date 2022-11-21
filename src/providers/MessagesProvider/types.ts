import { Message } from '../../types/Message';

export type State = {
  messages: Message[];
};

export type Actions = {
  addMessage(message: Message): void;
};

export enum ActionType {
  addMessage = 'addMessage',
  editMessage = 'editMessage',
  deleteMessage = 'deleteMessage',
}

export type AddMessageAction = {
  type: ActionType.addMessage;
  payload: { message: Message };
};

export type Action = AddMessageAction;
