const express = require("express");
const app = express();
const users = require("./users");
const cards = require("./card");

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

app.post("/booster", cards.booster)

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});
