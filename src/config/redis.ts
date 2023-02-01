import { createClient } from "redis"
import ErrorHandle from "../error/ErrorHandle"
import { SEKUND } from "./index"

export const fetchRedis = async () => {
  try {
    const client = createClient()

    client.on("error", (err): void => console.log(err))
    client.on("connect", (): void => console.log("Connect"))

    setTimeout(async () => {
      await client.del("allCategory")
      await client.del("allsubCategory")
      await client.del("allKarzinka")
      await client.del("allComment")
    }, SEKUND)

    await client.connect()
    return client
  } catch (error) {
    console.log(error)
    throw new ErrorHandle("Error in Redis", 422)
  }
}
