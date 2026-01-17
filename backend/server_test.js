const express = require('express');
const path = require('path');
const db = require('./db');
//--------------------------------------------------
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//--------------------------------------------------
let posts = [
    {id: 1, title: 'Post 1'},
    {id: 2, title: 'Post 2'},
    {id: 3, title: 'Post 3'},
    {id: 4, title: 'Post 4'},
];

// if its a JSON API, prefix all your endpoints with "API" (?)
// GET all posts
app.get('/api/posts', (req, res) => {
    // res.send(posts);

    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && (limit > 0 && limit <= posts.length)){  // a limit is defined and is within the range of existing posts.
        res.status(200).json(posts.slice(0, limit));
        console.log(`[ > ] Showing ${limit} post(s)`);
    }else{                                                      // a [limit] is not defined.
        res.status(200).json(posts);
        console.log(`[ > ] Showing all post(s)`);
    }

    console.log(req.query);
    console.log();
});

// GET a single post
app.get('/api/posts/:id_sent', (req, res) => {
    const id_sent = parseInt(req.params.id_sent);
    console.log(id_sent);
    console.log(req.params);

    const result = posts.filter((p) => id_sent===p.id);

    if(result.length > 0){
        res.status(200).json(result);
    }else{  
        res.status(404);
    }
    
    // res.status(200).json(posts.filter((p)=>{ 
    //     return p.id===id_sent;
    // }));
});

//--------------------------------------------------

// setup static folder --> we're gonna declare one of our folders to be STATIC --> meaning you can just go to the URL and it will work
// app.use(express.static(path.join(__dirname, '..', 'public'))); 
//--------------------------------------------------

// HTML Pages:

// app.get('/', (req, res) => {
//     // res.sendFile("C:\\Users\\sotoa\\Desktop\\UNINTER\\Atividade Extensionista I\\worker-platform\\public\\index.html");
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
// });

// // test res.json();
// // app.get('/workers', (req, res) => {
// //     const w = [{id: 1},{id: 2}] 
// //     // res.send(w);
// //     res.json(w);
// // });
