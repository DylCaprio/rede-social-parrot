import * as Sequelize from "sequelize";

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert("users", [
      {
        "iduser": 1,
        "name": "Mariana Souza",
        "email": "marianasouza@gmail.com",
        "apartment": 42,
        "password": "123456",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "iduser": 2,
        "name": "Luciano Silva",
        "email": "lucianosilva@gmail.com",
        "apartment": 13,
        "password": "123456",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
      
    ]);
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete("users", {});
  },
};
