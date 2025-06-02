const fs = require('fs');
const path = require('path');

function Booster(req, res) {
    if (!req.body || !req.body.token) {
        return res.status(400).json({ "message": "Erreur : Token manquant ou données invalides" });
    }

    const token = req.body.token;

    let users = JSON.parse(fs.readFileSync('data/user.json', 'utf-8'));
    let cards = JSON.parse(fs.readFileSync('data/card.json', 'utf-8'));

    let user = users.find(u => u.token === token);

    if (!user) {
        return res.status(401).json({ message: "utilisateur introuvable" });
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
            id = booster[i];
            const qtt = user.collection.find(card => card.id === id);
            if (qtt) {
                qtt.nb += 1;
            }
            else {
                user.collection.push({ id, nb: 1});
            }
        }

        user.lastBooster = now;

        fs.writeFileSync('data/user.json', JSON.stringify(users));

        res.status(200).json({
            message: "Ouverture réussi !",
            info: "Attendez 5 minutes avant de pouvoir en ouvrir un suivant",
            booster: booster
        });
    } else {
        let timeLeft = Math.ceil((user.lastBooster + 300000 - now) / 1000);
        res.status(429).json({ message: "Il reste " + timeLeft + " secondes avant la prochaine ouverture" });
    }
}

function Cards(req, res) {

    let cards = JSON.parse(fs.readFileSync('data/card.json', 'utf-8'));

    let cardsList = [];

    for (let i = 0; i < cards.length + 1; i++) {
        cardsList.push(cards[i]);
    }

    res.status(200).json({
        CardsList: cardsList
    });
}

function GetCardsByToken(req, res) {

    if (!req.body || !req.body.token || !req.body.id) {
        return res.status(400).json({ message: "Token ou ID manquant" });
    }

    const cards = JSON.parse(fs.readFileSync('data/card.json', 'utf-8'));
    const users = JSON.parse(fs.readFileSync('data/user.json', 'utf-8'));

//    const id = parseInt(req.body.id);
    const token = req.body.token;

    let user = users.find(u => u.token === token);

//    let cardsList = [];

//    let card = cards.find(c => c.id === id);

//    for (let i = 0; i < user.collection.length; i++) {
//        let collection = user.collection[i];
//        for (let i = 0; i < cards.length + 1; i++) {
//            if (collection === i) {
//                let j = i - 1;
//                console.log("if (" + collection + " == " + i + ")");
//                cardsList.push(cards[j]);
//            }
//        }
    //    }

    const cardsList = user.collection.map(item => {
        const cardData = cards.find(c => c.id === item.id);
        return {
            cardData,
            nb: item.nb
        };
    });

    console.log(cardsList);

    res.status(200).json({
        CardsList: cardsList
    });
}

function GetCardsBooster(req, res) {
    console.log("GetCardsBooster");

    if (!req.body || !req.body.token || !req.body.id) {
        return res.status(400).json({ message: "Token ou ID manquant" });
    }

    const cards = JSON.parse(fs.readFileSync('data/card.json', 'utf-8'));
    const users = JSON.parse(fs.readFileSync('data/user.json', 'utf-8'));

    const id = req.body.id;
    const token = req.body.token;

    let user = users.find(u => u.token === token);

    let cardsList = [];

    for (let i = 0; i < id.length; i++) {
        let collection = id[i];
        for (let i = 0; i < cards.length + 1; i++) {
            if (collection == i) {
                let j = i - 1;
                console.log("if (" + collection + " == " + i + ")");
                cardsList.push(cards[j]);
            }
        }
    }

    res.status(200).json({
        CardsList: cardsList
    });

}

module.exports = { Booster, Cards, GetCardsByToken, GetCardsBooster };
