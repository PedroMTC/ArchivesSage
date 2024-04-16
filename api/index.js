import express from "express"
import userRoutes from "./routes/users.js"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())

// const corsOptions = {
//     // origin: 'http://localhost:3000/',
//     credentials: false,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "http://localhost:3000/");
//     res.header('Access-Control-Allow-Headers', true);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
// });


app.use("/", userRoutes)

app.listen(8800)