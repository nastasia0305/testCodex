const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Artist }) {
      Song.belongsTo(Artist, { foreignKey: 'artist_id' });
      // define association here
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
