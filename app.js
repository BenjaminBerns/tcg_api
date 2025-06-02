const express = require("express");
const app = express();
const users = require("./users");
const cards = require("./card");
const cors = require('cors');
const sequelize = require("./config/db");
const User = require('./Models/users');

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

app.post("/user", users.Users);

app.post("/logout", users.Disconnect);

app.post("/booster", cards.Booster)

app.get("/cards", cards.Cards);

app.post("/getCards", cards.GetCardsByToken);

app.post("/getCardsBooster", cards.GetCardsBooster);

app.post("/convert", users.Convert);

app.get("/getAllUser", users.getAllUsers);

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
    console.log("  ___                    _              _____  ____ _   __ ________  __________   _ ");
    console.log(" / _ \\                  | |            | ___ \\  _  | | / /|  ___|  \\/  |  _  | \\ | |");
    console.log("/ /_\\ \\_ __   __ _ _   _| | __ _ _ __  | |_/ / | | | |/ / | |__ | .  . | | | |  \\| |");
    console.log("|  _  | '_  \\/ _` | | | | |/ _` | '__| |  __/| | | |    \\ |  __|| |\\/| | | | | . ` |");
    console.log("| | | | | | | (_| | |_| | | (_| | |    | |   \\ \\_/ / |\\  \\| |___| |  | \\ \\_/ / |\\  |");
    console.log("\\_| |_/_| |_|\\__, |\\__,_|_|\\__,_|_|    \\_|    \\___/\\_| \\_/\\____/\\_|  |_/\\___/\\_| \\_/");
    console.log("              __/ |                                                                 ");
    console.log("             |___/                                                                  ");
});

//app.use(cors({
  //  origin: 'http://localhost:4200' //Accès accordé à localhost:4200 uniquement !
//}));
