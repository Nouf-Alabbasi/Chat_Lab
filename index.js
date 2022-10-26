let express = require("express");
let app = express();
app.use(express.json());

let Datastore = require("nedb");
let db = new Datastore("chats.db");
db.loadDatabase();


// const PORT = 3000
let port = process.env.PORT || 3000;
app.listen(port, ()=> {
console.log('listening at ', port);
});

msgs = [];

// go the html site in this file
app.use("/", express.static("public"));



// now that we used this route for post we can't use it to get
app.post("/message",(req,res) =>{
    // msgs.push(req.body); //we used to use this to store the messages but now we'll send it to the db
    
    db.insert(req.body, (err, newDoc) =>{ 
        if (err){
            res.send({"task":"failed"});
        }
        else{
            res.send({"tesk" : "successful"});
        }
    });
    console.log(msgs);

})


app.get("/messages", (req,res) => {
    db.find({}, function (err, docs) {
        if (err){
            res.send({"task":"failed"});
        }
        else{
            console.log(docs);
            res.send({"msgs": docs});
        }
    });

    // res.json({
    //     "msgs" : msgs
    // })
})

app.listen(3000, ()=>{
    console.log("server is running")
})