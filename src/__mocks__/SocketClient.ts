/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */

import { CognigyMessage } from '../adaptors/MessageSocketAdaptor';
import { noop } from '../constants';

export const mockState = { connected: false };
export const mockSendMessage = jest.fn();
export const mockConnect = jest.fn();
export const mockDisconnect = jest.fn();
export let mockOnMessageReceived: (message: CognigyMessage) => void = noop;
export let mockOnError: (error: { message: string }) => void = noop;
export let mockOnStatusChange: (status: string) => void = noop;
export let mockConnectionFinished: () => void = noop;

export class SocketClient {
  public on(event: string, cb: (...args: any[]) => void): void {
    if (event === 'output') {
      mockOnMessageReceived = cb;
      return;
    }

    if (event === 'error') {
      mockOnError = cb;
      return;
    }

    if (event === 'typingStatus') {
      mockOnStatusChange = cb;
      return;
    }

    if (event === 'finalPing') {
      mockConnectionFinished = cb;
    }
  }

  public sendMessage(text: string, data: any) {
    return mockSendMessage(text, data);
  }

  public connect() {
    return mockConnect();
  }

  public disconnect() {
    return mockDisconnect();
  }

  public get connected() {
    return mockState.connected;
  }
}
