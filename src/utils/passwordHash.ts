import { createCipheriv } from "crypto"
import crypto from "crypto"

const algorithm = "aes-256-cbc"
const key: Buffer = crypto.randomBytes(32)
const iv: Buffer = crypto.randomBytes(16)

export const hash = (pass: string): string => {
  const mykey = createCipheriv(algorithm, Buffer.from(key), iv)
  let mystr = mykey.update(pass, "utf8", "hex")
  mystr += mykey.final("hex")
  return mystr
}

export const decrypt = (hash: string): string => {
  const mykey = createCipheriv(algorithm, key, iv)
  let mystr = mykey.update(hash, "hex", "utf8")
  mystr += mykey.final("utf8")
  return mystr
}
