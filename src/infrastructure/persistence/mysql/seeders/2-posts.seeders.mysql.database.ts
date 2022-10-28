import * as Sequelize from "sequelize";

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert("posts", [
      {
        "idpost": 1,
        "content": "Amo nosso condo!",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "iduser": "1",
      },
      {
        "idpost": 2,
        "content": "Condomínio esquisito demais kk",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "iduser": "2",
      }  
    ]);
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete("posts", {});
  },
};
