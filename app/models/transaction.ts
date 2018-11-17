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
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import Account from './account';

@Table({tableName: 'transactions'})
export default class Transaction extends Model<Transaction> {
  
  @Default(Sequelize.UUIDV4)
  @Unique
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Account)
  senderId: string;

  @BelongsTo(() => Account, 'senderId')
  sender: Account

  @ForeignKey(() => Account)
  receiverId: string;

  @BelongsTo(() => Account, 'receiverId')
  receiver: string;

  @Column(DataType.FLOAT)
  usdAmount: number;

  @Column(DataType.FLOAT)
  idrAmount: number;

  @Column(DataType.FLOAT)
  rate: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  transferred: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  paid: boolean;

  @Column(DataType.FLOAT)
  usdFee: number;

  @Column(DataType.FLOAT)
  idrFee: number;

  @Column(DataType.STRING)
  notes: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
