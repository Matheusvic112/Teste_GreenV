
import supertest from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm"
import request from "supertest";
import * as M from "../__mocks__/users/users.mocks";
import * as C from "../__mocks__/companies/company.mocks"
describe("Companies API", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
        .then((res) => {
            connection = res;
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
            
        });
       await  supertest(app).post("/users").send(M.mockedUser);

})
let token :string 
afterAll(async () => {
  await connection.destroy();
});


it("Must create a company", async () => {


  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/users").set("Authorization", `Bearer ${token}`);
  const user = responseCreateUser.body.shift()
  const response = await request(app)
  .post(`/companies/${user.id}`).send(C.mockedCompanies)
  .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(201);

})
it("create a company invalid token with a non existing user ", async () => {


  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/users").set("Authorization", `Bearer ${token}`);
  const user = responseCreateUser.body.shift()
  const response = await request(app)

  .post(`/companies/${user.id}}`).send(C.mockedCompanies)
  .set("Authorization", `Bearer fake_token`);
  expect(response.body.message).toEqual("Invalid token")
  expect(response.status).toBe(401);

})

it("Must update a company" , async ()=>{
  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token

  const responseCreateUser = await supertest(app).get("/companies/").set("Authorization", `Bearer ${token}`);
  const companies = responseCreateUser.body.shift()
  const response = await request(app)
  .patch(`/companies/${companies.id}`).set("Authorization", `Bearer ${token}`).send({
    name:"new Empresa"
  })
  expect(response.body.name).toEqual("new Empresa")
  expect(response.status).toBe(200);


})
it("update a company invalid token with a non existing user " , async ()=>{
  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token

  const responseCreateUser = await supertest(app).get("/companies/").set("Authorization", `Bearer ${token}`);
  const companies = responseCreateUser.body.shift()
  const response = await request(app)
  .patch(`/companies/${companies.id}`).set("Authorization", `Bearer fake_token`).send({
    name:"new Empresa"
  })
  expect(response.body.message).toEqual("Invalid token")
  expect(response.status).toBe(401);


})
it("delete a company invalid token with a non existing user" , async ()=>{
  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  
  const responseCreateUser = await supertest(app).get("/companies/").set("Authorization", `Bearer ${token}`);
  const companies = responseCreateUser.body.shift()
  const response = await request(app)
  .delete(`/companies/${companies.id}`).set("Authorization", `Bearer fake_token`)
  
  expect(response.body.message).toEqual("Invalid token")
  expect(response.status).toBe(401);

})
it("Must delete a company" , async ()=>{
  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  
  const responseCreateUser = await supertest(app).get("/companies/").set("Authorization", `Bearer ${token}`);
  const companies = responseCreateUser.body.shift()
  const response = await request(app)
  .delete(`/companies/${companies.id}`).set("Authorization", `Bearer ${token}`)
    
  expect(response.status).toBe(204);

})

});