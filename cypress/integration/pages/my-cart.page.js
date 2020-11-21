// @ts-nocheck
import Base from './base.page';

const quantity = 'span.snip-quantity-trigger__text'
const increaseQuantityButton = 'a.snip-quantity-trigger__btn--add'
const totalPrice = 'td.snip-table__cell--highlight > span'
const nextButton = 'a.js-next'
const subTotalTitle = 'span.snip-header__total-label'
const subTotalAmout = '[id="snipcart-amount"]'
const signInSection = '[id="snipcart-login-form-container"]'
const createLoginSection = '[id="snipcart-newaccount-form-container"]'
const checkoutAsGuestSection = '[id="snipcart-guest-checkout-container"]'
const checkoutButton = '[id="snipcart-guest-checkout"]'

class MyCart extends Base {

    validateQuantity(amount) {
        cy.get(quantity).should(($el) => {
            expect(parseInt($el.get(0).innerText)).to.eq(amount)
        })
        return this;
    }

    increaseQuantity() {
        cy.get(increaseQuantityButton)
            .should('exist')
            .click()
        return this;
    }

    validateTotalPrice(amount) {
        cy.get(totalPrice).should(($el) => {
            expect($el.get(0).innerText).to.contain(amount)
        })
        return this;
    }

    clickNextButton() {
        cy.get(nextButton).contains('Next step')
            .should('exist')
            .click()
        return this;
    }

    validateSubTotalAmount(amount) {
        cy.get(subTotalTitle).contains('Subtotal:')
            .should('exist')

        cy.get(subTotalAmout).should(($el) => {
            expect($el.get(0).innerText).to.contain(amount)
        })
        return this;
    }

    validateSignInSection() {
        cy.get(signInSection)
            .should('exist')
            .should('be.visible')
        return this;
    }

    validateCreateLoginSection() {
        cy.get(createLoginSection)
            .should('exist')
            .should('be.visible')
        return this;
    }

    validateCheckoutAsGuestSection() {
        cy.get(checkoutAsGuestSection)
            .should('exist')
            .should('be.visible')
        return this;
    }

    clickCheckoutButton() {
        cy.get(checkoutButton).click()
        return this;
    }
}

export default new MyCart;