import express from "express";
import connect from "./Database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import passportConfig from './Config/passport.js'
import * as dotenv from 'dotenv'
import router from './Routes/index.js'
dotenv.config();

const app = express();
const PORT = 4000;
await connect();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.use("/",router);

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
