import * as Sequelize from "sequelize";

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert("posts", [
      {
        "idpost": 1,
        "content": "Amo nosso condo!",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "user_id": "1",
      }      
    ]);
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete("posts", {});
  },
};
