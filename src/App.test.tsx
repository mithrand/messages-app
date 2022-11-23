import React from 'react';
import {
  render as renderRtl,
  screen,
  within,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  mockConnect,
  mockSendMessage,
  triggerMessageReceived,
} from './__mocks__/SocketClient';

import App from './App';

const getTextInput = () => screen.getByRole('textbox');
const typeMessage = (text: string) => userEvent.type(getTextInput(), text);
const getSubmitButton = () => screen.getByText(/submit/i);
const withinMessages = () => within(screen.getByRole('log'));
const waitForChatToBeEnabled = async () =>
  waitFor(() => expect(getTextInput()).not.toBeDisabled());
const render = async () => {
  renderRtl(<App />);
  await waitForChatToBeEnabled();
};

describe('Chat app', () => {
  beforeEach(() => {
    mockConnect.mockResolvedValue(true);
    mockSendMessage.mockImplementation((text: string, data: any) =>
      // for simplify testming bot will always respond back "You said: ..."
      triggerMessageReceived({ text: `You said: ${text}`, ...data }),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renders the app', async () => {
    await render();
    const submitButton = getSubmitButton();
    expect(submitButton).toBeInTheDocument();
  });

  it('Sends a message when click submit', async () => {
    await render();
    await typeMessage('this is a test message');
    const submitButton = getSubmitButton();
    await userEvent.click(submitButton);
    const textMessage = withinMessages().getByText('this is a test message');
    expect(textMessage).toBeInTheDocument();
  });

  it('Sends a message when pressing enter in text area', async () => {
    await render();
    await typeMessage('this is a test message{enter}');
    const textMessage = withinMessages().getByText('this is a test message');
    expect(textMessage).toBeInTheDocument();
  });

  it('Receives messages from cognigy and show them in the chat', async () => {
    await render();
    await typeMessage('this is a test message{enter}');
    const sendMessage = withinMessages().getByText('this is a test message');
    const responseMessage = withinMessages().getByText(
      'You said: this is a test message',
    );
    expect(sendMessage).toBeInTheDocument();
    expect(responseMessage).toBeInTheDocument();
  });

  it('Disables inputs while connecting to chat', async () => {
    renderRtl(<App />);
    const textInput = getTextInput();
    const submitButton = getSubmitButton();

    expect(textInput).toBeDisabled();
    expect(submitButton).toBeDisabled();

    await waitForChatToBeEnabled();

    expect(textInput).toBeEnabled();
    expect(submitButton).toBeEnabled();
  });
});
