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

app.post("/user", users.User);

app.post("/logout", users.Disconnect);

app.post("/booster", cards.Booster)

app.get("/cards", cards.Cards);

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
    console.log("  ___                    _              _____  ____ _   __ ________   _________   _ ");
    console.log(" / _ \\                  | |            | ___ \\  _  | | / /|  ___|  \\/  |  _  | \\ | |");
    console.log("/ /_\\ \\_ __   __ _ _   _| | __ _ _ __  | |_/ / | | | |/ / | |__ | .  . | | | |  \\| |");
    console.log("|  _  | '_  \\/ _` | | | | |/ _` | '__| |  __/| | | |    \\ |  __|| |\\/| | | | | . ` |");
    console.log("| | | | | | | (_| | |_| | | (_| | |    | |   \\ \\_/ / |\\  \\| |___| |  | \\ \\_/ / |\\  |");
    console.log("\\_| |_/_| |_|\\__, |\\__,_|_|\\__,_|_|    \\_|    \\___/\\_| \\_/\\____/\\_|  |_/\\___/\\_| \\_/");
    console.log("              __/ |                                                                 ");
    console.log("             |___/                                                                  ");
});

app.use(cors({
    origin: 'http://localhost:4200' //Accès accordé à localhost:4200 uniquement !
}));
