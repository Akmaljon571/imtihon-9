import multer from "multer"
import path from "path"
import { v4 } from "uuid"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const url = path.join(process.cwd(), "src", "/uploads")
    cb(null, url)
  },
  filename: function (req, file, cb) {
    cb(null, v4() + path.extname(file.originalname))
  },
})
export const upload: multer.Multer = multer({ storage: storage })
