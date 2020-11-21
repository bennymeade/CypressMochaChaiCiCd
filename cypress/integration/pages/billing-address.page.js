// @ts-nocheck
import Base from './base.page';

const nameText = '[id="snip-name"]'
const streetAddressText = '[id="snip-address1"]'
const cityText = '[id="snip-city"]'
const postalCodeText = '[id="snip-postalCode"]'
const emailText = '[id="snip-email"]'

class BillingAddress extends Base {

    submitBillingAddressDetails(name, street, city, code, email) {
        cy.get(nameText).type(name)
        cy.get(streetAddressText).type(street)
        cy.get(cityText).type(city)
        cy.get(postalCodeText).type(code)
        cy.get(emailText).type(email)
        return this;
    }
}

export default new BillingAddress;