const express=require("express")
const app=express()
require("colors")


const PORT=3000;
const server=app.listen(PORT,()=>{

process.on("unhandledRejection",(error)=>{
    console.log(`server halted:${error.messgae}`.bgRed);
    server.close();
    process.exit(1)
})

// importing database
const db = require('./config/mongoose');

// importing Schema for task
const Task = require('./models/task');

//using static files
app.use(express.static("./views"));

// to use encrypted data
app.use(express.urlencoded());

//set up the views engine
app.set('view engine', 'ejs');
app.set('views', './views');

// rendering the APP Page
app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});

// creating task
app.post('/create-task', (req, res) => {
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, (err, newtask) => {
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('back');
    });
});

// deleting task
app.get('/delete-task', (req, res) => {
    id = req.query;
    var count = Object.keys(id).length;
    for(let i=0; i<count; i++){
        Task.findByIdAndDelete(Object.keys(id)[i], (err) => {
            if(err){
                console.log(err);
            }
        })
    }
    return res.redirect('back');
});

console.log(`server is running on ${PORT}`.bgGreen);
});