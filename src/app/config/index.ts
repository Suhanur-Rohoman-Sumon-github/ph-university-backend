import dotenv from 'dotenv'
dotenv.config()
export default {
  node_Env:  process.env.Node_Env,
  port: process.env.PORT,
  database_url: process.env.Database_Url,
  bcrypt_salt_round: process.env.bcrypt_salt_round,
  default_password: process.env.default_password,
}
