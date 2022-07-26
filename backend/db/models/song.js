const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate({ Artist }) {
      Song.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE' });
    }
  }
  Song.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    artist_id: {
      allowNull: false,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Artists',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
