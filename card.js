const fs = require('fs');
const path = require('path');

function booster(req, res) {

    if(!req.body)
    {
        res.status(400).json({"message": "Erreur : Aucune données"});
        return;
    }

    let users = [];
    const fileData = fs.readFileSync('data/user.json', 'utf-8');
    users = JSON.parse(fileData);

    for (let i = 0; i < users.length; i++){
        if (user.token == users[i].token) {
            let rand = Math.random() * (65 - 1) + 1;
            console.log(rand);
        }
    }
    
    fs.writeFileSync('data/user.json', JSON.stringify(users), 'utf-8');
}

module.exports = { booster };