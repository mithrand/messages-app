import { SocketClient } from '@cognigy/socket-client';

import { createMessage, Message } from '../models/Message';
import { Logger, logger as defaultLogger } from '../lib/logger';

type CognigyMessage = {
  text: string;
  data: any;
};

type Options = {
  baseUrl: string;
  token: string;
  onMessageReceived?: (message: Message) => void;
  onFinish?: () => void;
  onStatusChange?: (status: string) => void;
  logger?: Logger;
};

export class MessageWebSocket {
  private client: SocketClient;

  private logger: Logger;

  private onMessageReceived?: (message: Message) => void;

  private onFinish?: () => void;

  private onStatusChange?: (status: string) => void;

  constructor({
    baseUrl,
    token,
    onMessageReceived,
    onFinish,
    onStatusChange,
    logger = defaultLogger,
  }: Options) {
    this.logger = logger;
    this.client = new SocketClient(baseUrl, token);
    this.onMessageReceived = onMessageReceived;
    this.onFinish = onFinish;
    this.onStatusChange = onStatusChange;
    this.client.on('error', this.onErrorHandler);
    this.client.on('output', this.onMessageReceivedHandler);
    this.client.on('typingStatus', this.OnStatusChangeHandler);
    this.client.on('finalPing', this.onFinishHandler);
  }

  private onMessageReceivedHandler = ({ text, data }: CognigyMessage) => {
    const message = createMessage(text, data.direction);
    this.onMessageReceived!(message);
  };

  private onErrorHandler = ({ message }: { message: string }) =>
    this.logger.error(`Error on clientWebSocket - ${message}`);

  private OnStatusChangeHandler = (status: string) =>
    this.onStatusChange!(status);

  private onFinishHandler = () => this.onFinish!();

  public sendMessage = ({ text, ...data }: Message) =>
    this.client.sendMessage(text, data);
}
