describe('Register', () => {
    it('Test creation de compte', () => {

        // 1 - On se connecte au site
        cy.visit('https://web-project.osc-fr1.scalingo.io/frontend')

        // 2 - On remplie le formulaire d'enregistrement et on clique sur ok pour creer un compte
        cy.get('input[type="text"]').eq(1).clear().type("Test") // name
        cy.get('input[type="text"]').eq(2).clear().type("test@gmail.com") // email
        cy.get('input[type="password"]').eq(1).clear().type("1m02P@Ss") // password
        cy.get('input[type="password"]').eq(2).clear().type("1m02P@Ss") // confirm password
        cy.get('button').eq(1).click() // register

        // on verifie si l'enregistrement a fonctionné
        cy.get('input[type="text"]').eq(0).then($input => {
            const value = $input.val();
            if (value.includes('test@gmail.com')) {
              cy.log("Utilisateur créé avec succes");
            } 
            else if(value === ""){
              cy.log("L'utilisateur existe déja");
            }
        });

    });
})