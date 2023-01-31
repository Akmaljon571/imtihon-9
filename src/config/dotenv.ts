import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT
const KEY = process.env.SECRET_KEY
const sekund = process.env.SEKUND

export { PORT, KEY, sekund }
