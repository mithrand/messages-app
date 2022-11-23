import { createMessage } from '../models/Message';
import { triggerError } from '../__mocks__/SocketClient';

import { MessageSocketAdaptor } from './MessageSocketAdaptor';

jest.spyOn(console, 'error');

describe('MessageSocketAdaptor', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('logs an error if configured with wrong base url', async () => {
    const adaptor = new MessageSocketAdaptor({
      baseUrl: '',
      token: 'token',
      logger: console,
    });
    expect(adaptor).toBeDefined();
    expect(console.error).toHaveBeenCalledWith(
      'MessageSocket - base url is not defined when starting message web socket',
    );
  });

  it('logs an error if configured with wrong base url', async () => {
    const adaptor = new MessageSocketAdaptor({
      baseUrl: 'baseurl',
      token: '',
      logger: console,
    });
    expect(adaptor).toBeDefined();
    expect(console.error).toHaveBeenCalledWith(
      'MessageSocket - token is not defined when starting message web socket',
    );
  });

  it('logs an error when websocker fires an error', async () => {
    const adaptor = new MessageSocketAdaptor({
      baseUrl: 'baseurl',
      token: 'token',
      logger: console,
    });
    expect(adaptor).toBeDefined();
    triggerError(new Error('this is a test error'));
    expect(console.error).toHaveBeenCalledWith(
      'Error on MessageSocket - this is a test error',
    );
  });

  it('logs an error when sending message and client is not initialized', async () => {
    const adaptor = new MessageSocketAdaptor({
      baseUrl: '',
      token: '',
      logger: console,
    });
    adaptor.sendMessage(createMessage('this is a test message'));
    expect(console.error).toHaveBeenCalledWith(
      'MessageSocket - base url is not defined when starting message web socket',
    );
    expect(console.error).toHaveBeenCalledWith(
      'MessageSocket - client is not initilized',
    );
  });

  it('logs an error when connecting and client is not initialized', async () => {
    const adaptor = new MessageSocketAdaptor({
      baseUrl: '',
      token: '',
      logger: console,
    });

    try {
      await adaptor.connect();
      throw new Error('function triggered');
    } catch (err) {
      expect((err as Error).message).toBe(
        'MessageSocket - Error connecting to messageSocket, client has not been initilized',
      );
    }
  });
});
