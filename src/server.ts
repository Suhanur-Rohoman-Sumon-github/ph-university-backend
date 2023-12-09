import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
console.log(config.database_url)
async function main() {
  try {
    await mongoose.connect(process.env.Database_Url as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main()
