require('dotenv').config();
const tcp = require("./tcp")
const express = require("express")
const app = express()
const axios = require("axios")
const fs = require("fs")

app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs")

app.get('/', (req, res) => {
})

app.get('/:id', (req, res) => {
    const id = req.params.id
    axios.get(`${process.env.MONGO_API_URL}/getAll`).then(result => {
        data = result.data
        // delete data["id"]
        for(i = 0; i < data.length; i++) {
            if (data[i]._id == id) {
                delete data[i]
            }
        }
        // console.log(data)
        res.render('todo.ejs', {users: data, messages: null, user: id, destination: null});
    })
})

app.get('/:id/:destination', (req,res) => {
    const id = req.params.id
    const destination = req.params.destination
    axios.get(`${process.env.MONGO_API_URL}/getAll`).then(result => {
        data = result.data
        // delete data["id"]
        for(i = 0; i < data.length; i++) {
            if (data[i]._id == id) {
                delete data[i]
            }
        }
        axios.get(`${process.env.MONGO_API_URL}/getMessages/${id}-${destination}`).then(result => {
            res.render('todo.ejs', {users: data, messages: result.data, user: id, destination: destination});
        })
        // console.log(data)
        
    })
})

app.post('/send/:id/:destination', (req,res) => { 
    const id = req.params.id
    const destination = req.params.destination
    content = req.body.content
    axios.post(`${process.env.MONGO_API_URL}/sendMessage`, {
        message: req.body.content,
        adress: id,
        destination: destination
    })
    res.redirect(`/${id}/${destination}`)
})

app.post('/', (req, res) => {
    res.redirect("/")
})


const PORT = process.env.PORT || 8080
// tcp.addUser("vanek01", "vanek01", "d8mjrm_Xa")
// tcp.getUsers()
// tcp.sendMessage("braurbeki", "vanek", "privet")
// tcp.recieveMessages("braurbeki", "vanek")
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`)
})