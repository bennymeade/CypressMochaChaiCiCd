// @ts-nocheck
import homePage from '../../pages/home-page.page'
import productPage from '../../pages/product.page'

const products = ['Bow Ties', 'Dry Martini', 'Fireworks'];

describe('Scenario 1', () => {
    
    products.forEach(product => {
        it(`Select ` + `${product}` + ` and verify buying options`, () => {
            homePage
                .openUrl('')
                .validateH1Title('React & Gatsby shop powered by Snipcart')
                .clickProductName(`${product}`)
            // Select any product from the snipcart application
            // Verify the current relative URL contains right product name
            // Verify all the dropdown options and Buy for button (include colour and etc)
            productPage
                .validateH1Title(`${product}`)
                .validatePageUrl(`${product}`)
                .validateProductOptions(`${product}`)
                .selectProductOption(`${product}`, 1)
                .validateSectionColour('Buy button', '[id="buyButton"]', '#212121')
                .validateBuyButton()
        })
    })
})