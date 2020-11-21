// @ts-nocheck

describe('Latest Foreign Exchange rates', () => {

    beforeEach(() => {
        cy.fixture('currencies.json').as('currencies')
    })

    it('with symbols', () => {
        cy.generateCurrentDate().then(ratesDate => {
            cy.request(Cypress.config().rateApiUrl + '/latest?symbols=HUF,GBP,NZD').then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.base).to.eq('EUR')
                expect(response.body.rates.HUF).to.not.be.null
                expect(response.body.rates.GBP).to.not.be.null
                expect(response.body.rates.NZD).to.not.be.null
                expect(response.body.date).to.contain(ratesDate)
            })
        })
    })

    it('with symbols - error', () => {
        cy.request({
            method: 'GET',
            url: Cypress.config().rateApiUrl + '/latest?symbols=fake',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it(`with base - all currencies`, () => {
        cy.get('@currencies').each((listObject) => {
            cy.log(listObject)

            cy.request(Cypress.config().rateApiUrl + `/latest?base=${listObject}`).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.rates.GBP).to.not.be.null
            })
        })
    })

    it(`with base - error`, () => {
        cy.request({
            method: 'GET',
            url: Cypress.config().rateApiUrl + '/latest?base=fake',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('with symbols and base', () => {
        cy.generateCurrentDate().then(ratesDate => {
            cy.request({
                method: 'GET',
                url: Cypress.config().rateApiUrl + '/latest?base=USD&symbols=HUF',
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.base).to.eq('USD')
                expect(response.body.rates.HUF).to.not.be.null
                expect(response.body.date).to.contain(ratesDate)
            })
        })
    })

    it(`with symbols and base - error`, () => {
        cy.request({
            method: 'GET',
            url: Cypress.config().rateApiUrl + '/latest?base=fake&symbols=fake',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })
})