import * as Sequelize from "sequelize";

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.createTable("posts", {
      idpost: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: Sequelize.DataTypes.TEXT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "iduser",
        },
      },
    });
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.dropTable("posts");
  },
};
