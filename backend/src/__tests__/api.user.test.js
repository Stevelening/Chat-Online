const app = require('../app')
const request = require('supertest')

test('Test if user can log in and list users', async () => {
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')
  response = await request(app)
    .get('/api/users')
    .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe('Returning users')
  expect(response.body.data.length).toBeGreaterThan(0)
})

test("Test if we can create a user", async () =>{
  let response = await request(app)
  .post("/register")
  .send({name: "steveq", email: "steveq@gmail.com", password: "111m02P@SsF0rt!"})
  expect(response.statusCode).toBe(200)
  expect(response.body.status).toBe(true)
  expect(response.body.message).toBe("User Added")
})

test("Test if the connected user can update his password", async () =>{
  // login
  let response = await request(app)
    .post('/login')
    .send({ email: 'Sebastien.Viardot@grenoble-inp.fr', password: '123456' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')
  // login is ok, now edit password
  response = await request(app)
  .put("/api/password")
  .set("x-access-token", response.body.token)
  .send({password: "1m02P@SsF0rt!"})
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe("Password updated successfully")
})

test("update user informations", async ()=>{
  // login
  let response = await request(app)
    .post('/login')
    .send({ email: 'Admin@admin.fr', password: 'admin123' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')
  // login is ok, now edit user informations
  response = await request(app)
  .put("/api/users/1")
  .set('x-access-token', response.body.token)
  .send({
    name: "Theuser", 
    email: "Sebastien.Viardot@grenoble-inp.fr", 
    password: "1m02P@SsF0rt!",
    isAdmin: 1
  })
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe("User updated")
})

test("Delete a user", async ()=>{
  // login
  let response = await request(app)
    .post('/login')
    .send({ email: 'Admin@admin.fr', password: 'admin123' })
  expect(response.statusCode).toBe(200)
  expect(response.body).toHaveProperty('token')
  // login is ok, now delete a user
  response = await request(app)
  .delete("/api/users/3")
  .set('x-access-token', response.body.token)
  expect(response.statusCode).toBe(200)
  expect(response.body.message).toBe("User deleted")
})




