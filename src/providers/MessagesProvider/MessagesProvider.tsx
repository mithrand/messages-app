import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { noop } from '../../constants';
import { Message } from '../../types/Message';
import { addMessage, MessageReducer } from './MessagesReducer';
import { Actions, State } from './types';
import { mockMessages } from './__mocks__/messages';

const StateContext = createContext<State>({
  messages: [],
});

const ActionsContext = createContext<Actions>({
  addMessage: noop,
});

type Props = {
  children: ReactNode;
  previousMessages?: Message[];
};

export const MessagesProvider: FC<Props> = ({
  children,
  previousMessages = [],
}) => {
  const [state, dispatch] = useReducer(MessageReducer, {
    messages: [...previousMessages, ...mockMessages],
  });

  const actions: Actions = useMemo(
    () => ({
      addMessage: (message: Message) => dispatch(addMessage(message)),
    }),
    [dispatch],
  );

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  );
};

export const useMessages = () => useContext(StateContext).messages;
export const useAddMessage = () => useContext(ActionsContext).addMessage;
