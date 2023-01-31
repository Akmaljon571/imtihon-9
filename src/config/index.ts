import { app } from "./app"
import { KEY, PORT, sekund } from "./dotenv"
import { dataSourse } from "./ormconfig"
import { fetchRedis } from "./redis"
const SEKUND = Number(sekund)

const tekshiruv = (): void => {
  if (!PORT) {
    console.log(".env Ichiga portni berin aka!!!")
  }

  if (!KEY) {
    console.log("env ichiga secret key berin aka!!!")
  }

  if (!SEKUND) {
    console.log("env ichiga SEKUND ni berin aka!!!")
  }
  if (typeof SEKUND !== "number") {
    console.log("env ichidagi kiritgan SEKUNDni number xolatda harf qoshmay berin aka")
  }
}
tekshiruv()

export { dataSourse, KEY, PORT, SEKUND, app, fetchRedis }
