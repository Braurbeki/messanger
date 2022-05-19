require('dotenv').config();
const express = require("express")
const app = express()
const fs = require("fs")

app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('todo.ejs')
})

app.post('/', (req, res) => {
    res.redirect("/")
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`)
})