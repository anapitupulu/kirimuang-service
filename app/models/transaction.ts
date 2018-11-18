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
  DefaultScope,
  Scopes,
} from 'sequelize-typescript';
import {Op} from 'sequelize';
import Account from './account';

@DefaultScope({
  include: [
    { model: () => Account, as: 'sender', },
    { model: () => Account, as: 'receiver', },
  ]
})
@Scopes({
  open: () => {
    return {
      where: {
        [Op.or]: [{transferred: false}, {paid: false}],
      },
    };
  }
})
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
