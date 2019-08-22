/* eslint-disable no-undef */
// Verify Items and functions on the select location, and office page. 
function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}
describe('select provice, city and office page functions', () => {
    beforeEach(() => {
      cy.visit('/selectProvince')
      cy.reload(true)
    })

    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      checkA11y(cy)
    })
  
    it('should go to the selectProvince page', () => {  
     cy.url().should('contains', '/selectProvince')

    })

    it('should click into the province selection dropdown and show Select a City dropdown', () => {  
      cy.injectAxe()
      cy.get('#ProvinceList').should('contains.text', 'Select')
     cy.get('#ProvinceList').select('Select a Province', { force: true })
     checkA11y(cy)
     cy.get('#CitiesList').should('contain.text', 'Select a City')
 
     })

     it('should click into the province selection dropdown and show Select a City dropdown', () => {  
      cy.injectAxe()
      cy.get('#ProvinceList').should('contains.text', 'Select')
      cy.get('#ProvinceList').select('Select a Province', { force: true })
      cy.get('#CitiesList').should('contains.text', 'Select a City')
     cy.get('#CitiesList').select('Select a City', { force: true })
     checkA11y(cy)
     cy.get('[for="Locations"]').should('contains.text', 'Locations in:')
     cy.get('.css-arysfy-govuk_button-button-mediaQuery-button').should('be.visible')
     })

     // There seems to be a bug where the text context does not match the server. 
     xit('should find the city in the dropdown', () => {  
     // cy.injectAxe()
    // cy.get('select').select('Alberta').should('have.value', 'Alberta').select('Alberta', { force: true })
    //   .invoke('val').should('deep.equal', 'Alberta')
      cy.get('#ProvinceList').should('contain.value', 'Alberta').should('be.visible')
    //  cy.get('#CitiesList').should('contains.text', 'Select a City')
   //  cy.get('#CitiesList').select('Select a City', { force: true })
   //  checkA11y(cy)
    // cy.get('#CitiesList').should('contain.text', 'Select a City')
   //  cy.get('#CitiesList').select('Select a City', { force: true }).select('Edmonton', { force: true })
  //   cy.get('[for="Locations"]').should('contains.text', 'Locations in:')
  //   cy.get('.css-arysfy-govuk_button-button-mediaQuery-button').should('be.visible')
})

});