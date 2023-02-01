import { Router } from "express"
import validate from "../../middleWare/validate"
import verifyAdmin from "../../middleWare/verifyAdmin"
import verifyToken from "../../middleWare/verifyToken"
import { DELETE, GET, POST, PUT } from "./category"
import { createCategory, updateCategory } from "./validate"

export default Router()
  .get("/", verifyToken, GET)
  .post("/create", validate(createCategory), verifyAdmin, POST)
  .put("/update/:id", validate(updateCategory), verifyAdmin, PUT)
  .delete("/delete/:id", verifyAdmin, DELETE)
