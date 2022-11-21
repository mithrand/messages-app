import { Message } from '../../types/Message';
import { Action, ActionType, AddMessageAction, State } from './types';

export const addMessage = (message: Message): AddMessageAction => ({
  type: ActionType.addMessage,
  payload: { message },
});

export const MessageReducer = (state: State, action: Action): State => {
  const { type } = action;
  switch (type) {
    case ActionType.addMessage: {
      return {
        ...state,
        messages: [
          ...state.messages,
          (action as AddMessageAction).payload.message,
        ],
      };
    }
    default: {
      return state;
    }
  }
};
