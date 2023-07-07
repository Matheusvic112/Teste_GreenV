import supertest from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm"
import request from "supertest";
import * as M from "../__mocks__/users/users.mocks";

describe("User API", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
        .then((res) => {
            connection = res;
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });

});
afterAll(async () => {
  await connection.destroy();
});
let token :string 
let userCreated = {} as any


  it("Must create a user", async () => {
 
    const response = await supertest(app).post("/users").send(M.mockedUser);
    userCreated = response.body;
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual("Matheus Silva")
    expect(response.body.cpf).toEqual("12345678978")
    expect(response.body.email).toEqual("matheus@example.com")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.phone).toEqual("(99) 9999-9999")

  });
  it("Login a user" , async () =>{
    const login = await supertest(app).post(`/login/`).send(M.mockedLogin);
    token = login.body.token
  
    const response = await request(app)
    .get(`/users/${userCreated.id}`)
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id")
  })
  it("Get invalid token with a non existing user   " , async () =>{

    const response = await request(app)
    .get(`/users/${userCreated.id}`)
    .set("Authorization", `Bearer fake_token`);

    expect(response.status).toBe(401);
  })
  it("user update" , async ()=>{

    const response = await request(app)
    .patch(`/users/${userCreated.id}`)
    .set("Authorization", `Bearer ${token}`).send({
      name:"Matheus Vicente"
    });
    expect(response.body).toHaveProperty("name")
    expect(response.body.name).toBe("Matheus Vicente")
    expect(response.status).toBe(200);

  })
  it("user update invalid token with a non existing user" , async ()=>{

    const response = await request(app)
    .patch(`/users/${userCreated.id}`)
    .set("Authorization", `Bearer fake_token`).send({
      name:"Matheus Vicente"
    });
    expect(response.body.message).toEqual("Invalid token")
    expect(response.status).toBe(401);

  })
  it("User delete" , async ()=>{
    const response = await request(app)
    .delete(`/users/${userCreated.id}`)
    .set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(204);
  })
  it("User delete invalid token with a non existing user" , async ()=>{
    const response = await request(app)
    .delete(`/users/${userCreated.id}`)
    .set("Authorization", `Bearer fake_token`)
    expect(response.body.message).toEqual("Invalid token")

    expect(response.status).toBe(401);
  })
});