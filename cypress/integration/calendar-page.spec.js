/* eslint-disable no-undef */
import { enterButton, headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref,footerImg } from './utils'

// Verify Items and functions on the calendar page. 

function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}

describe('Calendar page functions', () => {
    beforeEach(() => {
      cy.visit('/calendar')
    })
    
    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      cy.url().should('contains', '/calendar')
      checkA11y(cy)
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
  
    // This needs to be updated for the text TBD
    it('should contain some text', () => {  
     cy.url().should('contains', '/calendar')
     cy.get('#calendar-header').should('contains.text', 'Select a day')
    })

    it('should find selectable days', () => {  
      cy.url().should('contains', '/calendar')
      cy.get('#calendar-header').should('contains.text', 'Select a day')

      // trying to compare today's actual date with the Day--today
       const todaysDate = Cypress.moment().format('LL')//('dddd,MMMMDD,YYYY')
      // cy.get('.DayPicker-Day--today').should(($date) => {
      // expect($date.eq(0)).to.contain(todaysDate)
      // })
      cy.get('.DayPicker-Day--today').click()
      cy.get('.DayPicker-Day--selected').should('be.visible')
      cy.get('.css-ex3iit-daySelection-mediaQuery-daySelection').should('contain.text', 'Please select your time slot:')
      cy.get('time').should('contain', todaysDate)

    })
  
  xit('should count the number of days available for appointments (30)', () => {  
    cy.url().should('contains', '/calendar')
    cy.get('#calendar-header').should('contains.text', 'Select a day')
    cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
      const count = el.length
      expect(count).eq(13)
   })
  })
    
   
   it('should check a timeslot', () => {  
    cy.url().should('contains', '/calendar')
    // compare today's actual date with the Day--today
     const todaysDate = Cypress.moment().format('LL')//('dddd,MMMMDD,YYYY')
    cy.get('.DayPicker-Day--today').click()
    cy.get('.DayPicker-Day--selected').should('be.visible')
    cy.get('time').should('contain', todaysDate)
     // cy.get('[type="checkbox"]').check(['#checkbox_1'])
    cy.get('#checkbox_1').should('not.be.checked')
    cy.get('#checkbox_1').check()
    cy.get('#checkbox_1').should('be.checked')
  })
  it('should select a time an click enter button', () => {  
    cy.url().should('contains', '/calendar')
    // compare today's actual date with the Day--today
     const todaysDate = Cypress.moment().format('LL')//('dddd,MMMMDD,YYYY')
    cy.get('.DayPicker-Day--today').click()
 //   cy.get('.DayPicker-Day--selected').should('be.visible')
    cy.get('time').should('contain', todaysDate)
     // cy.get('[type="checkbox"]').check(['#checkbox_1'])
    cy.get('#checkbox_1').check()
    cy.get(enterButton).click()
    cy.url().should('contains', '/review')
  })
  // aria-label="Next Month"
  it.only('should cilck to show the next month unless the last day is the end of the month', () => {  
    cy.url().should('contains', '/calendar')
    const thisMonth = Cypress.moment().format('MMMM')
    cy.get('#renderMonthName').should('contain', thisMonth)
    const thisDay = Cypress.moment().format('DD')
    cy.get('.DayPicker-Body > :nth-child(1) > [tabindex="0"]').should('contain', '1')
      // make sure the available days span into the next month

     // if (count <= 30) {

       // cy.get('.DayPicker-NavButton--next').click({ force: true })
   //   }
   cy.get('.DayPicker-Body > :nth-child(1) > [tabindex="0"]').then(el => {
    const count = el.length
    expect(count + 30).eq(31)
    cy.get('.DayPicker-Day').should('contain', '31')
    cy.get('[aria-label="Monday, September 30, 2019"]')
    // make sure we're on a month that has 3 selectable days
   // if (count < 3) {
    //  cy.get('.DayPicker-NavButton--next').click({ force: true })
    })

    // cy.get('.DayPicker-NavButton--next').click()
    // const nextMonth = Cypress.moment().add(1, 'month').format('MMMM')
    // cy.get('#renderMonthName').should('contain', nextMonth)
  //   cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
  //     const count = el.length
  //     expect(count).eq(30)
  //  })
  })

});