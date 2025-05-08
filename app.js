const express = require("express");
const app = express();
const users = require("./users");
const cards = require("./card");
const cors = require('cors');

app.use(cors()); // autorise toutes les origines

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json(
        {
            message : "Bienvenue sur l'API TCG",
            data : {}
        }
    );
});

app.post("/register", users.RegisterUser);

app.post("/login", users.Login);

app.get("/user", users.User);

app.post("/disconnect", users.Disconnect);

app.post("/booster", cards.Booster)

app.get("/cards", cards.Cards);

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});

app.use(cors({
    origin: 'http://localhost:4200' //Accès accordé à localhost:4200 uniquement !
}));
