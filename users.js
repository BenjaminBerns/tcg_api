const fs = require('fs');
const path = require('path');
const { users, cards, collection } = require('./config/db');

function RegisterUser(req, res)
{
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
        return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
    }


    let TokenGenerator = require( 'token-generator' )({
        salt: 'your secret ingredient for this magic recipe',
        timestampMap: 'TurKEY1234',
    });

    let token = TokenGenerator.generate();

    for (let i = 0; i < users.length; i++){
        if (user.username == users[i].username && user.password == users[i].password) {
            users[i].token = token;
        }
    }

    fs.writeFileSync('data/user.json', JSON.stringify(users), 'utf-8');

    if (user.username == username && password == user.password) {
        res.status(201).json({
            message: "Authentification réussi !",
            user: username,
            data:
            {
                token: token
            }
        });
    }
}

function Users(req, res) {
    if (!req.body) {
        res.status(400).json({ "message": "Erreur : Aucune données" });
        return;
    }

    let token = req.body.token;

    const dataUsers = fs.readFileSync("data/user.json", "utf8");

    // On parse pour l'utiliser comme liste
    let users = JSON.parse(dataUsers);

    let user = users.find(u => u.token === token);
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

    const token = req.body.token;

    if (!token || token.trim() === '') {
        return res.status(400).json({ message: "Erreur : Token manquant ou invalide" });
    }

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

function Convert(req, res) {
    if(!req.body)
        {
            res.status(400).json({"message": "Erreur : Aucune données"});
            return;
    }
    
    const fileData = fs.readFileSync('data/user.json', 'utf-8');
    const card = fs.readFileSync('data/card.json', 'utf-8');

    users = JSON.parse(fileData);
    cards = JSON.parse(card);

    const token = req.body.token;
    const id = req.body.id;

    if (id == null || token == null) {
        res.status(400).json({"message": "Erreur : Données invalide | manquante"});
        return;
    }

    const user = users.find(u => u.token === token);
    const qtt = cards.find(n => n.id === id);
    const userCard = user.collection.find(c => c.id === parseInt(id));
    
    if (!userCard) {
        return res.status(400).json({
            message: "Erreur : Cette carte ne fait pas partie de votre collection."
        });
    }
    
    let nb = userCard.nb;
    let currency = parseInt(user.currency);
    
    if (nb > 1) {
        if (cards.rarity === "common") {
            currency = currency + (nb - 1) * 20;
            console.log("argent commun : " + currency);
        } else if (cards.rarity === "rare") {
            currency = currency + (nb - 1)*60;
            console.log("argent rare : " + currency);
        } else {
            currency = currency + (nb - 1)*200;
            console.log("argent Légendaire : " + currency);
        }
    }
    else {
        res.status(400).json({"message": "Erreur : Cette carte est un unique exemplaire de votre collection, vous ne pouver pas la supprimer"});
    }
    
    console.log(currency);
    user.currency = currency;
    userCard.nb = 1;
    console.log(currency);

    fs.writeFileSync('data/user.json', JSON.stringify(users), 'utf-8');

    res.status(201).json({
        message: "Soldes mis à jour ",
        currency: currency
    });
}

//------------------------------------------------------DATABASE-API------------------------------------------------------//

// 🔁 Créer un utilisateur
async function createTestUser() {
  try {
    const users = await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: "123456", 
      role: "admin",
      isActive: true,
      lastLogin: new Date()
    });
    console.log("Utilisateur créé :", users.toJSON());
  } catch (err) {
    console.error("Erreur de création :", err);
  }
}

// 📥 Récupérer tous les utilisateurs
async function getAllUsers(req, res) {
  const utilisateur = await users.findAll();
  res.status(201).json({
        message: "Soldes mis à jour ",
        utilisateur: utilisateur
    });
}

function createUser() {
    (async () => {
        await createTestUser();
    })();
}

module.exports = { createUser, getAllUsers, RegisterUser, Login, Users, Disconnect, Convert };