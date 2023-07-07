import cors from "cors"
import express, { Application } from "express"
import { handleError } from "./errors"
import companiesRouter from "./routers/companies.routes"
import loginRouter from "./routers/login.routes"
import userRouter from "./routers/users.routes"
import veiculoRouter from "./routers/veiculos.routes"

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use("/users/", userRouter)
app.use("/companies/", companiesRouter)
app.use("/veiculos/", veiculoRouter)
app.use("/login/", loginRouter)
app.use(handleError)
export default app
