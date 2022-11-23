import React, {
  createContext,
  FC,
  ReactNode,
  useReducer,
  Dispatch,
  useContext,
} from 'react';
import { noop } from '../../constants';

import { MessageReducer } from './MessagesReducer';
import { Action, State } from './types';

export const StateContext = createContext<State>({
  messages: [],
});

export const DispatchContext = createContext<Dispatch<Action>>(noop);

type Props = {
  children: ReactNode;
};

export const MessagesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(MessageReducer, {
    messages: [],
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useMessages = () => useContext(StateContext).messages;
export const useMessagesDispatch = () => useContext(DispatchContext);
