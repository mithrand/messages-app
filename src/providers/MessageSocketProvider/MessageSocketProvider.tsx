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
import { MessageSocketAdaptor } from '../../adaptors/MessageSocketAdaptor';

const { REACT_APP_ENDPOINT_BASE_URL, REACT_APP_ENDPOINT_URL_TOKEN } =
  process.env;
  
export const messageSocketAdaptor = new MessageSocketAdaptor({
  baseUrl: REACT_APP_ENDPOINT_BASE_URL,
  token: REACT_APP_ENDPOINT_URL_TOKEN,
});

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
