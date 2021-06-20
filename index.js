const express = require("express");
const app = express();
app.use(express.json());
//teste

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



/* MONGODB */

const mongodb = require('mongodb')
const password = "Zgvj52aAH9swFrPw";
console.log(password);


const connectionString = `mongodb+srv://admin:${password}@cluster0.sy1ep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};

(async()=>{
    const client = await mongodb.MongoClient.connect(connectionString, options);
    const db = client.db('myFirstDatabase');
    const jogadores = db.collection('jogadores');
    console.log(await jogadores.find({}).toArray());
    
    app.get('/database',
        async function(req, res){
            res.send(await jogadores.find({}).toArray());
        }
    );

    app.get('/database/:id',
        async function(req, res){
            const id = req.params.id;
            const jogador = await jogadores.findOne(
                {_id : mongodb.ObjectID(id)}
            );
            console.log(jogador);
            if (!jogador){
                res.send("Jogador não relacionado");
            } else {
                res.send(jogador);
            }
        }
    );

    app.post('/database', 
        async (req, res) => {
            console.log(req.body);
            const jogador = req.body;
        
            delete jogador["_id"];

            jogadores.insertOne(jogador);        
            res.send("Adicionar jogador.");
        }
    );

    app.put('/database/:id',
        async (req, res) => {
            const id = req.params.id;
            const jogador = req.body;

            console.log(jogador);

            delete jogador["_id"];

            const num_jogadores = await jogadores.countDocuments({_id : mongodb.ObjectID(id)});

            if (num_jogadores !== 1) {
                res.send('Ocorreu um erro por conta do número de jogadores');
                return;
            }

            await jogadores.updateOne(
                {_id : mongodb.ObjectID(id)},
                {$set : jogador}
            );
        
            res.send("Escalação atualizada com sucesso.")
        }
    );

    app.delete('/database/:id', 
        async (req, res) => {
            const id = req.params.id;
        
            await jogadores.deleteOne({_id : mongodb.ObjectID(id)});

            res.send("Jogador cortado da seleção");
        }
    );

})();