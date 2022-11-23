import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from 'react';
import { noop } from '../../constants';
import {
  receiveMessageDispatcher,
  submitMessageDispatcher,
} from './dispatchers';
import { MessageReducer } from './MessagesReducer';
import { Actions, State } from './types';
import { useMessageSocket } from './useMessageSocket';

const StateContext = createContext<State>({
  messages: [],
});

const ActionsContext = createContext<Actions>({
  submitMessage: noop,
});

type Props = {
  children: ReactNode;
};

export const MessagesProvider: FC<Props> = ({
  children,
}) => {
  
  const [state, dispatch] = useReducer(MessageReducer, {
    messages: [],
  });

  const receiveMessage = useCallback(
    receiveMessageDispatcher(dispatch),
    [dispatch],
  );

  const { sendMessage } = useMessageSocket({
    onMessageReceived: receiveMessage,
  });

  const actions: Actions = useMemo(
    () => ({
      submitMessage: submitMessageDispatcher(dispatch, sendMessage),
    }),
    [dispatch, sendMessage],
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
export const useSubmitMessage = () => useContext(ActionsContext).submitMessage;
