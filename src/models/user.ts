import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { CreateOptions, DataTypes, Instance, Model, Sequelize } from 'sequelize'

import { Ibase } from './../interfaces/base'

export interface IUserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserInstace extends Instance<IUserAttributes>, IUserAttributes {
  isValidPassword(encoded: string, text: string): boolean
}

export interface IUserModel extends Ibase, Model<IUserInstace, IUserAttributes> {}

export default (sequelize: Sequelize, dataTypes: DataTypes): IUserModel => {

  const User: any =
    sequelize.define('User', {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: false
      },
      name: {
        type: dataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: dataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: dataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: dataTypes.BLOB('long'),
        allowNull: true,
        defaultValue: null
      }
    }, {
      tableName: 'users',
      hooks: {
        beforeCreate: (user: IUserInstace, options: CreateOptions): void => {
          const { password } = user
          const salt: string = genSaltSync()

          user.password = hashSync(password, salt)
        }
      }
    })
  User.prototype.isValidPassword =  (encoded: string, text: string): boolean => {
    return compareSync(text, encoded)
  }
  return User
}
