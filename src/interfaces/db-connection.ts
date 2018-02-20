import { Sequelize } from "sequelize";
import { IModels } from "./models";

export interface Iconnection extends IModels {
  sequelize: Sequelize;
}
