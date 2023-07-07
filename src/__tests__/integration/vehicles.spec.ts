
import supertest from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm"
import request from "supertest";
import * as M from "../__mocks__/users/users.mocks";
import * as V from "../__mocks__/vehicles/vehicles.mocks"
describe("Veiculos API", () => {
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

});
afterAll(async () => {
  await connection.destroy();
});

  let token :string 
    
    
    
it("Must create a company", async () => {


  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/users").set("Authorization", `Bearer ${token}`);
  const user = responseCreateUser.body.shift()
  const response = await request(app)
  .post(`/veiculos/${user.id}`).send(V.mockedVehicles)
  .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(201);

})
it(" create a vehicles invalid token with a non existing user ", async () => {

  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/users").set("Authorization", `Bearer ${token}`);
  const user = responseCreateUser.body.shift()
  const response = await request(app)
  .post(`/veiculos/${user.id}`).send(V.mockedVehicles)
  .set("Authorization", `Bearer fake_token`);

  expect(response.body.message).toEqual("Invalid token")
  expect(response.status).toBe(401);

})

it("create a vehicles invalid token with a non existing user", async () => {


  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/veiculos").set("Authorization", `Bearer ${token}`);
  const veiculos = responseCreateUser.body.shift()
  const response = await request(app)
  .patch(`/veiculos/${veiculos.id}`)
  .set("Authorization", `Bearer fake_token`).send({
    name:"marca Update"
  });

  expect(response.body.message).toEqual("Invalid token")
  expect(response.status).toBe(401);

})

it("Must create a Vehicles", async () => {


  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/veiculos").set("Authorization", `Bearer ${token}`);
  const veiculos = responseCreateUser.body.shift()
  const response = await request(app)
  .patch(`/veiculos/${veiculos.id}`)
  .set("Authorization", `Bearer ${token}`).send({
    name:"marca Update"
  });

  expect(response.body.name).toEqual("marca Update")
  expect(response.status).toBe(200);

})
it("Delete a vehicles invalid token with a non existing user", async () => {


  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/veiculos").set("Authorization", `Bearer ${token}`);
  const veiculos = responseCreateUser.body.shift()
  const response = await request(app)
  .delete(`/veiculos/${veiculos.id}`)
  .set("Authorization", `Bearer fake_token`)

  expect(response.body.message).toEqual("Invalid token")
  expect(response.status).toBe(401);

})

it("Must Delete a Vehicles", async () => {


  const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
  token = login.body.token
  const responseCreateUser = await supertest(app).get("/veiculos").set("Authorization", `Bearer ${token}`);
  const veiculos = responseCreateUser.body.shift()
  const response = await request(app)
  .delete(`/veiculos/${veiculos.id}`)
  .set("Authorization", `Bearer ${token}`)

  expect(response.status).toBe(204);

})


})