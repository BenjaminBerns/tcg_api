const fs = require('fs');
const path = require('path');

function Booster(req, res) {
    const dateNow = Date.now();

    if (!req.body || !req.body.token) {
        return res.status(400).json({ "message": "Erreur : Token manquant ou données invalides" });
    }

    const token = req.body.token;

    let users = JSON.parse(fs.readFileSync('data/user.json', 'utf-8'));
    let cards = JSON.parse(fs.readFileSync('data/card.json', 'utf-8'));

    let user = users.find(u => u.token === token);

    if (!user) {
        res.status(401).json({ message: "utilisateur introuvable" });
        return;
    }

    let now = Date.now();

    if (!user.lastBooster) {
        user.lastBooster = 0;
    }

    if (now - user.lastBooster >= 300000) { // 5 minutes
        let booster = [];

        for (let i = 0; i < 5; i++) {
            let rand = Math.floor(Math.random() * cards.length);
            booster.push(cards[rand].id);
        }

        if (!user.collection) {
            user.collection = [];
        }

        for (let i = 0; i < booster.length; i++) {
            user.collection.push(booster[i]);
        }

        user.lastBooster = now;

        fs.writeFileSync('data/user.json', JSON.stringify(users));

        res.status(200).json({ booster: booster });
    } else {
        let timeLeft = Math.ceil((user.lastBooster + 300000 - now) / 1000);
        res.status(429).json({ message: "attends " + timeLeft + " secondes" });
    }
}

module.exports = { Booster };
