module.exports = (sequelize, DataTypes) => {
  const cards = sequelize.define('cards', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'cards'
  });

  return cards;
};
