const express = require("express");

//set up a new app using express
const app= express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//create an array of items
const items = [];
const bulkItems = []; //array of bulk items

//create a root route for the get method
app.get('/', function(req, res) {
    res.render("list", {listName: "Shopping List", listItems:items}) ; //send items array to list.ejs
});

//add a bulk items route
app.get('/bulk', function(req, res) {
    res.render("list", {listName: "Bulk Items", listItems:bulkItems}) ; //send items array to list.ejs
});


//retrieve data and display it on the screen
app.post('/', function(req,res){
    const query = req.query.newItem; //retrieve an item from the querystring
    console.log(query);
    const item = req.body.newItem; //retrieves the item from the body
    const list = req.body.list; //retrieve name of the list
   
    if(typeof(query)!="undefined") //check to see if it is not blank
    {
        items.push(query);
        res.redirect("/");
    }
    if(typeof(item)!="undefined")
    {
        if(list === "Shopping List") 
        {
            items.push(item);
            res.redirect("/");
        }
        else
        {
            bulkItems.push(item);
            res.redirect("/bulk");
        }
    }
});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox; 
    const list = req.body.thisList;
    if(list === "Shopping List")
    {
        items.splice(checkedItemId, 1); //delete the checked item from the array
        res.redirect("/"); //redirects back to home page
    }
    else
    {
        bulkItems.splice(checkedItemId, 1);
        res.redirect("/bulk");
    }

});

//run on port 3000
app.listen(3000, function() {
    console.log("Server started on port 3000");
});