export const visitPage = () => cy.visit('/');
export const getTextInput = () => cy.get('input[type="text"]');
export const type = (text) => getTextInput().type(text);
export const getSubmitButton = () => cy.get('button').contains('submit');
export const getHistory = () => cy.get('div[role="log"]');
export const getMessage = (text, direction) =>
  getHistory().within(() =>
    cy.contains(text).should('have.class', direction).should('be.visible'),
  );
