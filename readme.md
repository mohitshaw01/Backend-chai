// always think database is there in another continent
so always use try catcha and async await

// app.use is used for middlewares 

- Postman collection
- https://www.postman.com/red-spaceship-382281/workspace/public/request/19844068-5fea80b9-0420-498e-b86c-387c826d0fd3

// In utils we store those methods which we are going to use regularly

1.npm init
2. change start and type in package.json file
3. NPM Packgage - dotenv to store those variable which you don't want to show to anyone
//
axios 

proxy are used to append the main url into all other urls
<!--  -->
proxy is differenct for vite and create-react-app
<!--  -->

// npm use cors 
CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

1. Data kya store karna hai
2. mongoose for conneting to mongodb
3. How the data fields will be stored (register form)
4. Always think what data will be stored in the databases.

// .gitignore genrator generate all the things that are not requried to push

<!--Professional Setup -->
// File structure

src
index
App
constants
DB
models
controllers
routes
Middlewares
Utils

install -D prettier 
.prettierrc
{
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "semi": true
    "tailingComma" : es5
    }

<!-- models link  -->

<!-- https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj -->

<!-- Database connection -->
1. write all the fields required in teh .env file
like PORT,
2. mongooose ,express,
3.src/db/index.js - connect to database

<!--  -->
1. cors
2. body-parser
//
express.json({limit: "16kb"}): Parses incoming JSON data with a size limit of 16kb.


express.urlencoded({extended: true, limit: "16kb"}): Parses incoming URL-encoded form data with a size limit of 16kb.

express.static("public"): Serves static files from the "public" directory.

cookieParser(): Parses HTTP request cookies and populates req.cookies with an object containing cookie data.

<!-- AsyncHandler.js -->
asyncHandler is a function that takes an asynchronous route handler function (fn) as input. It returns a new function that wraps fn, ensuring any errors within fn are caught and passed to Express's next() function for centralized error handling, preventing server crashes.

<!-- User and Video models -->
1. bcrypt ->  encryption password (hash password)
2. JWT -> json web token (authentication / authorization) 
jwt is a bearer token (like a key)

The generateAccessToken method in a user schema creates a JWT with the user's ID as the payload, signed using a secret key and an expiration time defined by environment variables. This token can be utilized for secure user authentication and authorization in the application.


// upload images/videos on cloudinary
