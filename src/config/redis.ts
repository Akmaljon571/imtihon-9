import { createClient } from "redis"
import ErrorHandle from "../error/ErrorHandle"

export const fetchRedis = async () => {
  try {
    const client = createClient()

    client.on("error", (err): void => console.log(err))
    client.on("connect", (): void => console.log("Connect"))

    await client.connect()
    return client
  } catch (error) {
    console.log(error)
    throw new ErrorHandle("Error in Redis", 422)
  }
}
