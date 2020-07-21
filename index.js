const express = require('express');

//epress exporta uma função
const server = express();

server.use(express.json());

const users = ['diego', 'alves'];

// middlewares
server.use((req, res, next) =>{
    console.time('Request')
    console.log(`Metodo: ${req.method}; URL: ${req.url}`);

    next();

    console.timeEnd('Request');
})

function CheckUsersExists(req, res, next){
    if (!req.body.name){
        return res.status(400).json({error: 'User name is required'});
    }
    return next();
}

function CheckUserInArray(req, res, next){
    const user = users[req.params.index];
    if (!user){
        return res.status(400).json({error: 'User not exist'});
    }
    req.user = user;
    return next();
}

//methods
server.get('/users', CheckUserInArray, (req, res)=>{
    return res.json(users);
})

server.get('/users/:index', CheckUserInArray, (req, res) =>{
    return res.json(req.user);
})

server.post('/users', CheckUsersExists, (req, res) =>{
    const {name} = req.body;
    users.push(name);
    return res.json(users);
})

server.put('/users/:index',CheckUserInArray, CheckUsersExists, (req, res) =>{
    const {index} = req.params;
    const {name} = req.body;
    users[index] = name;
    return res.json(users);
})

server.delete('/users/:index', (req, res) =>{
    const {index} = req.params;
    users.splice(index, 1);
    return res.json(users);

})






server.listen(3000);