import { Message } from '../../models/Message';

export type State = {
  messages: Message[];
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
