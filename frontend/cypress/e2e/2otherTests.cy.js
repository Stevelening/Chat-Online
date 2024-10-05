describe('Tests', () => {
    it('Tous les tests', () => {

        // 1 - On se connecte au site
        cy.visit('https://web-project.osc-fr1.scalingo.io/frontend')

        // 2 - On se connecte avec un compte de test
        cy.get('input[type="text"]').eq(0).clear().type("test@gmail.com")
        cy.get('input[type="password"]').eq(0).clear().type("1m02P@Ss") // password
        cy.get('button').eq(0).click() // login

        // 3 - On cree un nouveau groupe pour se rassurer qu'il y'en ai au moins 1
        cy.wait(2000)
        cy.get('input[type="text"]').eq(0).clear().type("Test Group a") // name
        cy.get('button').eq(1).click() // add group

        // On va faire les etapes suivantes pour les groupes dont l'utilisateur 
        // est membre et les groupes qu'il administre

        // 4 - on recupere le nombre de groupes
        cy.wait(2000)

        let initialMember;
        cy.get('ul').eq(0)
        .children()
        .then($children => {
            initialMember = $children.length;
            cy.log(initialMember);
        });

        let initialAdmin;
        cy.get('ul').eq(1)
        .children()
        .then($children => {
            initialAdmin = $children.length;
            cy.log(initialAdmin);
        });

        // 5 - on cree encore un groupe
        cy.wait(2000)
        cy.get('input[type="text"]').eq(0).clear().type("Test Group b") // name
        cy.get('button').eq(1).click() // add group

        // 6 - on recupere de nouveau le nombre de groupes et on 
        // verifie que le nombre de groupes a augmenté de 1 
        // c'est-a-dire : [ next = initial + 1 ]
        cy.wait(2000)

        let nextMember;
        cy.get('ul').eq(0)
        .children()
        .then($children => {
            nextMember = $children.length;
            cy.log(nextMember);
            cy.wrap(nextMember).should('eq', initialMember + 1);
        });

        let nextAdmin;
        cy.get('ul').eq(1)
        .children()
        .then($children => {
            nextAdmin = $children.length;
            cy.log(nextAdmin);
            cy.wrap(nextAdmin).should('eq', initialAdmin + 1);
        });
        
        // 7 - On recupere le nombre de membre d'un groupe
        cy.get('ul').eq(1).children('li').last().click()
        cy.wait(2000)
        let initialMembersNumber;
        cy.get('#members')
        .children()
        .then($children => {
            cy.log(initialMembersNumber);
            initialMembersNumber = $children.length;
        });

        // 8 - On ajoute un membre a un groupe
        cy.get("button").eq(2).click()
        cy.wait(2000)

        // 9 - On verifie on verifie que le nombre de membres de ce groupe
        // a augmenté de 1 
        let nextMembersNumber
        cy.get('#members')
        .children()
        .then($children => {
            nextMembersNumber = $children.length
            cy.log(nextMembersNumber);
            cy.wrap(nextMembersNumber).should('eq', initialMembersNumber + 1);
        });

        // 10 - On supprime un membre de ce groupe
        cy.get("button").contains("Supprimer").click()
        cy.wait(2000)

        // 11 - On verifie qu'il y'a un utilisateur de moins
        let nextMembersNumber1
        cy.get('#members')
        .children()
        .then($children => {
            nextMembersNumber1 = $children.length
            cy.log(nextMembersNumber1);
            cy.wrap(nextMembersNumber1).should('eq', initialMembersNumber);
        });

        // 12 - On envoie 01 message dans un groupe
        cy.get('ul').eq(0).children('li').first().click()
        cy.wait(2000)
        cy.get("#send").children('input[type="text"]').clear().type("A Message")
        cy.get("#send").children("button").click()
        cy.wait(2000)

        // 13 - On recupere le nombre de messages du groupe
        let initialMessagesNumber;
        cy.get('#messages')
        .children()
        .then($children => {
            initialMessagesNumber = $children.length;
        });

        // 14 - On envoie encore un message dans le meme groupe
        cy.get("#send").children('input[type="text"]').clear().type("A Message")
        cy.get("#send").children("button").click()
        cy.wait(2000)

        // 15 - On recupere le nombre de messages et on verifie que ca a augmenté de 1
        let nextMessagesNumber
        cy.get('#messages')
        .children()
        .then($children => {
            nextMessagesNumber = $children.length
            cy.log(nextMessagesNumber);
            cy.wrap(nextMessagesNumber).should('eq', initialMessagesNumber+1);
        });

        // 16 - Edition du mot de passe
        cy.wait(2000)
        cy.get("#updatepassword").children('input[type="password"]').clear().type("1m02P@Ssabc");
        cy.get("#updatepassword").children("button").click(); 

        // 17 - On se déconnecte de l'application
        cy.wait(2000)
        cy.get("#deconnexion").click()

        // 18 - On se reconnecte avec le nouveau mot de passe
        cy.wait(2000)
        cy.get('input[type="text"]').eq(0).clear().type("test@gmail.com") // email
        cy.get('input[type="password"]').eq(0).clear().type("1m02P@Ssabc") // password
        cy.get('button').eq(0).click() // login

        // 19 - On se déconnecte de l'application
        cy.wait(2000)
        cy.get("#deconnexion").click()

        // 20 - Connexion admin
        cy.wait(1000)
        cy.get('input[type="text"]').eq(0).clear().type("Admin@admin.fr") // email
        cy.get('input[type="password"]').eq(0).clear().type("admin123") // password
        cy.get('button').eq(0).click() // login
        cy.wait(2000)

        // 21 - Suppression d'un groupe par l'admin
        cy.get("#deletegroup").children("select").select('Test Group a');
        cy.get("#deletegroup").children().children("button").click();
        cy.wait(2000)
    });
})