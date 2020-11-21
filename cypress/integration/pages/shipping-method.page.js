// @ts-nocheck
import Base from './base.page';

const shippingList = '[id="snipcart-shippings-list"]'

class ShippingMethod extends Base {

    validateShippingLocationAndPrice(location, price) {
        cy.get(shippingList).find('h2.snip-product__name').contains(location).parents('tr').find('td.snip-table__cell--right').should(($el) => {
            expect($el).to.contain(price)
        })
        return this;
    }

    selectShippingLocation(location) {

        switch(location) {
            case 'Worldwide':
                cy.get('.snip-worldwide > :nth-child(1) > .snip-product--selectable-item')
                    .should('be.visible')
                    .click()
                break;
            default:
                cy.log('Note: Incorrect location passed')
        }
        return this;
    }
}

export default new ShippingMethod;