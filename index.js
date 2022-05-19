const express = require("express");
const app = express();
const fs = require("fs")

app.use("/static", express.static("public"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    raw = fs.readFileSync('data/data.json')
    data = JSON.parse(raw)
    res.render('todo.ejs', {todoTasks: data});
})

app.post('/', (req, res) => {
    if (req.body.content === null || req.body.content === "") {
        res.redirect("/");
        return
    }
    raw = fs.readFileSync('data/data.json')
    data = JSON.parse(raw)
    
    data.push({"id": data.length >= 1 ? data[data.length - 1].id + 1 : 0, "message": req.body.content})
    fs.writeFileSync('data/data.json', JSON.stringify(data))
    res.redirect("/");
})

app.get('/remove/:id', (req, res) => {
    raw = fs.readFileSync('data/data.json')
    data = JSON.parse(raw)
    let indexx = 0
    data.forEach(function (item, index) {
        if (item.id == req.params.id) {
            indexx = index
        }
    })
    if(data.length == 1) {
        fs.writeFileSync('data/data.json', JSON.stringify([]))
    } else if (indexx == 0) {
        data.shift()
        fs.writeFileSync('data/data.json', JSON.stringify(data))
    }  else {
        spliced = data.splice(indexx, indexx)
        fs.writeFileSync('data/data.json', JSON.stringify(data))
    }
    
    res.redirect("/");
})

app.listen(3000)