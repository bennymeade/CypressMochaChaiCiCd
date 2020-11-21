// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


Cypress.Commands.add('generateCurrentDate', () => {
    var d = new Date();
    var datestring = d.getFullYear() + "-" + (d.getMonth()+1); // generates current date
    return cy.wrap(datestring);
})

Cypress.Commands.add('generateEmailAddress', () => {
    var emailAddress = 'testEmail-' + Math.random().toString(36).substr(2, 16) + '@mail.com';
    return cy.wrap(emailAddress);
})