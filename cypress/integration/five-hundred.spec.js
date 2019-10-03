/* eslint-disable no-undef */
import { headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref,footerImg } from './utils'


// Verify Items and functions on the 500 page. 

function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}

describe('500 page functions', () => {
  beforeEach(() => {
    cy.visit('/500')
  })

it('Has no detectable a11y violations on load', () => {
  // Test the page at initial load
 
    cy.injectAxe()
     checkA11y(cy)
})

  it('can load 500 page', () => {
    cy.visit('/500')
// todo update when text added.
    cy.get('main')
      .should('contain.text', 'Something went wrong.')
  })
  it('should go to the landing page and show header image and links ', () => {  
    cy.get(headerImg).should('be.visible')
    cy.get(langLink).should('be.visible', 'Français')

   })

  it('should check footer info for links and canada image', () => {
   cy.get(aboutCA).should('be.visible').and('contain', 'About Canada.ca')
   cy.get(sMedia).should('be.visible').and('contain', 'Social media')
   cy.get(mobileApp).should('be.visible').and('contain', 'Mobile applications')
   cy.get(tocLink).should('contain', 'Terms and Conditions')
   cy.get(privacyLink).should('contain', 'Privacy')
  
   cy.get(aboutCAHref).should('have.attr', 'href', 'https://www.canada.ca/en/government/about.html')
   cy.get(sMediaHref).should('have.attr', 'href', 'https://www.canada.ca/en/social.html')
   cy.get(mobileHref).should('have.attr', 'href', 'https://www.canada.ca/en/mobile.html')
   cy.get(tocHref).should('have.attr', 'href', 'https://digital.canada.ca/legal/terms/')
   cy.get(privacyHref).should('have.attr', 'href', '/privacy')
   
    cy.get(footerImg).should('be.visible')
   })
})
