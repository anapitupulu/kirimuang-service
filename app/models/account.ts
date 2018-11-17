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
  IsAlphanumeric,
  IsIn,
  HasOne,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import Transaction from './transaction';

@Table({tableName: 'accounts'})
export default class Account extends Model<Account> {
  
  @Default(Sequelize.UUIDV4)
  @Unique
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  bank: string;

  @AllowNull(true)
  @IsAlphanumeric
  @Column(DataType.STRING)
  accountNumber: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  branch: string;

  @IsAlphanumeric
  @IsIn([['Indonesia', 'USA']])
  @Column(DataType.STRING)
  location: string;

  @AllowNull
  @IsAlphanumeric
  @Column(DataType.STRING)
  phone: string;

  @HasOne(() => Transaction, 'senderId')
  sender: Transaction;

  @HasOne(() => Transaction, 'receiverId')
  receiver: Transaction;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
