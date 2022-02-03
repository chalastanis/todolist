//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');



const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));

let items = ['work','gym','eat'];
let workItems = [];

app.get('/', function(req, res) {
    let today = new Date(); //  2/2/2021    
    // let currentDayNum = today.getDay(); //number 0 - 6 0 is sunday
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const options = {
        weekday: 'long', 
        // year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };

    let currentDay = today.toLocaleDateString('en-US',options); //el-GR or en-US etc
    // console.log(currentDay);
    // console.log(items);
    res.render('list', {listTitle: currentDay, itemsList: items});
    
});

app.post('/', function(req, res) {
    console.log(req.body)

    let item = req.body.newItem;
    console.log(req.body.list);
    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
    // console.log(item);
});

app.get('/work', function(req, res) {
    res.render('list', {listTitle: 'Work List',itemsList: workItems});
});

app.post('/work', function(req, res) {
    let item = req.body.newItem; 
    workItems.push(item);
    res.redirect('/work')
});



app.listen(3000, function() {
    console.log('server runs on port 3000');
});