import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "./user.model";

@Table
export default class Friend extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @ForeignKey(() => User)
  userId: bigint;

  @ForeignKey(() => User)
  friendId: bigint;

  @BelongsTo(() => User, "friendId")
  friendUser: User;
}
