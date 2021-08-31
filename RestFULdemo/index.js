//Our base resource was /comments for this mini project


const express = require('express'); //we Require it because we need to do this so we can use the package
const app = express();  //We are initalzing express here 
const path = require('path');   //Helps us make an absolute path to our views directory
//method overriding
const methodOverride = require('method-override');

//Destructing renaming v4 to uuid and requiring the uuid npm
const { v4: uuid } = require('uuid');
uuid();
//This is us stating how we should parse the request bodies
app.use(express.urlencoded({ extended: true })); //app.use = a way of running some code or function on every single request 
//In this line we are choosing to parse our body as url encoded data 
app.use(express.json());    //Parse incoming json requests
app.use(methodOverride('_method'))  //_method is the string we are looking for in our query string (it looks for ?_method=HTTPVERB)
//The above .use is seen in edit.ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'dimibeats',
        comment: 'I like to go birdwatching with my dog'

    },
    {
        id: uuid(),
        username: 'liamYumps',
        comment: 'Plz delete your account,todd'
    },
    {
        id: uuid(),
        username: 'Ransuki',
        comment: 'Woof woof'
    }
];
//This is the root route to send a get requests for your comments
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments }) //This is rendering the ejs template in the comments folder that is called index.ejs and this is all found in the views folder
    //The second argument is passing in the comments array so we can use it on our EJS templaate
})
//This is your route to serve the form /renders a form
//This is also known as our GET route
//NEW part of the resful
//Used to create a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

//THis is where to form submits its data too and we extract it from the body
//This is also known as our CREATE part of CRUD
//This is our POST route
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    //The last arg of .push is used to create a new id using the uuid for each new comment
    comments.push({ username, comment, id: uuid() });   //Appends the username and comment to our comments array
    res.redirect('/comments')   //This redircts to user to /comments which is a get request (look above  ) (we do this so when the form is submitted the user goes to another page and they do not keep going to the same page to keep sending post requests)
})
//This is our show route
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;  //This is used to retrive the id from the URL
    //Arrow function that passes in the comments array as the param
    const comment = comments.find(c => c.id === id);    //C is our param(comments array) for the callback so this is saying find our comment id that matches the url id 
    res.render('comments/show', { comment });
})
//This is our edit form to make comment patches(edits)(update part of crud still)
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})
//This is the update part of CRUD
//update route ( you can use the verb patch or put they are similar but the way they update a comment is different)
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment; //Gets what you want to update your current comment w/ from the req.body.comment
    const foundComment = comments.find(c => c.id === id);
    //this is saying id.comment = newCommentText the .comment part is the key for the value of the current comment we are looking at
    foundComment.comment = newCommentText;
    res.redirect('/comments');

})

//Delete route and Delete part of crud
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    //Updates the comments array
    comments = comments.filter(c => c.id !== id);   //Filter everything out into a new array where the id of the comment does not match the id of the url (so filter all elements that do not have the same id as the url into a new Array)
    //Line 92 delets to comment 
    res.redirect('/comments');

})




//This is how to create get route for /tacos
app.get('/tacos', (req, res) => {
    //Res.send sends the HTTP response
    res.send("Get /tacos repsonse");
})

//This is creating a post route for /tacos
app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body
    res.send(`Ok, here are your ${qty} ${meat} tacos`);

});

//RESTful Comment Overview
/* /comments will be our resource (this is our base path)
    Then, have different HTTP verbs: (verbs are all caps)
        (index route) GET /comments - list all comments
        (Create route) POST /comments - create a new comment
        (Show route) GET /comments/:id - get 1 comment using ID
        (update route) PATCH/comments/:id - This updates a comment
        (delete/destroy route) DELETE/comments/:id - remove or destroy one comment
        * NOTICE How the url/path is the exact same however it just has different HTTP methods before it this is because we are using RESTful APIS
        * SIDE NOTE: CRUD = CREATE READ UPDATE DELETE
*/






//This opens up our port3000 so we can use it as a server to run our webpage
app.listen(3000, () => {
    console.log('On port 3000');
})