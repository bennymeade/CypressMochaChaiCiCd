// @ts-nocheck
import homePage from '../../pages/home-page.page'
import productPage from '../../pages/product.page'
import myCart from '../../pages/my-cart.page'
import billingAddress from '../../pages/billing-address.page'
import shippingMethod from '../../pages/shipping-method.page'
import paymentMethod from '../../pages/payment-method.page'
import confirmOrder from '../../pages/confirm-order.page'
import orders from '../../pages/orders.page'

const product = 'Fireworks'
const orderComfirmationMesssage = 'Thank you for your order! Your invoice has been sent to you by email, you should receive it soon.'

describe('Scenario 1', () => {
    beforeEach(() => {
        homePage
            .openUrl('')
            .validateH1Title('React & Gatsby shop powered by Snipcart')
            .clickProductName(product)
    })

    it(`Place order for product - ` + product, () => {
        // Buy any product and go to My cart
        productPage
            .validateH1Title(product)
            .selectProductOption(product, 2)
            .clickBuyButton()
        myCart
            .validateH2Title('My cart')
            .validateH2Title('Fireworks')
            .validateParagraph('Fireworks are a noble, traditional way to emphasize the greatness of an event.')
        // validate the colour, and unit price are correctly displayed
            .validateSectionColour('Banner', '[id="snipcart-header"]', '#222222')
            .validateQuantity(1)
            .validateTotalPrice('67.89')
        // Increase the quantity and assert the Total price
            .increaseQuantity()
            .validateQuantity(2)
            .validateTotalPrice('135.78')
        // validate the remove product (x) colour (red or not)
            .validateSectionColour('Remove button', 'a.snip-product__remove', '#ff1100')
        // Click on Next step button and verify the following
        // Sub total
        // Guest checkout, login, new account containers
        // Checkout button colour
        // And relative URL contains login
            .clickNextButton()
            .validateSubTotalAmount('135.78')
            .validateSignInSection()
            .validateCreateLoginSection()
            .validateCheckoutAsGuestSection()
            .validateSectionColour('Checkout button', '[id="snipcart-guest-checkout"]', '#efe778')
            .validatePageUrl('login')
        // Click on Checkout button and fill the form with random data
            .clickCheckoutButton()
        billingAddress
            .myCartSectionsTitle('Billing address')
            cy.generateEmailAddress().then(uniqueEmail => {
                cy.fixture('billing-address').then((billing) => { billingAddress.submitBillingAddressDetails(billing.name, billing.streetAddress, billing.city, billing.zipPostalCode, uniqueEmail) }); 
            })
        // Click on Next step button and verify the following
        // Shipping methods 
        // Shipping prices
        billingAddress.myCartNextButton()
        shippingMethod
            .myCartSectionsTitle('Shipping method')
            .validateShippingLocationAndPrice('United States', '10.00')
            .validateShippingLocationAndPrice('Canada', '15.00')
            .validateShippingLocationAndPrice('Worldwide', '20.00')
            .selectShippingLocation('Worldwide')
            .myCartNextButton()
        paymentMethod
            .myCartSectionsTitle('Payment method')
            .myCartPaymentNextButton()
        // Click on Next step button and verify the following
        // Billing Address
        // Shipping Address
        // Payment Information
        // Total Amount to pay (Including Shipping)
        confirmOrder
            .myCartSectionsTitle('Confirm order')
            .validateConfirmOrderSection('Billing address')
            .validateConfirmOrderSection('Shipping address')
            .validateConfirmOrderSection('Payment information')
            .validatePayableNowTitleAndAmount('Payable now', '163.57')
            .clickPlaceOrderButton()
        // Click on Place order button and verify the following
        // Green banner (Notification message)
        // Order number
        orders
            .validateOrderComfirmation(orderComfirmationMesssage)
            .validateSectionColour('Notification message', 'li.snip-flash__item', '#76d443')
            .validateOrderNumber('SNIP-')
    })
})