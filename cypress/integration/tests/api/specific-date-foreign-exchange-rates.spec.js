// @ts-nocheck

describe('Specific date Foreign Exchange rates', () => {

    let dayDate = 27
    let dateRangeSpecific = `2020-06-`

    beforeEach(() => {
        cy.fixture('currencies.json').as('currencies')
    })

    it('with symbols', () => {
        cy.request(Cypress.config().rateApiUrl + '/' + dateRangeSpecific + `${dayDate}` + '?symbols=USD,JPY,MYR').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.base).to.eq('EUR')
            expect(response.body.rates.USD).to.not.be.null
            expect(response.body.rates.JPY).to.not.be.null
            expect(response.body.rates.MYR).to.not.be.null
            expect(response.body.date).to.eq(dateRangeSpecific + `${dayDate - 1}`)
        })
    })

    it('with symbols - error', () => {
        cy.request({
            method: 'GET',
            url: Cypress.config().rateApiUrl + '/' + dateRangeSpecific + `${dayDate}` + '?symbols=fake',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it(`with base - all currencies`, () => {
        cy.get('@currencies').each((listObject) => {
            cy.log(listObject)

            cy.request(Cypress.config().rateApiUrl + '/' + dateRangeSpecific + `${dayDate}` + `?base=${listObject}`).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.rates.GBP).to.not.be.null
                expect(response.body.date).to.eq(dateRangeSpecific + `${dayDate - 1}`)
            })
        })
    })

    it(`with base - error`, () => {
        cy.request({
            method: 'GET',
            url: Cypress.config().rateApiUrl + '/' + dateRangeSpecific + `${dayDate}` + `?base=fake`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('with symbols and base', () => {
        cy.request({
            method: 'GET',
            url: Cypress.config().rateApiUrl + '/' + dateRangeSpecific + `${dayDate}` + '?base=BGN&symbols=RUB',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.base).to.eq('BGN')
            expect(response.body.rates.RUB).to.not.be.null
            expect(response.body.date).to.eq(dateRangeSpecific + `${dayDate - 1}`)
        })
    })

    it(`with symbols and base - error`, () => {
        cy.request({
            method: 'GET',
            url: Cypress.config().rateApiUrl + '/' + dateRangeSpecific + `${dayDate}` + '?base=fake&symbols=fake',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })
})