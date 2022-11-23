import React, {
  useEffect,
  FC,
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from 'react';
import { useReceiveMessage } from '../../hooks/useReceiveMessage';
import { messageSocketAdaptor } from '../../adaptors/MessageSocketAdaptor';

type State = {
  isConnected: boolean;
};

const MessageSocketContext = createContext<State>({ isConnected: false });

export const MessageSocketProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const receiveMesssage = useReceiveMessage();

  useEffect(() => {
    messageSocketAdaptor.onMessageReceived(receiveMesssage);
    messageSocketAdaptor.connect().then(() => setIsConnected(true));
    return () => {
      messageSocketAdaptor.disconnect();
    };
  }, []);

  const state = useMemo(
    () => ({
      isConnected,
    }),
    [isConnected],
  );

  return (
    <MessageSocketContext.Provider value={state}>
      {children}
    </MessageSocketContext.Provider>
  );
};

export const useMessageSocketIsConnected = () =>
  useContext(MessageSocketContext).isConnected;
export const { sendMessage } = messageSocketAdaptor;
