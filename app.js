// npm init
// npm i express
// npm i nodemon
// npm i mongoose

const express = require("express")
const ejs = require("ejs")

const app = express()

const mongoose = require(mongoose)

const methodOverride = require(method-override)

const Post = require("./models/Post")
const postController = require("./controllers/postControllers")
const pageController = require("./controllers/pageControllers")

mongoose.set("strictQuery", false)

mongoose
    .connect("mogodb+srv")
    .then(()=>{
        console.log("Database connected")
    })
    .catch((err)=>{
        console.log(err)
    })

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(express.urlencoded({extends: true}))
app.use(express.json())

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
)

app.get("/", postController.getAllPost)
app.get("/about", pageController.getAboutPage)
app.get("/addpost", pageController.getAddPage)
app.post("/add", postController.addPost)

app.get("/myposts/:id", pageController.getPostPage)
app.delete("/post/:id", postController.deletePost)
app.post("/post/edit/:id", pageController.getEditPage)
app.put("/post/update/:id", postController.editPost)

const port = 3000;

app.listen(port, ()=>{
    console.log("server started")
})


