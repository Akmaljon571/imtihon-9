import { Router } from "express"
import validate from "../../middleWare/validate"
import { upload } from "../../utils/multer"
import { Login, loginEmail, Registr, registrEmail } from "./users"
import { createLogin, createRegistr, emailSchema } from "./validate"

export default Router()
  .post("/login", validate(createLogin), Login)
  .post("/registr", upload.single("rasm"), validate(createRegistr), Registr)
  .post("/login/email", validate(emailSchema), loginEmail)
  .post("/registr/email", validate(emailSchema), registrEmail)
