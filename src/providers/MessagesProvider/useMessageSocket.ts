import { useEffect, useState } from 'react';
import { Message } from '../../models/Message';
import { MessageSocket } from '../../adaptors/MessageSocket';

const { REACT_APP_ENDPOINT_BASE_URL, REACT_APP_ENDPOINT_URL_TOKEN } = process.env;

const messageSocketClient = new MessageSocket({
  baseUrl: REACT_APP_ENDPOINT_BASE_URL,
  token: REACT_APP_ENDPOINT_URL_TOKEN,
});

export const useMessageSocket = ({
  onMessageReceived,
}: {
  onMessageReceived: (message: Message) => void;
}) => {
  const { sendMessage } = messageSocketClient;
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    messageSocketClient.onMessageReceived(onMessageReceived);
    messageSocketClient.connect().then(() => setIsConnected(true));
    return () => {
      messageSocketClient.disconnect();
    };
  }, []);

  return { isConnected, sendMessage };
};
