import { MysqlDatabase } from "../mysql.database";
import * as Sequelize from "sequelize";

export default MysqlDatabase.getInstance().createModel("users", {
  iduser: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    field: "iduser",
  },
  name: Sequelize.DataTypes.STRING,
  email: Sequelize.DataTypes.STRING,
  apartment: Sequelize.DataTypes.NUMBER,
  password: Sequelize.DataTypes.STRING,
  // createdAt: Sequelize.DataTypes.DATE,
  // updatedAt: Sequelize.DataTypes.DATE //FIXME
});
