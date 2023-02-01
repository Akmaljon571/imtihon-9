import { Router } from "express"
import validate from "../../middleWare/validate"
import verifyToken from "../../middleWare/verifyToken"
import { DELETE, GET, POST } from "./comment"
import { createKarzinka } from "./validate"

export default Router()
  .get("/", verifyToken, GET)
  .post("/create", verifyToken, validate(createKarzinka), POST)
  .delete("/delete", verifyToken, DELETE)
