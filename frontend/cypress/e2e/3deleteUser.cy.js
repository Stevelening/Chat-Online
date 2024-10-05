describe('Register', () => {
    it('Test creation de compte', () => {

        // 1 - On se connecte au site
        cy.visit('https://web-project.osc-fr1.scalingo.io/frontend')

        // 2 - Connexion admin
        cy.wait(1000)
        cy.get('input[type="text"]').eq(0).clear().type("Admin@admin.fr") // email
        cy.get('input[type="password"]').eq(0).clear().type("admin123") // password
        cy.get('button').eq(0).click() // login
        cy.wait(2000)

        // 3 - Suppression du compte de test par l'admin
        cy.get("#deleteuser").children("select").select('test@gmail.com');
        cy.get("#deleteuser").children().children("button").click(); 
        cy.wait(2000)
        cy.get("#deconnexion").click() // deconnexion

    });
})