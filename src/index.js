import connectDatabase from "./db/index.js";


connectDatabase().then( () => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('server is running at port')
    });
    // 
    app.on(error, () =>{
        console.log(`Err ${error}`)
        throw err;
    })
}).catch((err) => {
    console.log(`Failed to connect ${err}`) 
});