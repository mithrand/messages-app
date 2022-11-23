// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { SocketClient } from './src/__mocks__/SocketClient';

jest.mock('@cognigy/socket-client', () => ({ SocketClient }));

process.env.REACT_APP_ENDPOINT_URL_TOKEN = 'token';
process.env.REACT_APP_ENDPOINT_BASE_URL = 'url';

window.scrollTo = jest.fn();
