/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */

import { CognigyMessage } from '../adaptors/MessageSocketAdaptor';
import { noop } from '../constants';

export const mockState = { connected: false };
export const mockSendMessage = jest.fn();
export const mockConnect = jest.fn();
export const mockDisconnect = jest.fn();
export let triggerMessageReceived: (message: CognigyMessage) => void = noop;
export let triggerError: (error: { message: string }) => void = noop;
export let triggerStatusChange: (status: string) => void = noop;
export let triggerConnectionFinished: () => void = noop;

export class SocketClient {
  public on(event: string, cb: (...args: any[]) => void): void {
    if (event === 'output') {
      triggerMessageReceived = cb;
      return;
    }

    if (event === 'error') {
      triggerError = cb;
      return;
    }

    if (event === 'typingStatus') {
      triggerStatusChange = cb;
      return;
    }

    if (event === 'finalPing') {
      triggerConnectionFinished = cb;
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
