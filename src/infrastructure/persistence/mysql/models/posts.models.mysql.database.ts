import { MysqlDatabase } from "../mysql.database";
import * as Sequelize from "sequelize";

export default MysqlDatabase.getInstance().createModel("posts", {
  idpost: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
  },
  content: Sequelize.DataTypes.TEXT,
});
//?? não precisa da foreignkey?
