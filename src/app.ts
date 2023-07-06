import express, { Application } from "express"
import userRouter from "./routers/users.routes"
import cors from 'cors'
import companiesRouter from "./routers/companies.routes";
import veiculoRouter from "./routers/veiculos.routes";
import { handleError } from "./errors";

const app: Application = express()
app.use(cors());
app.use(express.json())
app.use("/users/", userRouter)
app.use("/companies/",companiesRouter)
app.use("/veiculos/",veiculoRouter)
app.use(handleError)
export default app



