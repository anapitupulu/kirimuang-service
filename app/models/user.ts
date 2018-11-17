import * as bcryptjs from 'bcryptjs';
import {
  Sequelize,
  Table,
  Column,
  DataType,
  Default,
  AllowNull,
  Model,
  Unique,
  PrimaryKey,
  BeforeCreate,
  IsAlphanumeric,
  IsIn,
  HasOne,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import Transaction from './transaction';

@Table({tableName: 'users'})
export default class User extends Model<User> {
  
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static encryptPassword(instance: User) {
    instance.password = bcryptjs.hashSync(instance.password,13);
  }

  validPassword(password: string): boolean {
    return bcryptjs.compareSync(password, this.password);
  }
}
