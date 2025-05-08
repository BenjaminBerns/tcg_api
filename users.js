const fs = require('fs');
const path = require('path');

function RegisterUser(req, res)
{
    
    console.log(req.body);
    if(!req.body)
    {
        res.status(400).json({"message": "Erreur : Aucune données"});
        return;
    }

    let username = req.body.username;
    let password = req.body.password;
    let id = 0;
    const filePath = path.join(__dirname, 'data/user.json');

    if (!username || !password) {
        res.status(400).json({ "message": "Erreur : Username ou mot de passe manquant " });
    }

    let users = [];
    const fileData = fs.readFileSync(filePath, 'utf-8');
    users = JSON.parse(fileData);

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: "Erreur : Username déjà existant" });
    }


    try {
        // Lire le fichier existant
        let users = [];
        const fileData = fs.readFileSync('data/user.json', 'utf-8');
        users = JSON.parse(fileData);

        id = users.length + 1;
        const collection = [];
        const token = "";
        const lastBooster = "";

        // Ajouter le nouvel utilisateur
        const user = {
            id: id,
            username: username,
            password: password,
            collection: collection,
            token: token,
            lastBooster: lastBooster
        };
        users.push( user );

        // Réécrire le fichier avec la nouvelle liste
        fs.writeFileSync('data/user.json', JSON.stringify(users), 'utf-8');

        // Répondre au client
        res.status(201).json({
            message: "Utilisateur enregistré avec succès",
            id: id,
            user: username,
            password: password
        });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
        res.status(500).json({ message: "Erreur serveur lors de l'enregistrement" });
    }

    res.json({"message": "OK"});
}

function Login(req, res)
{
    if(!req.body)
    {
        res.status(400).json({"message": "Erreur : Aucune données"});
        return;
    }
    
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(400).json({ "message": "Erreur : Username ou mot de passe manquant " });
    }

    let users = [];
    const fileData = fs.readFileSync('data/user.json', 'utf-8');
    users = JSON.parse(fileData);

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
    }


    let TokenGenerator = require( 'token-generator' )({
        salt: 'your secret ingredient for this magic recipe',
        timestampMap: 'abcdefghij',
    });

    let token = TokenGenerator.generate();

    for (let i = 0; i < users.length; i++){
        if (user.username == users[i].username && user.password == users[i].password) {
            users[i].token = token;
        }
    }

    fs.writeFileSync('data/user.json', JSON.stringify(users), 'utf-8');

        res.status(201).json({
            message: "Authentification réussi !",
            user: username,
            data:
            {
                token: token
            }
        });
}

function User(req, res) {
    if (!req.body) {
        res.status(400).json({ "message": "Erreur : Aucune données" });
        return;
    }

    let token = req.body.token;

    const dataUsers = fs.readFileSync("data/user.json", "utf8");

    // On parse pour l'utiliser comme liste
    let users = JSON.parse(dataUsers);

    let user = users.find(u => u.token === token);
    console.log(user);
    if (user && token) {
        return res.status(200).json({
            message: "Utilisateur trouvé",
            data: {
                user: user
            }
        });
    } else {
        res.status(400).json({ "message": "Erreur : Token invalide" });
    }
}


function Disconnect(req, res) {

    if(!req.body)
    {
        res.status(400).json({"message": "Erreur : Aucune données"});
        return;
    }

    const fileData = fs.readFileSync('data/user.json', 'utf-8');

    users = JSON.parse(fileData);

    let token = req.body.token;

    const user = users.find(u => u.token === token);
    

    for (let i = 0; i < users.length; i++){
        if (user.token == users[i].token) {
            users[i].token = "";
        }
    }

    fs.writeFileSync('data/user.json', JSON.stringify(users), 'utf-8');

    res.status(201).json({
            message: "Déconnection réussi !",
            data:
            {
                user: user
            }
        });
}

module.exports = { RegisterUser, Login, User, Disconnect };