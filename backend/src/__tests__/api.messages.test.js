const app = require('../app')
const request = require('supertest')



test("Message sending", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'jre@gmail.com', password: '1m02P@Ss' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .post('/api/messages/3')
        .set("x-access-token", response.body.token)
        .send({
            content:"helloTest"
        })
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('message sent by : Joe Rogan in group JRE')
});


test("Message Receive", async () => {
    // -----------retrieving the token-----------------
    let response = await request(app)
    .post('/login')
    .send({ email: 'jre@gmail.com', password: '1m02P@Ss' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    token=response.body.token
    //--------------End of retrieving the token-------------
    response = await request(app)
        .get('/api/messages/3')
        .set("x-access-token", response.body.token)
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0)
});