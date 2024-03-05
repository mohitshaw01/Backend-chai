// import connectDatabase from "./db/index.js";


// connectDatabase().then( () => {
//     app.listen(process.env.PORT || 3000, () => {
//         console.log('server is running at port')
//     });
//     // 
//     app.on(error, () =>{
//         console.log(`Err ${error}`)
//         throw err;
//     })
// }).catch((err) => {
//     console.log(`Failed to connect ${err}`) 
// });

//
import databaseConnection from "./db/index";
import { configDotenv } from "dotenv";
import {app} from './app'

configDotenv("./env")
// 

databaseConnection()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port ${process.env.PORT}`);
    })
})
.catch((error) =>{
    console.log(`Mongodb database connection failed ${error}`);
})
