import { SocketClient } from '@cognigy/socket-client';

import { createMessage, Message, MessageDirection } from '../models/Message';
import { Logger, logger as defaultLogger } from '../lib/logger';

export type CognigyMessage = {
  text: string;
  data: any;
};

type Options = {
  baseUrl?: string;
  token?: string;
  logger?: Logger;
};

export interface IMessageSocketAdaptor {
  onMessageReceived(cb: (message: Message) => void): void;
  sendMessage({ text, ...data }: Message): void;
  connect(): Promise<void>;
  disconnect(): void;
  isConnected(): boolean; 
}

export class MessageSocketAdaptor implements  IMessageSocketAdaptor {
  private client: SocketClient | null = null;

  private logger: Logger;

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
    this.client?.on('output', (socketMessage: CognigyMessage) => {
      const message = createMessage(
        socketMessage.text,
        MessageDirection.incoming,
      );
      cb(message);
    });
  };

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
    return this.client.connect(true);
  };

  public disconnect = (): void => {
    this.client?.disconnect();
  };

  public isConnected = (): boolean => this.client?.connected || false;
}
