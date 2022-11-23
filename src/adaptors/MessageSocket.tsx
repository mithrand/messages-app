import { SocketClient } from '@cognigy/socket-client';

import { createMessage, Message, MessageDirection } from '../models/Message';
import { Logger, logger as defaultLogger } from '../lib/logger';

type CognigyMessage = {
  text: string;
  data: any;
};

type Options = {
  baseUrl?: string;
  token?: string;
  logger?: Logger;
};

export class MessageSocket {
  private client: SocketClient | null = null;

  private logger: Logger;

  public isConnected: boolean = false;

  constructor({ baseUrl, token, logger = defaultLogger }: Options) {
    this.logger = logger;

    if (!baseUrl) {
      this.logger.error(
        'MessageSocket - base url is not defined when starting message web socket',
      );
      return;
    }

    if (!token) {
      this.logger.error(
        'MessageSocket - token is not defined when starting message web socket',
      );
      return;
    }

    this.client = new SocketClient(baseUrl, token);
    this.client.on('error', this.onError);
  }

  private onError = ({ message }: { message: string }) =>
    this.logger.error(`Error on MessageSocket - ${message}`);

  public onMessageReceived = (cb: (message: Message) => void) => {
    this.client?.on('output', (botResponse: CognigyMessage) => {
      const message = createMessage(botResponse.text, MessageDirection.incoming);
      cb(message);
    });
  }


  public onStatusChange = (cb: (status: string) => void) =>
    this.client?.on('typingStatus', cb);

  public onFinish = (cb: () => void) => this.client?.on('finalPing', cb);

  public sendMessage = ({ text, ...data }: Message) => {
    if (!this.client) {
      this.logger.error('MessageSocket - client is not initilized');
    }
    this.client?.sendMessage(text, data);
  };

  public connect = (): Promise<void> => {
    if (!this.client) {
      return Promise.reject(
        new Error(
          'MessageSocket - Error connecting to messageSocket, client has not been initilized',
        ),
      );
    }
    return this.client.connect(false);
  };

  public disconnect = () => this.client?.disconnect();
}
