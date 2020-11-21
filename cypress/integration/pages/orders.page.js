// @ts-nocheck
import Base from './base.page';

const orderComfirmation = 'li.snip-flash__item.snip-flash__item--success'
const orderNumber = '[id="snipcart-title"]'

class Orders extends Base {

    validateOrderComfirmation(text) {
        cy.get(orderComfirmation).contains(text)
            .should('exist')
            .should('be.visible')
        return this;
    }

    validateOrderNumber(text) {
        cy.get(orderNumber).contains(text)
            .should('exist')
            .should('be.visible')
        return this;
    }
}

export default new Orders;