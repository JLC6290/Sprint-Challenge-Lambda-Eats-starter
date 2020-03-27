/* eslint-disable no-undef */
describe("Testing our form inputs", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/order");
    });
    it("tests things", function() {
      cy.get('input[name="name"]')
        .type("James")
        .should("have.value", "James");
      cy.get('[type="checkbox"]').check();
      cy.get('button[type="submit"]').click(); 
    });
  });