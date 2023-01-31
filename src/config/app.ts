import { errorhandle } from "../middleWare/errorhande"
import express, { Application, Request, Response } from "express"
import routes from "../modules/routes"
import path from "path"

const app: Application = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, "..", "uploads")))
app.use(routes)
app.use(errorhandle)
app.all("/*", (_: Request, res: Response) => res.sendStatus(404))

export { app }
