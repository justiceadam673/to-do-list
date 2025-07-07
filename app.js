const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")


const app = express();

const items = [];
const workItems = []; 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));  
app.use(express.static("public"));
app.use(express.json());

app.get('/', function(req, res){

    const day = date.getDate();

    res.render("lists", {listTitle: day, newListItems: items});

});

app.post('/', function(req, res) {

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    } 

})

app.post('/edit', function(req, res) {
    const { index, newText, listTitle } = req.body;
    if (listTitle === "Work List") {
        workItems[index] = newText;
    } else {
        items[index] = newText;
    }
    res.sendStatus(200);
});

app.post('/delete', function(req, res) {
    const { index, listTitle } = req.body;
    if (listTitle === "Work List") {
        workItems.splice(index, 1);
    } else {
        items.splice(index, 1);
    }
    res.sendStatus(200);
});

app.get('/work', function(req, res) {
    res.render("lists", {listTitle: "Work List", newListItems: workItems})
})

app.post('/work', function(req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work')
})


app.get('/about', function(req, res) {
    res.render("about")
})


app.listen(5000, function(){
    console.log("Server is running on port 5000");
})