import { Router } from "express"
import routerAuth from "./users/router"
import routerCategory from "./category/router"
import routerSubCategory from "./subCategory/router"
import routerKarzinka from "./karzinka/router"

export default Router()
  .use("/auth", routerAuth)
  .use("/category", routerCategory)
  .use("/subCategory", routerSubCategory)
  .use("/karzinka", routerKarzinka)
