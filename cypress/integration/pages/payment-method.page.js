// @ts-nocheck
import Base from './base.page';


class PaymentMethod extends Base {

    myCartPaymentNextButton() {
        cy.get('#snipcart-paymentmethod-pay')
            .click()
        return this;
    }

}

export default new PaymentMethod;