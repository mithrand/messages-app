import * as actions from './chat.actions';

describe('Chat app', () => {
  it('Starts a chat when submiting with enter', () => {
    actions.visitPage();
    actions.type('This is a test{enter}');
    actions.getMessage('This is a test', 'outgoing');
    actions.getMessage('Hello there!', 'incoming');
    actions.getMessage('You said: This is a test', 'incoming');
  });

  it('Starts a chat when submiting with button', () => {
    actions.visitPage();
    actions.type('This is a test');
    actions.getSubmitButton().click();
    actions.getMessage('This is a test', 'outgoing');
    actions.getMessage('Hello there!', 'incoming');
    actions.getMessage('You said: This is a test', 'incoming');
  });

  it('Scroll to last message when history is full', () => {
    actions.visitPage();

    for (let i = 0; i <= 10; i++) {
      actions.type(`This is test message number ${i}{enter}`);
      actions.getMessage(
        `You said: This is test message number ${i}`,
        'incoming',
      );
    }
  });
});
