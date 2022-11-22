import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

const getTextInput = () => screen.getByRole('textbox');
const typeMessage = (text: string) => userEvent.type(getTextInput(), text);
const getSubmitButton = () => screen.getByText(/submit/i);
const withinMessages = () => within(screen.getByRole('log'));

describe('Invite App', () => {
  
  it('Renders the app', () => {
    render(<App />);
    const submitButton = getSubmitButton();
    expect(submitButton).toBeInTheDocument();
  });

  it('Reads message from provider', async () => {
    render(<App />);
    const outcommingMessage = withinMessages().getByText('hello user');
    const incommingMessage = withinMessages().getByText('hello bot');
    expect(outcommingMessage).toBeInTheDocument();
    expect(incommingMessage).toBeInTheDocument();
  });

  it('Sends a message when click submit', async () => {
    render(<App />);
    await typeMessage('this is a test message');
    const submitButton = getSubmitButton();
    await userEvent.click(submitButton);
    const textMessage = withinMessages().getByText('this is a test message');
    expect(textMessage).toBeInTheDocument();
  });

  it('Sends a message when pressing enter in text area', async () => {
    render(<App />);
    await typeMessage('this is a test message{enter}');
    const textMessage = withinMessages().getByText('this is a test message');
    expect(textMessage).toBeInTheDocument();
  });

});
