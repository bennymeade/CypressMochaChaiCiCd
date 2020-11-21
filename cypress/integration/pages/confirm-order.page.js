// @ts-nocheck
import Base from './base.page';

const payableNow = '[id="snipcart-total"]'

class ConfirmOrder extends Base {

    validateConfirmOrderSection(section) {
        cy.get('.snip-cols').find('h2').contains(section)
            .should('exist')
            .should('be.visible')
        return this;
    }

    validatePayableNowTitleAndAmount(title, amount) {
        cy.get(payableNow).find('h2').contains(title)
            .should('exist')

        cy.get(payableNow).find('td.snip-table__cell--right').should(($el) => {
            expect($el.get(0).innerText).to.contain(amount)
        })
        return this;
    }

    clickPlaceOrderButton() {
        cy.get('.js-submit').contains('Place Order')
            .should('exist')
            .should('be.visible')
            .click()
        return this;
    }
}

export default new ConfirmOrder;