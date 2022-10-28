import { MysqlDatabase } from "../mysql.database"
import * as Sequelize from "sequelize"

export default MysqlDatabase.getInstance().createModel("posts", {
  idpost: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    field: "idpost"
  },
  iduser: {
    type: Sequelize.DataTypes.INTEGER,
    field: "iduser"
  },
  content: Sequelize.DataTypes.TEXT,
});
