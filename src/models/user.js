module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            required: true
          },        
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        freezeTableName: true,
      }
    );

    return User;                                                                                                                                                                                                                                        ;
  }
  