const express = require('express');

//epress exporta uma função
const server = express();

//passa uma funcao com oq deve ser feito
// req caminhos
// res informações da resposta

// query params =?teste=1
// route params =/users/1
// reequest body = {"name":"..."}
server.get('/users/:id', (req, res) =>{
    const { id } = req.params;

    return res.json({message: `buscando o usuario ${id}`});
})


server.listen(3000);