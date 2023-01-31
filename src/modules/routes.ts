import { Router } from "express"
import router from "./users/router"

export default Router().use("/auth", router)
