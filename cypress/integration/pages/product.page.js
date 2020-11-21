// @ts-nocheck
import Base from './base.page';

const bowTiesOptions = '[id="Color"]'
const dryMartiniOptions = '[id="Size"]'
const fireworksOptions = '[id="Sounds"]'
const buyButton = '[id="buyButton"]'

let tiesList = ['Blue Red', 'White Blue', 'White Gray']
let drinksList = ['Classic', 'Large', 'Gatsby-esque']
let fireworksList = ['Huge BOOM', 'Sparks', 'That long strident sound']

class Product extends Base {

    validateProductOptions(product) {
        
            switch(product) {
                case 'Bow Ties':
                    tiesList.forEach(tie => {
                        cy.get(bowTiesOptions).each(option => cy.wrap(option).should('contain', tie))
                    })
                    break;
                case 'Dry Martini':
                    drinksList.forEach(drink => {
                        cy.get(dryMartiniOptions).each(option => cy.wrap(option).should('contain', drink))
                    })
                    break;
                case 'Fireworks':
                    fireworksList.forEach(type => {
                        cy.get(fireworksOptions).each(option => cy.wrap(option).should('contain', type))
                    })
                    break;
                default:
                    cy.log('option passed not known')
            }
        return this;
    }

    // 'choice' indicates the index position on the dropdown list
    selectProductOption(product, choice) {

        switch(product) {
            case 'Bow Ties':
                cy.get(bowTiesOptions)
                    .find('option')
                    .then($els => $els.get(choice).setAttribute('selected', "selected"))
                    .parent()
                    .trigger('change')
                break;
            case 'Dry Martini':
                cy.get(dryMartiniOptions)
                    .find('option')
                    .then($els => $els.get(choice).setAttribute('selected', "selected"))
                    .parent()
                    .trigger('change')
                break;
            case 'Fireworks':
                cy.get(fireworksOptions)
                    .find('option')
                    .then($els => $els.get(choice).setAttribute('selected', "selected"))
                    .parent()
                    .trigger('change')
                break;
            default:
                cy.log('not known')
        }
        return this;
    }

    validateBuyButton() {
        cy.get(buyButton)
            .should('be.visible')
            .should('exist')
            .contains('Buy for')
        return this;
    }

    clickBuyButton() {
        this.validateBuyButton()
        cy.get(buyButton).focus().click()
        return this;
    }
}

export default new Product;