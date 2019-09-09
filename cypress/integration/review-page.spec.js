/* eslint-disable no-undef */
import { headerImg, langLink, contactLink, privacyLink, privacyHref, tocLink, footerImg } from './utils'

// Verify Items and functions on the select location, and office page. 
function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}
describe('select provice, city and office page functions', () => {
    beforeEach(() => {
      cy.visit('/review')
      cy.reload(true)
    })

    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      checkA11y(cy)
    })
    it('should go to the selectProvince page and show header info', () => {  
        cy.url().should('contains', '/review')
       cy.get(headerImg).should('be.visible')
        cy.get(langLink).should('be.visible', 'Français')
   
       })
    it('should check footer info', () => {
         cy.url().should('contains', '/review')
        cy.get(contactLink).should('be.visible')
        cy.get(privacyLink).should('not.contain', 'Contact')
        cy.get(privacyHref).should('contain', 'Privacy')
        cy.get(tocLink).should('contain', 'Terms and Conditions')
         cy.get(footerImg).should('be.visible')
        })
    it('should error is not all of the information is dislayed on the page', () => {  
            cy.url().should('contains', '/review')  
       
           })
    it.only('should show the text options and associated links on the page', () => {  
        cy.get('#review-header').should('contain', 'Review your request')
        cy.get('main').should('contain', 'BIL file number')
        cy.get('#bilNumber-header').should('contain', 'BIL file number')
        cy.get('#bilNumber-link > a').should('have.attr', 'href', '/register#paperFileNumber-label')
        cy.get('#email-header').should('contain', 'Email')
        cy.get('#email-link > a').should('have.attr', 'href', '/register#email-label')
        cy.get('#a11y-header').should('contain', 'Accessibility required')
        cy.get('#a11y-link > a').should('have.attr', 'href', '/register#familyCheck-label')
        cy.get('#location-header').should('contain', 'Location')
        cy.get('#location-link > a').should('have.attr', 'href', '/selectProvince')
        cy.get('#dates-header').should('contain', 'Availability')
        cy.get('#dates-link > a').should('have.attr', 'href', '/calendar#selectedDaysBox')
           })  
                  

})