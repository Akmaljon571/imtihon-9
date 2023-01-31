import { fetchRedis, SEKUND } from "../../config"

export default async (): Promise<void> => {
  const client = await fetchRedis()
  if (typeof SEKUND === "number") {
    setTimeout(async (): Promise<void> => {
      const cacheLogin: any = await client.get("allLogin")
      const cacheRegist: any = await client.get("allRegistr")

      const allLogin: any[] | null = JSON.parse(cacheLogin)
      const allRegistr: any[] | null = JSON.parse(cacheRegist)

      if (allLogin && allLogin.length) {
        const newLogin = allLogin.filter((e) => e.email != allLogin[0].email)
        await client.set("allLogin", JSON.stringify(newLogin))
      }

      if (allRegistr && allRegistr.length) {
        const newRegistr = allRegistr.filter((e) => e.email != allRegistr[0].email)
        await client.set("allRegistr", JSON.stringify(newRegistr))
      }
    }, SEKUND)
  }
}

// allLogin
// allRegistr
