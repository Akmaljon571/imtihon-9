import fs from "fs"
import path from "path"

export const unlink = (filename: string): void => fs.unlinkSync(path.join(process.cwd(), "src", "uploads", filename))
