import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import app from './app'
const port = 5000
async function main() {
  try {
    await mongoose.connect(`${process.env.Database_Url}` as string)
    app.listen(port, () => {
      console.log(`app is  listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main()
