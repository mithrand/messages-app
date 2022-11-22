/* eslint-disable no-console */

export type Logger = {
  error(...data: any): void;
  info(...data: any): void;
  debug(...data: any): void;
  warn(...data: any): void;
};

export const logger: Logger = {
  error: console.error,
  info: console.info,
  debug: console.debug,
  warn: console.warn,
};
