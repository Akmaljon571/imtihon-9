import { Router } from "express"
import validate from "../../middleWare/validate"
import verifyAdmin from "../../middleWare/verifyAdmin"
import verifyToken from "../../middleWare/verifyToken"
import { DELETE, GET, POST, PUT } from "./subCategory"
import { createSubCategory, updateSubCategory } from "./validate"

export default Router()
  .get("/", verifyToken, GET)
  .post("/create", validate(createSubCategory), verifyAdmin, POST)
  .put("/update/:id", validate(updateSubCategory), verifyAdmin, PUT)
  .delete("/delete/:id", verifyAdmin, DELETE)
