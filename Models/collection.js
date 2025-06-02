module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('collection', {
    nb: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'collection'
  });

  return Collection;
};
