const express = require("express");
 const app = express();
 app.use(express.json());
 

 var cors = require('cors');
 app.use(cors());

 app.listen(process.env.PORT || 3000);

const jogadores =[
    {Jogador: "Alisson", time: "Liverpool",posição:"Goleiro"},  
    {Jogador: "Thiago Silva", time: "Chelsea",posição:"Zagueiro"},
    {Jogador: "Casemiro", time: "Real Madrid",posição:"Volante"},
    {Jogador: "Neymar", time: "PSG",posição:"Atacante"}
];

app.get('/jogadores',
 function (req,res){
     res.send(jogadores);
 }
)

app.get('/jogadores/:id',
    function(req, res){
        const id = req.params.id - 1;
        const jogador = jogadores[id];

        if (!jogador){
            res.send("Jogador não encontrado");
        } else {
            res.send(jogador);
        }
    }
)

app.post('/jogadores', 
    (req, res) => {
        console.log(req.body);
        const jogador = req.body;
        jogadores.push(jogador);
        res.send("Adicionar um jogador")
    }
);

app.put('/jogadores/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const jogador = req.body;
        jogadores[id] = jogador;        
        res.send("Escalação atualizada com sucesso")
    }
);

app.delete('/jogadores/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete jogadores[id];

        res.send("Jogador removido com sucesso");
    }
);

/*
Zgvj52aAH9swFrPw

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0.sy1ep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/
