const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("db_tcg", "postgres", "951951", {
    host: "localhost",
    dialect: "postgres",
});

sequelize.authenticate();
//module.exports = bdd;

const users = require('../Models/users')(sequelize, DataTypes);
const cards = require('../Models/cards')(sequelize, DataTypes);
const collection = require('../Models/collection')(sequelize, DataTypes);

users.hasMany(cards, { foreignKey: 'usersId' });
cards.belongsTo(users, { foreignKey: 'usersId' });

users.belongsToMany(cards, { through: collection, foreignKey: 'usersId' });
cards.belongsToMany(users, { through: collection, foreignKey: 'cardsId' });

module.exports = {
    sequelize,
    users,
    cards,
    collection
}