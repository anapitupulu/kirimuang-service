'use strict';
import * as bcryptjs from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user: any) => {
        user.password = bcryptjs.hashSync(user.password,13);
      }
    },
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.validPassword = function(password: string) {
    return bcryptjs.compareSync(password, this.password);
  };
  return User;
};
