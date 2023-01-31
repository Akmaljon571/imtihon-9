import { app, dataSourse, PORT } from "./config"

const main = async (): Promise<void> => {
  try {
    await dataSourse.initialize()
  } catch (error) {
    console.log(error)
  } finally {
    app.listen(PORT, () => console.log("Server run 🚀 in: " + PORT))
  }
}
main()
