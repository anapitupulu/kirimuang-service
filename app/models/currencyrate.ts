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

@Table({tableName: 'currency-rates'})
export default class CurrencyRate extends Model<CurrencyRate> {
  @Column(DataType.FLOAT)
  usdToIdr: number;

  @Column(DataType.FLOAT)
  usdToIdrRounded: number;

  @Column(DataType.FLOAT)
  idrToUsd: number;

  @Column(DataType.FLOAT)
  idrToUsdRounded: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
