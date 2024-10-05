const app = require('../app')
const request = require('supertest')


/**
 * Test Group Creation
 */
test("Group Creation", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'jre@gmail.com', password: '1m02P@Ss' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .post('/api/mygroups')
        .set("x-access-token", response.body.token)
        .send({
            name:"Mygroup"
        })
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Group Created')
});




/**
 * Test list Groups (managed or created groups)
 */

test("List groups created by user", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'jre@gmail.com', password: '1m02P@Ss' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    let token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .get('/api/mygroups')
        .set("x-access-token", token)
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('returning managed groups')
    expect(response.body.data.length).toBeGreaterThan(0)
    // Add more assertions as needed to check the response body
});


/**
 * Test Add  Members to Group
 */
test("Adding members to group", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'jre@gmail.com', password: '1m02P@Ss' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    let token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .put('/api/mygroups/3/2') // adding a member to jre group
        .set("x-access-token", token)
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User 2 added to group 3')
});


/**
 * Test Get Members from Group
 */
test("Get Members from Group", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'jre@gmail.com', password: '1m02P@Ss' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    let token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .get('/api/mygroups/3')
        .set("x-access-token", token)
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0)
    // Add more assertions as needed to check the response body
});


/**
 * get joined Groups
 */
test("Joined Groups", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'Admin@admin.fr', password: 'admin123' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    let token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .get('/api/groupsmember')
        .set("x-access-token", token)
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).toBeGreaterThan(0)
});



/**
 * Test remove Members from Group
 */

test("Removing members from Group", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
        .post('/login')
        .send({ email: 'jre@gmail.com', password: '1m02P@Ss' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    let token = response.body.token;
    //--------------End of retrieving the token-------------

    response = await request(app)
        .delete('/api/mygroups/3/2')
        .set("x-access-token", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User 2 removed from group 3');
});





/**
 * Test delete  Group
 */


test("Deleting Groups", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'jre@gmail.com', password: '1m02P@Ss' });

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    let token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .delete('/api/mygroups/3')
        .set("x-access-token", token)
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Group Removed : 3')
    
});








