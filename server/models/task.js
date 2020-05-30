'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Task extends Model{}

  Task.init({

    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER

  }, { hooks: {
    beforeCreate: (task, option) => {
      if (!task.category) {
        task.category = 'backlog'
      }
    }
  }, sequelize });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};