// pretier-ignore
/* eslint-disable no-undef */

// Check the Header for Canada wordmark and French/English language link
export const headerImg = () => cy.get('.svg-container').eq(0);


export const footerImg = () => cy.get('.svg-container').eq(1);

export const langLink = () => cy.get('#language-toggle')

;

// Check the footer for links and Canada wordmark
export const contactLink = () => cy.get('#footer div a').eq(0);

export const privacyLink = () => cy.get('#footer a').eq(0);

export const privacyHref = () =>cy.get('#footer div a').eq(0);
// todo, check the privacy link text once complete
export const tocLink = () =>cy.get('#footer a').eq(1);

//need the link for the terms and conditions
//  cy.get('#footer div a')
//    .eq(2).should('have.attr', 'href', '/termsandconditions')
